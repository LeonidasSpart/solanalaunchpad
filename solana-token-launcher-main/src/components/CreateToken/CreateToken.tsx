'use client';

import React, { useState, ChangeEvent, useContext } from 'react';
import { useWallet } from '@solana/wallet-adapter-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { Switch } from '@/components/ui/switch';
import { Loader2, Rocket, CheckCircle, ExternalLink } from 'lucide-react';
import { NetworkContext } from '@/providers/providers';

const MAX_IMAGE_SIZE_MB = 5;
const ALLOWED_IMAGE_TYPES = ['image/png', 'image/jpeg', 'image/gif', 'image/webp'];

const CreateToken = () => {
  const { publicKey, signTransaction } = useWallet();
  const { network } = useContext(NetworkContext);

  const [formData, setFormData] = useState({
    name: '',
    symbol: '',
    description: '',
    website: '',
    twitter: '',
    telegram: '',
    discord: '',
    supply: '1000000000',
    decimals: '9',
  });

  const [revokeMint, setRevokeMint] = useState(true);
  const [revokeFreeze, setRevokeFreeze] = useState(true);
  const [revokeUpdate, setRevokeUpdate] = useState(true);

  const [file, setFile] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [uploading, setUploading] = useState(false);
  const [status, setStatus] = useState('');
  const [txId, setTxId] = useState('');

  const handleInputChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0] || null;
    
    if (selectedFile) {
      // Validate file size
      if (selectedFile.size > MAX_IMAGE_SIZE_MB * 1024 * 1024) {
        setStatus(`❌ Image must be under ${MAX_IMAGE_SIZE_MB}MB`);
        setFile(null);
        setImagePreview(null);
        return;
      }
      
      // Validate file type
      if (!ALLOWED_IMAGE_TYPES.includes(selectedFile.type)) {
        setStatus(`❌ Only PNG, JPEG, GIF, or WebP images allowed`);
        setFile(null);
        setImagePreview(null);
        return;
      }
      
      setStatus(''); // Clear any previous error
    }

    setFile(selectedFile);
    if (selectedFile) {
      const reader = new FileReader();
      reader.onloadend = () => setImagePreview(reader.result as string);
      reader.readAsDataURL(selectedFile);
    } else {
      setImagePreview(null);
    }
  };

  const getFee = () => {
    if (network === 'devnet') {
      return { 
        amount: 'FREE', 
        label: 'Free testing on Devnet • No SOL required', 
        badge: '🧪 Free Devnet Testing',
        details: '0 SOL',
        numericAmount: 0,
      };
    }

    // Base fee for mainnet
    let baseFee = 0.15;
    const details: string[] = [];

    if (revokeMint) {
      baseFee += 0.15;
      details.push('Revoke Mint: +0.15 SOL');
    }
    if (revokeFreeze) {
      baseFee += 0.15;
      details.push('Revoke Freeze: +0.15 SOL');
    }
    if (revokeUpdate) {
      baseFee += 0.15;
      details.push('Revoke Update: +0.15 SOL');
    }

    const totalFee = baseFee;
    const detailText = details.length > 0 ? details.join(' • ') : 'No authority revocations';

    return {
      amount: `${totalFee.toFixed(2)} SOL`,
      label: `Launch on Mainnet • Network rent included`,
      badge: `🔴 Live on Mainnet`,
      details: detailText,
      numericAmount: totalFee,
    };
  };

  const fee = getFee();

  const createToken = async () => {
    if (!publicKey || !signTransaction || !file || !formData.name || !formData.symbol) {
      setStatus('❌ Please connect wallet and fill all required fields');
      return;
    }

    const supplyNum = parseFloat(formData.supply);
    if (isNaN(supplyNum) || supplyNum <= 0) {
      setStatus('❌ Invalid supply amount');
      return;
    }

    const decimalsNum = parseInt(formData.decimals);
    if (isNaN(decimalsNum) || decimalsNum < 0 || decimalsNum > 9) {
      setStatus('❌ Decimals must be between 0 and 9');
      return;
    }

    if (formData.symbol.length > 10) {
      setStatus('❌ Symbol must be 10 characters or less');
      return;
    }

    if (formData.name.length > 32) {
      setStatus('❌ Name must be 32 characters or less');
      return;
    }

    setUploading(true);
    setTxId('');
    setStatus('⏳ Uploading image to IPFS...');

    try {
      const { createToken: createTokenLib } = await import('@/lib/create-token');

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
        network,
        // NEW: Pass social links to backend
        website: formData.website.trim() || undefined,
        twitter: formData.twitter.trim() || undefined,
        telegram: formData.telegram.trim() || undefined,
        discord: formData.discord.trim() || undefined,
      });

      setTxId(signature);
      setStatus('');
    } catch (error: any) {
      console.error('Creation failed:', error);
      let errorMessage = 'Unknown error occurred';

      if (error.message?.includes('insufficient')) {
        // Dynamic error message based on actual fee
        const requiredSol = fee.numericAmount > 0 ? fee.numericAmount + 0.05 : 0;
        errorMessage = `Insufficient SOL balance. You need at least ${requiredSol.toFixed(2)} SOL.`;
      } else if (error.message?.includes('rejected') || error.message?.includes('User rejected')) {
        errorMessage = 'Transaction was rejected in wallet.';
      } else if (error.message?.includes('NFT.Storage')) {
        errorMessage = 'Image upload failed. Check your API key.';
      } else {
        errorMessage = error.message?.slice(0, 150) || 'Transaction failed';
      }

      setStatus(`❌ ${errorMessage}`);
    } finally {
      setUploading(false);
    }
  };

  return (
    <Card className="max-w-3xl mx-auto bg-zinc-900 border-zinc-800">
      <CardHeader>
        <CardTitle className="text-3xl flex items-center gap-3 text-white">
          <Rocket className="h-8 w-8 text-purple-500" /> Create Your Solana Token
        </CardTitle>
        <p className="text-zinc-400">Launch your token or memecoin on Solana with ZRP</p>
        {network === 'mainnet' && (
          <div className="bg-red-900/30 border border-red-500 rounded-xl p-4 mt-2">
            <p className="text-red-400 font-bold">⚠️ MAINNET MODE</p>
            <p className="text-red-300 text-sm">
              You are about to create a token on Solana Mainnet. This will cost REAL SOL.
              Please double-check all details before proceeding.
            </p>
          </div>
        )}
      </CardHeader>

      <CardContent className="space-y-8 p-8">
        {/* Basic Info */}
        <div className="grid grid-cols-2 gap-6">
          <div>
            <Label className="text-white">Token Name *</Label>
            <Input
              name="name"
              value={formData.name}
              onChange={handleInputChange}
              placeholder="e.g. Pepe Coin"
              maxLength={32}
              className="bg-zinc-800 border-zinc-700 text-white"
            />
          </div>
          <div>
            <Label className="text-white">Symbol *</Label>
            <Input
              name="symbol"
              value={formData.symbol}
              onChange={handleInputChange}
              placeholder="PEPE"
              maxLength={10}
              className="bg-zinc-800 border-zinc-700 text-white"
            />
          </div>
        </div>

        <div>
          <Label className="text-white">Description</Label>
          <Textarea
            name="description"
            value={formData.description}
            onChange={handleInputChange}
            rows={4}
            className="bg-zinc-800 border-zinc-700 text-white"
          />
        </div>

        {/* Supply */}
        <div className="grid grid-cols-2 gap-6">
          <div>
            <Label className="text-white">Total Supply</Label>
            <Input
              name="supply"
              type="number"
              value={formData.supply}
              onChange={handleInputChange}
              min="1"
              className="bg-zinc-800 border-zinc-700 text-white"
            />
          </div>
          <div>
            <Label className="text-white">Decimals (0-9)</Label>
            <Input
              name="decimals"
              type="number"
              value={formData.decimals}
              onChange={handleInputChange}
              min="0"
              max="9"
              className="bg-zinc-800 border-zinc-700 text-white"
            />
          </div>
        </div>

        {/* Socials */}
        <div className="space-y-4 pt-4 border-t border-zinc-800">
          <Label className="text-lg text-white">Socials & Links (Recommended)</Label>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label className="text-white">Website</Label>
              <Input
                name="website"
                value={formData.website}
                onChange={handleInputChange}
                placeholder="https://yourtoken.com"
                className="bg-zinc-800 border-zinc-700 text-white"
              />
            </div>
            <div>
              <Label className="text-white">X / Twitter</Label>
              <Input
                name="twitter"
                value={formData.twitter}
                onChange={handleInputChange}
                placeholder="https://x.com/yourtoken"
                className="bg-zinc-800 border-zinc-700 text-white"
              />
            </div>
            <div>
              <Label className="text-white">Telegram</Label>
              <Input
                name="telegram"
                value={formData.telegram}
                onChange={handleInputChange}
                placeholder="https://t.me/yourtoken"
                className="bg-zinc-800 border-zinc-700 text-white"
              />
            </div>
            <div>
              <Label className="text-white">Discord</Label>
              <Input
                name="discord"
                value={formData.discord}
                onChange={handleInputChange}
                placeholder="https://discord.gg/..."
                className="bg-zinc-800 border-zinc-700 text-white"
              />
            </div>
          </div>
        </div>

        {/* Image */}
        <div>
          <Label className="text-white">Token Image *</Label>
          <Input
            type="file"
            onChange={handleFileChange}
            accept="image/png,image/jpeg,image/gif,image/webp"
            className="bg-zinc-800 border-zinc-700 text-white"
          />
          <p className="text-xs text-zinc-500 mt-1">Max {MAX_IMAGE_SIZE_MB}MB • PNG, JPEG, GIF, or WebP</p>
          {imagePreview && (
            <img
              src={imagePreview}
              className="mt-4 max-h-48 rounded-xl border border-zinc-800"
              alt="Preview"
            />
          )}
        </div>

        {/* Security Settings */}
        <div className="space-y-6 pt-6 border-t border-zinc-800">
          <Label className="text-lg text-white">Security Settings</Label>
          <div className="flex justify-between items-center">
            <div>
              <p className="text-white">Revoke Mint Authority</p>
              <p className="text-sm text-zinc-500">No more tokens can be minted (+0.15 SOL)</p>
            </div>
            <Switch checked={revokeMint} onCheckedChange={setRevokeMint} />
          </div>
          <div className="flex justify-between items-center">
            <div>
              <p className="text-white">Revoke Freeze Authority</p>
              <p className="text-sm text-zinc-500">Token accounts cannot be frozen (+0.15 SOL)</p>
            </div>
            <Switch checked={revokeFreeze} onCheckedChange={setRevokeFreeze} />
          </div>
          <div className="flex justify-between items-center">
            <div>
              <p className="text-white">Revoke Update Authority</p>
              <p className="text-sm text-zinc-500">Metadata becomes immutable (+0.15 SOL)</p>
            </div>
            <Switch checked={revokeUpdate} onCheckedChange={setRevokeUpdate} />
          </div>
        </div>

        {/* Dynamic Fee Display */}
        <div className="bg-zinc-900 p-6 rounded-xl text-center border border-purple-500/20">
          <div className="text-3xl font-bold text-purple-400">
            {fee.amount}
          </div>
          <p className="text-sm text-zinc-400">{fee.label}</p>
          {fee.badge && (
            <div className="mt-2 inline-block bg-purple-900/30 text-purple-400 text-xs font-medium px-3 py-1 rounded-full border border-purple-500/30">
              {fee.badge}
            </div>
          )}
          {network === 'mainnet' && fee.details && (
            <div className="mt-3 text-xs text-zinc-500 border-t border-zinc-800 pt-3">
              <p>Fee breakdown: {fee.details}</p>
            </div>
          )}
        </div>
      </CardContent>

      <div className="p-8 pt-0">
        <Button
          onClick={createToken}
          disabled={uploading || !publicKey || !file || !formData.name || !formData.symbol}
          className="w-full py-7 text-lg bg-purple-600 hover:bg-purple-700 disabled:opacity-50 text-white"
        >
          {uploading ? <Loader2 className="mr-3 h-5 w-5 animate-spin" /> : null}
          {uploading ? 'Creating Token...' : `Create & Mint Token (${fee.amount})`}
        </Button>
      </div>

      {status && (
        <div
          className={`p-6 pt-0 text-center text-sm ${
            status.startsWith('✅')
              ? 'text-green-400'
              : status.startsWith('❌')
              ? 'text-red-400'
              : 'text-zinc-400'
          }`}
        >
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
