// ================================
// ZRP Wallet SDK – TypeScript
// For Solana wallet operations
// ================================

import { Keypair, PublicKey, Transaction } from '@solana/web3.js';
import * as nacl from 'tweetnacl';

export class ZRPWallet {
  private keypair: Keypair;

  constructor(privateKey?: string | Uint8Array) {
    if (privateKey) {
      if (typeof privateKey === 'string') {
        const decoded = Buffer.from(privateKey, 'base64');
        this.keypair = Keypair.fromSecretKey(decoded);
      } else {
        this.keypair = Keypair.fromSecretKey(privateKey);
      }
    } else {
      this.keypair = Keypair.generate();
    }
  }

  getPublicKey(): string {
    return this.keypair.publicKey.toBase58();
  }

  getPrivateKey(): string {
    return Buffer.from(this.keypair.secretKey).toString('base64');
  }

  getAddress(): string {
    return this.getPublicKey();
  }

  signTransaction(transaction: Transaction): Transaction {
    transaction.partialSign(this.keypair);
    return transaction;
  }

  signMessage(message: Uint8Array): Uint8Array {
    return nacl.sign.detached(message, this.keypair.secretKey);
  }

  static generate(): ZRPWallet {
    return new ZRPWallet();
  }

  static fromPrivateKey(privateKey: string): ZRPWallet {
    return new ZRPWallet(privateKey);
  }
}

export function generateWallet(): ZRPWallet {
  return ZRPWallet.generate();
}

export function isValidAddress(address: string): boolean {
  try {
    new PublicKey(address);
    return true;
  } catch {
    return false;
  }
}

export function shortenAddress(address: string, chars: number = 4): string {
  return `${address.slice(0, chars)}...${address.slice(-chars)}`;
}
