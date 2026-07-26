import { Controller, Get, Param, Query, UseGuards } from '@nestjs/common';
import { ChatService } from './chat.service';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';

@UseGuards(JwtAuthGuard)
@Controller('rooms')
export class RoomsController {
  constructor(private readonly chatService: ChatService) {}

  @Get()
  listRooms() {
    return this.chatService.listRooms();
  }

  @Get(':id/messages')
  getMessages(@Param('id') id: string, @Query('limit') limit?: string) {
    return this.chatService.getMessages(id, limit ? parseInt(limit, 10) : 50);
  }
}
