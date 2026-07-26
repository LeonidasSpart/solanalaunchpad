import {
  ConnectedSocket,
  MessageBody,
  OnGatewayConnection,
  OnGatewayDisconnect,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
} from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';
import { JwtService } from '@nestjs/jwt';
import { ChatService } from './chat.service';

@WebSocketGateway({
  namespace: '/chat',
  cors: {
    origin: process.env.FRONTEND_URL || '*',
    credentials: true,
  },
})
export class ChatGateway implements OnGatewayConnection, OnGatewayDisconnect {
  @WebSocketServer()
  server: Server;

  constructor(
    private readonly jwtService: JwtService,
    private readonly chatService: ChatService,
  ) {}

  async handleConnection(client: Socket) {
    try {
      const token =
        (client.handshake.auth?.token as string) ||
        client.handshake.headers['authorization']?.toString().replace('Bearer ', '');

      if (!token) throw new Error('Missing token');

      const payload = this.jwtService.verify(token);
      client.data.userId = payload.sub;
      client.data.walletAddress = payload.walletAddress;
    } catch {
      client.emit('authError', 'Unauthorized');
      client.disconnect(true);
    }
  }

  handleDisconnect(_client: Socket) {
    // no-op for now; hook for presence tracking later
  }

  @SubscribeMessage('joinRoom')
  async onJoinRoom(@ConnectedSocket() client: Socket, @MessageBody() data: { roomId: string }) {
    if (!client.data.userId || !data?.roomId) return;
    await client.join(data.roomId);
    const history = await this.chatService.getMessages(data.roomId);
    client.emit('roomHistory', { roomId: data.roomId, messages: history });
  }

  @SubscribeMessage('leaveRoom')
  onLeaveRoom(@ConnectedSocket() client: Socket, @MessageBody() data: { roomId: string }) {
    if (data?.roomId) client.leave(data.roomId);
  }

  @SubscribeMessage('sendMessage')
  async onSendMessage(
    @ConnectedSocket() client: Socket,
    @MessageBody() data: { roomId: string; body: string },
  ) {
    if (!client.data.userId || !data?.roomId || !data?.body) return;

    const message = await this.chatService.createMessage(data.roomId, client.data.userId, data.body);
    if (message) {
      this.server.to(data.roomId).emit('newMessage', message);
    }
  }
}
