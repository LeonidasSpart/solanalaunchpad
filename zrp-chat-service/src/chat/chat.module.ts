import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { ChatGateway } from './chat.gateway';
import { ChatService } from './chat.service';
import { RoomsController } from './rooms.controller';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';

@Module({
  imports: [
    JwtModule.register({
      secret: process.env.JWT_SECRET,
      signOptions: { expiresIn: '7d' },
    }),
  ],
  controllers: [RoomsController],
  providers: [ChatGateway, ChatService, JwtAuthGuard],
})
export class ChatModule {}
