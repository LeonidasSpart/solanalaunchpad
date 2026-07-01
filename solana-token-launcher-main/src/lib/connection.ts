import { Connection, Commitment } from "@solana/web3.js";
import { RPC_URLS, NETWORKS } from "./constants";

/**
 * Create a fresh Solana connection.
 * 
 * IMPORTANT: Do NOT cache connections. RPC endpoints can become stale,
 * rate-limited, or go down. Always create fresh connections.
 */
export function getConnection(
  network: "devnet" | "mainnet" = "devnet",
  commitment: Commitment = "confirmed"
): Connection {
  const endpoint =
    network === "mainnet"
      ? RPC_URLS[NETWORKS.MAINNET]
      : RPC_URLS[NETWORKS.DEVNET];

  return new Connection(endpoint, commitment);
}

/**
 * Get connection with specific commitment level.
 * Use "finalized" for operations requiring maximum security.
 */
export function getConnectionWithCommitment(
  network: "devnet" | "mainnet",
  commitment: Commitment
): Connection {
  return getConnection(network, commitment);
}
