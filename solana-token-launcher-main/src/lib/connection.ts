import { Connection, Commitment } from "@solana/web3.js";

function getRpcEndpoint(network: "devnet" | "mainnet"): string {
  // Server-side: use Helius directly
  if (typeof window === "undefined") {
    return network === "mainnet"
      ? process.env.RPC_URL_MAINNET!
      : process.env.RPC_URL_DEVNET!;
  }
  // Client-side: proxy through our API
  return `${window.location.origin}/api/rpc?network=${network}`;
}

export function getConnection(
  network: "devnet" | "mainnet" = "devnet",
  commitment: Commitment = "confirmed"
): Connection {
  return new Connection(getRpcEndpoint(network), commitment);
}

export function getConnectionWithCommitment(
  network: "devnet" | "mainnet",
  commitment: Commitment
): Connection {
  return getConnection(network, commitment);
}
