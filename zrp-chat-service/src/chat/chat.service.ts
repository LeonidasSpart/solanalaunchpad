import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class ChatService {
  constructor(private readonly prisma: PrismaService) {}

  async listRooms() {
    await this.ensureGeneralRoom();
    return this.prisma.room.findMany({ orderBy: { createdAt: 'asc' } });
  }

  async ensureGeneralRoom() {
    return this.prisma.room.upsert({
      where: { name: 'general' },
      update: {},
      create: { name: 'general' },
    });
  }

  async getMessages(roomId: string, limit = 50) {
    const messages = await this.prisma.message.findMany({
      where: { roomId },
      orderBy: { createdAt: 'desc' },
      take: limit,
      include: { sender: { select: { walletAddress: true } } },
    });
    return messages.reverse();
  }

  async createMessage(roomId: string, senderId: string, body: string) {
    const trimmed = body.trim().slice(0, 2000);
    if (!trimmed) return null;

    return this.prisma.message.create({
      data: { roomId, senderId, body: trimmed },
      include: { sender: { select: { walletAddress: true } } },
    });
  }
}
