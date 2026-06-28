'use client';

import React, { useState, ChangeEvent } from 'react';
import { useWallet } from '@solana/wallet-adapter-react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { Loader2, Rocket, CheckCircle, ExternalLink } from 'lucide-react';

const CreateToken = () => {
  const { publicKey, signTransaction } = useWallet();

  const [formData, setFormData] = useState({
    name: "", symbol: "", description: "", website: "", twitter: "", telegram: "", discord: "",
    supply: "1000000000", decimals: "9",
  });

  const [revokeMint, setRevokeMint] = useState(true);
  const [revokeFreeze, setRevokeFreeze] = useState(true);
  const [revokeUpdate, setRevokeUpdate] = useState(true);

  const [file, setFile] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [uploading, setUploading] = useState(false);
  const [status, setStatus] = useState("");
  const [txId, setTxId] = useState("");

  const handleInputChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0] || null;
    setFile(selectedFile);
    if (selectedFile) {
      const reader = new FileReader();
      reader.onloadend = () => setImagePreview(reader.result as string);
      reader.readAsDataURL(selectedFile);
    }
  };

  const createToken = async () => {
    if (!publicKey || !signTransaction || !file || !formData.name || !formData.symbol) {
      setStatus("❌ Please connect wallet and fill all required fields");
      return;
    }

    // Validate supply
    const supplyNum = parseFloat(formData.supply);
    if (isNaN(supplyNum) || supplyNum <= 0) {
      setStatus("❌ Invalid supply amount");
      return;
    }

    // Validate decimals
    const decimalsNum = parseInt(formData.decimals);
    if (isNaN(decimalsNum) || decimalsNum < 0 || decimalsNum > 9) {
      setStatus("❌ Decimals must be between 0 and 9");
      return;
    }

    // Validate symbol
    if (formData.symbol.length > 10) {
      setStatus("❌ Symbol must be 10 characters or less");
      return;
    }

    // Validate name
    if (formData.name.length > 32) {
      setStatus("❌ Name must be 32 characters or less");
      return;
    }

    setUploading(true);
    setTxId("");
    setStatus("⏳ Uploading image to IPFS...");

    try {
      const { createToken: createTokenLib } = await import("@/lib/create-token");

      const signature = await createTokenLib({
        wallet: publicKey,
        name: formData.name.trim(),
        symbol: formData.symbol.trim().toUpperCase(),
        description: formData.description.trim(),
        decimals: decimalsNum,
        supply: supplyNum,
        imageFile: file,
        revokeMint,
        revokeFreeze,
        revokeUpdate,
        signTransaction,
      });

      setTxId(signature);
      setStatus("");
    } catch (error: any) {
      console.error("Creation failed:", error);
      let errorMessage = "Unknown error occurred";

      if (error.message?.includes("insufficient")) {
        errorMessage = "Insufficient SOL balance. You need at least 0.55 SOL.";
      } else if (error.message?.includes("rejected") || error.message?.includes("User rejected")) {
        errorMessage = "Transaction was rejected in wallet.";
      } else if (error.message?.includes("NFT.Storage")) {
        errorMessage = "Image upload failed. Check your API key.";
      } else {
        errorMessage = error.message?.slice(0, 150) || "Transaction failed";
      }

      setStatus(`❌ ${errorMessage}`);
    } finally {
      setUploading(false);
    }
  };

  return (
    <Card className="max-w-3xl mx-auto">
      <CardHeader>
        <CardTitle className="text-3xl flex items-center gap-3">
          <Rocket className="h-8 w-8 text-purple-500" /> Create Your Solana Token
        </CardTitle>
        <p className="text-zinc-400">Launch your token or memecoin on Solana with ZRP</p>
      </CardHeader>

      <CardContent className="space-y-8 p-8">
        {/* Basic Info */}
        <div className="grid grid-cols-2 gap-6">
          <div>
            <Label>Token Name *</Label>
            <Input name="name" value={formData.name} onChange={handleInputChange} placeholder="e.g. Pepe Coin" maxLength={32} />
          </div>
          <div>
            <Label>Symbol *</Label>
            <Input name="symbol" value={formData.symbol} onChange={handleInputChange} placeholder="PEPE" maxLength={10} />
          </div>
        </div>

        <div>
          <Label>Description</Label>
          <Textarea name="description" value={formData.description} onChange={handleInputChange} rows={4} />
        </div>

        {/* Supply */}
        <div className="grid grid-cols-2 gap-6">
          <div>
            <Label>Total Supply</Label>
            <Input name="supply" type="number" value={formData.supply} onChange={handleInputChange} min="1" />
          </div>
          <div>
            <Label>Decimals (0-9)</Label>
            <Input name="decimals" type="number" value={formData.decimals} onChange={handleInputChange} min="0" max="9" />
          </div>
        </div>

        {/* Socials */}
        <div className="space-y-4 pt-4 border-t border-zinc-800">
          <Label className="text-lg">Socials & Links (Recommended)</Label>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label>Website</Label>
              <Input name="website" value={formData.website} onChange={handleInputChange} placeholder="https://yourtoken.com" />
            </div>
            <div>
              <Label>X / Twitter</Label>
              <Input name="twitter" value={formData.twitter} onChange={handleInputChange} placeholder="https://x.com/yourtoken" />
            </div>
            <div>
              <Label>Telegram</Label>
              <Input name="telegram" value={formData.telegram} onChange={handleInputChange} placeholder="https://t.me/yourtoken" />
            </div>
            <div>
              <Label>Discord</Label>
              <Input name="discord" value={formData.discord} onChange={handleInputChange} placeholder="https://discord.gg/..." />
            </div>
          </div>
        </div>

        {/* Image */}
        <div>
          <Label>Token Image *</Label>
          <Input type="file" onChange={handleFileChange} accept="image/png,image/jpeg,image/gif,image/webp" />
          {imagePreview && <img src={imagePreview} className="mt-4 max-h-48 rounded-xl border border-zinc-800" alt="Preview" />}
        </div>

        {/* Security */}
        <div className="space-y-6 pt-6 border-t border-zinc-800">
          <Label className="text-lg">Security Settings</Label>
          <div className="flex justify-between items-center">
            <div>
              <p>Revoke Mint Authority</p>
              <p className="text-sm text-zinc-500">No more tokens can be minted</p>
            </div>
            <Switch checked={revokeMint} onCheckedChange={setRevokeMint} />
          </div>
          <div className="flex justify-between items-center">
            <div>
              <p>Revoke Freeze Authority</p>
              <p className="text-sm text-zinc-500">Token accounts cannot be frozen</p>
            </div>
            <Switch checked={revokeFreeze} onCheckedChange={setRevokeFreeze} />
          </div>
          <div className="flex justify-between items-center">
            <div>
              <p>Revoke Update Authority</p>
              <p className="text-sm text-zinc-500">Metadata becomes immutable</p>
            </div>
            <Switch checked={revokeUpdate} onCheckedChange={setRevokeUpdate} />
          </div>
        </div>

        {/* Fee */}
        <div className="bg-zinc-900 p-6 rounded-xl text-center border border-purple-500/20">
          <div className="text-3xl font-bold text-purple-400">0.5 SOL</div>
          <p className="text-sm text-zinc-400">Total fee • Network rent included</p>
        </div>
      </CardContent>

      <div className="p-8 pt-0">
        <Button
          onClick={createToken}
          disabled={uploading || !publicKey || !file || !formData.name || !formData.symbol}
          className="w-full py-7 text-lg bg-purple-600 hover:bg-purple-700 disabled:opacity-50"
        >
          {uploading ? <Loader2 className="mr-3 h-5 w-5 animate-spin" /> : null}
          {uploading ? "Creating Token..." : "Create & Mint Token (0.5 SOL)"}
        </Button>
      </div>

      {status && (
        <div className={`p-6 pt-0 text-center text-sm ${status.startsWith("✅") ? "text-green-400" : status.startsWith("❌") ? "text-red-400" : "text-zinc-400"}`}>
          <p>{status}</p>
        </div>
      )}

      {txId && (
        <div className="p-6 pt-0 text-center">
          <div className="bg-green-900/30 border border-green-500/30 rounded-xl p-4">
            <CheckCircle className="h-8 w-8 text-green-400 mx-auto mb-2" />
            <p className="text-green-400 font-semibold mb-2">Token Created Successfully!</p>
            <a
              href={`https://solscan.io/tx/${txId}`}
              target="_blank"
              rel="noopener noreferrer"
              className="text-sm text-purple-400 hover:text-purple-300 inline-flex items-center gap-1"
            >
              View on Solscan <ExternalLink className="h-3 w-3" />
            </a>
          </div>
        </div>
      )}
    </Card>
  );
};

export default CreateToken;
