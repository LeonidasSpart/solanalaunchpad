import { Body, Controller, Delete, Get, Param, Post, Query, UseGuards } from '@nestjs/common';
import { ChatService } from './chat.service';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { AdminGuard } from '../auth/admin.guard';

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

  @UseGuards(AdminGuard)
  @Post()
  createRoom(@Body() body: { name: string }) {
    return this.chatService.createRoom(body.name);
  }

  @UseGuards(AdminGuard)
  @Delete(':id')
  deleteRoom(@Param('id') id: string) {
    return this.chatService.deleteRoom(id);
  }
}
