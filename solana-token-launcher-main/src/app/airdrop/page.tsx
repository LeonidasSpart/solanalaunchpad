'use client';
import { useState, useEffect } from "react";
import { useWallet, useConnection } from '@solana/wallet-adapter-react';
import { PublicKey, LAMPORTS_PER_SOL, SystemProgram, Transaction } from "@solana/web3.js";
import { Card, CardHeader, CardTitle, CardContent, CardDescription } from "@/components/ui/card";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Loader2, AlertCircle, CheckCircle2, Wallet } from 'lucide-react';
import DevnetInfoSection from "@/components/Airdrop/devent-info-section";

function SolAirdrop() {
  const { connection } = useConnection();
  const { publicKey, sendTransaction } = useWallet();

  const [addressInput, setAddressInput] = useState("");
  const [txHash, setTxHash] = useState("");
  const [isAirdropped, setIsAirdropped] = useState(false);
  const [balance, setBalance] = useState<number | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [isMainnet] = useState(process.env.NEXT_PUBLIC_DEFAULT_NETWORK === 'mainnet');

  // Auto-fill from connected wallet
  useEffect(() => {
    if (publicKey) {
      setAddressInput(publicKey.toString());
    }
  }, [publicKey]);

  useEffect(() => {
    if (addressInput) {
      getBalance(addressInput).then(setBalance);
    }
  }, [addressInput, isAirdropped]);

  async function getBalance(pubKeyStr: string) {
    try {
      const pubKey = new PublicKey(pubKeyStr);
      const bal = await connection.getBalance(pubKey);
      return bal / LAMPORTS_PER_SOL;
    } catch {
      return null;
    }
  }

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!publicKey) {
      setError("Please connect your wallet first!");
      return;
    }

    setLoading(true);
    setError("");
    setIsAirdropped(false);

    try {
      const recipient = new PublicKey(addressInput);
      const amount = 1 * LAMPORTS_PER_SOL; // 1 SOL

      const transaction = new Transaction().add(
        SystemProgram.transfer({
          fromPubkey: publicKey,
          toPubkey: recipient,
          lamports: amount,
        })
      );

      const signature = await sendTransaction(transaction, connection);
      setTxHash(signature);
      setIsAirdropped(true);

      await connection.confirmTransaction(signature);
      const updatedBalance = await getBalance(addressInput);
      setBalance(updatedBalance);
    } catch (err: any) {
      console.error(err);
      setError(err.message || "Airdrop failed. Check balance and try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col min-h-screen">
      <main className="flex-1 container mx-auto px-4 py-8">
        <DevnetInfoSection />
        <Card className="max-w-lg mx-auto">
          <CardHeader>
            <CardTitle className="text-2xl font-bold flex items-center gap-2">
              <Wallet className="w-6 h-6" />
              {isMainnet ? "Mainnet SOL Transfer" : "Devnet Airdrop"}
            </CardTitle>
            <CardDescription>
              {isMainnet ? "Send real SOL (use small amounts)" : "Request test SOL"}
            </CardDescription>
          </CardHeader>
          <CardContent>
            {!publicKey && (
              <Alert className="mb-6">
                <AlertCircle className="h-4 w-4" />
                <AlertDescription>Connect your wallet to continue.</AlertDescription>
              </Alert>
            )}

            <form onSubmit={onSubmit} className="space-y-6">
              <div className="space-y-2">
                <label className="block text-sm font-medium">Solana Address</label>
                <Input
                  value={addressInput}
                  onChange={(e) => setAddressInput(e.target.value)}
                  placeholder="Enter or use connected wallet..."
                />
              </div>

              {balance !== null && (
                <div className="p-3 bg-secondary/50 rounded-lg text-sm">
                  Current Balance: {balance.toFixed(4)} SOL
                </div>
              )}

              {error && <Alert variant="destructive"><AlertCircle className="h-4 w-4" /><AlertDescription>{error}</AlertDescription></Alert>}

              {isAirdropped && (
                <Alert>
                  <CheckCircle2 className="h-4 w-4" />
                  <AlertDescription>Success! Tx: {txHash.slice(0, 12)}...</AlertDescription>
                </Alert>
              )}

              <Button type="submit" disabled={loading || !publicKey} className="w-full">
                {loading ? (
                  <><Loader2 className="mr-2 h-4 w-4 animate-spin" /> Processing...</>
                ) : (
                  `Send 1 SOL ${isMainnet ? '(Mainnet)' : ''}`
                )}
              </Button>
            </form>
          </CardContent>
        </Card>
      </main>
    </div>
  );
}

export default SolAirdrop;
