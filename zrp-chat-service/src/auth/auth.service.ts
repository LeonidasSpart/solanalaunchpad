import { Injectable, UnauthorizedException, BadRequestException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { PublicKey } from '@solana/web3.js';
import nacl from 'tweetnacl';
import bs58 from 'bs58';
import { PrismaService } from '../prisma/prisma.service';

interface LoginDto {
  publicKey: string;
  signature: string;
  message: string;
}

@Injectable()
export class AuthService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly jwtService: JwtService,
  ) {}

  async login({ publicKey, signature, message }: LoginDto) {
    if (!publicKey || !signature || !message) {
      throw new BadRequestException('Missing required fields');
    }

    // Reject stale sign-in attempts - message must embed a recent timestamp
    // (matches `Login to ZRP Messenger at ${Date.now()}` from the frontend)
    const match = message.match(/at (\d+)$/);
    const timestamp = match ? parseInt(match[1], 10) : null;
    if (!timestamp || Date.now() - timestamp > 5 * 60 * 1000) {
      throw new UnauthorizedException('Login message expired, please try again');
    }

    let isValid = false;
    try {
      isValid = nacl.sign.detached.verify(
        new TextEncoder().encode(message),
        bs58.decode(signature),
        new PublicKey(publicKey).toBytes(),
      );
    } catch {
      throw new UnauthorizedException('Invalid signature or public key');
    }

    if (!isValid) {
      throw new UnauthorizedException('Invalid signature');
    }

    const user = await this.prisma.user.upsert({
      where: { walletAddress: publicKey },
      update: {},
      create: { walletAddress: publicKey },
    });

    const accessToken = this.jwtService.sign({
      sub: user.id,
      walletAddress: user.walletAddress,
    });

    return {
      accessToken,
      user: { id: user.id, walletAddress: user.walletAddress },
    };
  }
}
