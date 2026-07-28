import { BadRequestException, ConflictException, Injectable, NotFoundException } from '@nestjs/common';
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

  async createRoom(name: string) {
    const trimmed = (name || '').trim();
    if (!trimmed) throw new BadRequestException('Room name is required');
    if (trimmed.length > 50) throw new BadRequestException('Room name is too long');

    try {
      return await this.prisma.room.create({ data: { name: trimmed } });
    } catch (err: any) {
      if (err?.code === 'P2002') {
        throw new ConflictException(`A room named "${trimmed}" already exists`);
      }
      throw err;
    }
  }

  async deleteRoom(id: string) {
    const room = await this.prisma.room.findUnique({ where: { id } });
    if (!room) throw new NotFoundException('Room not found');
    if (room.name === 'general') {
      throw new BadRequestException('The general room cannot be deleted');
    }

    await this.prisma.message.deleteMany({ where: { roomId: id } });
    return this.prisma.room.delete({ where: { id } });
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
