import { PublicKey } from "@solana/web3.js";

// Your treasury wallet where the 0.5 SOL fee goes
export const FEE_RECIPIENT = new PublicKey("BEK84UNPpH9jAqHR21hWmrEgKgrnGjA7yc5cocd1va81");

// Fee amount
export const CREATION_FEE_SOL = 0.5;

// Standard Solana program IDs
export const TOKEN_PROGRAM_ID = new PublicKey("TokenkegQfeZyiNwAJbNbGKPFXCWuBvf9Ss623VQ5DA");
export const ASSOCIATED_TOKEN_PROGRAM_ID = new PublicKey("ATokenGPvbdGVxr1b2hvZbsiqW5xWH25efTNsLJA8knL");
export const METADATA_PROGRAM_ID = new PublicKey("metaqbxxUerdq28cj1RbAWkYQm3ybzjb6a8bt518x1s");
