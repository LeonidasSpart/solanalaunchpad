'use client';

import React, { useState, ChangeEvent, useContext, Suspense } from 'react';
import { useWallet } from '@solana/wallet-adapter-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { Switch } from '@/components/ui/switch';
import { Loader2, Rocket, CheckCircle, ExternalLink } from 'lucide-react';
import { NetworkContext } from '@/providers/providers';
import TemplateLoader from './TemplateLoader';
import { getConnection } from '@/lib/connection';

const MAX_IMAGE_SIZE_MB = 5;
const ALLOWED_IMAGE_TYPES = ['image/png', 'image/jpeg', 'image/gif', 'image/webp'];

const CreateToken = () => {
  const { publicKey, signTransaction } = useWallet();
  const { network } = useContext(NetworkContext);

  const [selectedTemplate, setSelectedTemplate] = useState<string | null>(null);

  const templates = {
    meme: {
      name: "Meme Coin",
      description: "Viral community token with maximum trust",
      supply: '1000000000',
      decimals: '0',
      revokeMint: true,
      revokeFreeze: true,
      revokeUpdate: true,
      badge: "🔥 Most Popular",
    },
    utility: {
      name: "Utility Token",
      description: "Governance & utility token with controlled supply",
      supply: '10000000',
      decimals: '6',
      revokeMint: false,
      revokeFreeze: true,
      revokeUpdate: true,
      badge: "⚙️ Governance",
    },
    governance: {
      name: "Governance DAO",
      description: "DAO voting token with delegation support",
      supply: '100000000',
      decimals: '6',
      revokeMint: false,
      revokeFreeze: true,
      revokeUpdate: true,
      badge: "🏛️ DAO",
    },
    simple: {
      name: "Simple Token",
      description: "Basic token for testing or private use",
      supply: '1000000',
      decimals: '9',
      revokeMint: true,
      revokeFreeze: true,
      revokeUpdate: false,
      badge: "🚀 Quick Start",
    },
  };

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
  const [mintAddress, setMintAddress] = useState('');
  const [imageUri, setImageUri] = useState('');
  const [metadataUri, setMetadataUri] = useState('');

  const handleTemplateLoad = (templateKey: string) => {
    if (templates[templateKey as keyof typeof templates]) {
      const t = templates[templateKey as keyof typeof templates];
      setSelectedTemplate(templateKey);
      setFormData(prev => ({
        ...prev,
        supply: t.supply,
        decimals: t.decimals,
      }));
      setRevokeMint(t.revokeMint);
      setRevokeFreeze(t.revokeFreeze);
      setRevokeUpdate(t.revokeUpdate);
    }
  };

  const handleInputChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0] || null;

    if (selectedFile) {
      if (selectedFile.size > MAX_IMAGE_SIZE_MB * 1024 * 1024) {
        setStatus(`❌ Image must be under ${MAX_IMAGE_SIZE_MB}MB`);
        setFile(null);
        setImagePreview(null);
        return;
      }
      if (!ALLOWED_IMAGE_TYPES.includes(selectedFile.type)) {
        setStatus(`❌ Only PNG, JPEG, GIF, or WebP images allowed`);
        setFile(null);
        setImagePreview(null);
        return;
      }
      setStatus('');
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

    let baseFee = 0.15;
    const details: string[] = [];

    if (revokeMint) { baseFee += 0.15; details.push('Revoke Mint: +0.15 SOL'); }
    if (revokeFreeze) { baseFee += 0.15; details.push('Revoke Freeze: +0.15 SOL'); }
    if (revokeUpdate) { baseFee += 0.15; details.push('Revoke Update: +0.15 SOL'); }

    return {
      amount: `${baseFee.toFixed(2)} SOL`,
      label: `Launch on Mainnet • Network rent included`,
      badge: `🔴 Live on Mainnet`,
      details: details.length > 0 ? details.join(' • ') : 'No authority revocations',
      numericAmount: baseFee,
    };
  };

  const fee = getFee();

  // 🔥 Upload to Pinata
  const uploadToPinata = async (fileToUpload: File): Promise<{ uri: string; IpfsHash: string }> => {
    const formData = new FormData();
    formData.append('file', fileToUpload);

    const response = await fetch('/api/upload', {
      method: 'POST',
      body: formData,
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.error || 'Failed to upload to Pinata');
    }

    const data = await response.json();
    return {
      uri: data.url || `https://gateway.pinata.cloud/ipfs/${data.IpfsHash}`,
      IpfsHash: data.IpfsHash,
    };
  };

  // 🔥 AUTO-SAVE TO DATABASE
  const saveTokenToDatabase = async (tokenData: {
    mint_address: string;
    name: string;
    symbol: string;
    description: string;
    image_url: string;
    metadata_uri: string;
    network: string;
    creator_wallet: string;
    supply: number;
    decimals: number;
    revoke_mint: boolean;
    revoke_freeze: boolean;
    revoke_update: boolean;
  }) => {
    console.log('🔍 Attempting to save token:', tokenData);
    
    try {
      const response = await fetch('/api/tokens', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(tokenData),
      });

      console.log('📡 Response status:', response.status);
      const result = await response.json();
      console.log('📦 Response data:', result);

      if (!response.ok) {
        console.error('❌ Failed to save token:', result);
      } else {
        console.log('✅ Token saved to database:', result);
      }
    } catch (error) {
      console.error('❌ Error saving token:', error);
    }
  };

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
    setMintAddress('');
    setImageUri('');
    setMetadataUri('');
    setStatus('⏳ Uploading image to IPFS...');

    try {
      // 🔥 Upload image to Pinata
      const uploadedImage = await uploadToPinata(file);
      const imageUriResult = uploadedImage.uri;
      setImageUri(imageUriResult);

      // 🔥 Upload metadata to Pinata
      setStatus('⏳ Uploading metadata to IPFS...');
      const metadata = {
        name: formData.name.trim(),
        symbol: formData.symbol.trim().toUpperCase(),
        description: formData.description.trim(),
        image: imageUriResult,
        external_url: formData.website.trim() || '',
        attributes: [
          { trait_type: 'Decimals', value: decimalsNum },
          { trait_type: 'Supply', value: supplyNum },
          { trait_type: 'Network', value: network },
        ],
        properties: {
          creators: [
            {
              address: publicKey.toBase58(),
              share: 100,
            },
          ],
          files: [
            {
              uri: imageUriResult,
              type: file.type,
            },
          ],
        },
      };

      const metadataFile = new File([JSON.stringify(metadata)], 'metadata.json', {
        type: 'application/json',
      });
      const uploadedMetadata = await uploadToPinata(metadataFile);
      const metadataUriResult = uploadedMetadata.uri;
      setMetadataUri(metadataUriResult);

      // 🔥 Create token on Solana
      setStatus('⏳ Minting token on Solana...');
      
      const { createToken: createTokenLib } = await import('@/lib/create-token');

      const result = await createTokenLib({
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
        website: formData.website.trim() || undefined,
        twitter: formData.twitter.trim() || undefined,
        telegram: formData.telegram.trim() || undefined,
        discord: formData.discord.trim() || undefined,
      });

      // Handle both string and object responses
      let txIdResult = '';
      let mintAddressResult = '';

      if (typeof result === 'string') {
        txIdResult = result;
      } else if (result && typeof result === 'object') {
        const res = result as { txId?: string; mintAddress?: string };
        txIdResult = res.txId || '';
        mintAddressResult = res.mintAddress || '';
      }

      console.log('🔍 Mint Address from result:', mintAddressResult);
      console.log('🔍 Tx ID from result:', txIdResult);

      setTxId(txIdResult);
      setMintAddress(mintAddressResult);
      setStatus('');

      // 🔥🔥🔥 AUTO-SAVE TO DATABASE 🔥🔥🔥
      if (mintAddressResult) {
        console.log('✅ Mint address found, saving to database...');
        await saveTokenToDatabase({
          mint_address: mintAddressResult,
          name: formData.name.trim(),
          symbol: formData.symbol.trim().toUpperCase(),
          description: formData.description.trim(),
          image_url: imageUriResult,
          metadata_uri: metadataUriResult,
          network: network,
          creator_wallet: publicKey.toBase58(),
          supply: supplyNum,
          decimals: decimalsNum,
          revoke_mint: revokeMint,
          revoke_freeze: revokeFreeze,
          revoke_update: revokeUpdate,
        });
      } else {
        console.log('❌ No mint address found, skipping database save');
      }

      setStatus('✅ Token created successfully!');

    } catch (error: any) {
      console.error('Creation failed:', error);
      const msg = error.message || '';

      // Block height exceeded means tx was sent but confirmation timed out
      if (
        msg.includes('block height exceeded') ||
        (msg.includes('Signature') && msg.includes('expired'))
      ) {
        const sigMatch = msg.match(/([1-9A-HJ-NP-Za-km-z]{87,88})/);
        if (sigMatch) {
          setTxId(sigMatch[1]);
          setStatus('⚠️ Transaction may have succeeded but confirmation timed out. Check your wallet.');
        } else {
          setStatus('⚠️ Transaction may have succeeded but confirmation timed out. Check your wallet for the new token.');
        }
        return;
      }

      let errorMessage = 'Unknown error occurred';

      if (msg.includes('insufficient')) {
        const requiredSol = fee.numericAmount > 0 ? fee.numericAmount + 0.05 : 0;
        errorMessage = `Insufficient SOL balance. You need at least ${requiredSol.toFixed(2)} SOL.`;
      } else if (msg.includes('rejected') || msg.includes('User rejected')) {
        errorMessage = 'Transaction was rejected in wallet.';
      } else if (msg.includes('Pinata') || msg.includes('upload')) {
        errorMessage = 'Image upload failed. Check your Pinata configuration.';
      } else {
        errorMessage = msg.slice(0, 150) || 'Transaction failed';
      }

      setStatus(`❌ ${errorMessage}`);
    } finally {
      setUploading(false);
    }
  };

  const solscanBase = network === 'devnet'
    ? 'https://solscan.io/tx/'
    : 'https://solscan.io/tx/';
  const solscanCluster = network === 'devnet' ? '?cluster=devnet' : '';

  return (
    <>
      <Suspense fallback={null}>
        <TemplateLoader onLoad={handleTemplateLoad} />
      </Suspense>

      <Card className="max-w-3xl mx-auto bg-zinc-900 border-zinc-800">
        <CardHeader>
          <CardTitle className="text-3xl flex items-center gap-3 text-white">
            <Rocket className="h-8 w-8 text-purple-500" />
            {selectedTemplate ? 'Create Your Solana Token' : 'Choose Your Token Type'}
          </CardTitle>
          <p className="text-zinc-400">
            {selectedTemplate
              ? 'Launch your token or memecoin on Solana with ZRP'
              : 'Select a template to get started. You can customize everything.'}
          </p>
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
          {!selectedTemplate ? (
            <div className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {Object.entries(templates).map(([key, template]) => (
                  <button
                    key={key}
                    onClick={() => {
                      setSelectedTemplate(key);
                      setFormData(prev => ({
                        ...prev,
                        supply: template.supply,
                        decimals: template.decimals,
                      }));
                      setRevokeMint(template.revokeMint);
                      setRevokeFreeze(template.revokeFreeze);
                      setRevokeUpdate(template.revokeUpdate);
                    }}
                    className="relative p-6 rounded-xl border border-zinc-700 hover:border-red-500 hover:bg-zinc-800/50 transition-all text-left group"
                  >
                    <span className="absolute top-3 right-3 text-xs font-bold px-2 py-1 rounded-full bg-red-500/20 text-red-400">
                      {template.badge}
                    </span>
                    <h3 className="text-xl font-bold text-white mb-2">{template.name}</h3>
                    <p className="text-sm text-zinc-400 mb-4">{template.description}</p>
                    <div className="flex gap-4 text-xs text-zinc-500">
                      <span>Supply: {parseInt(template.supply).toLocaleString()}</span>
                      <span>Decimals: {template.decimals}</span>
                    </div>
                    <div className="mt-3 flex gap-2 flex-wrap">
                      {template.revokeMint && <span className="text-xs bg-green-500/20 text-green-400 px-2 py-0.5 rounded">No Mint</span>}
                      {template.revokeFreeze && <span className="text-xs bg-green-500/20 text-green-400 px-2 py-0.5 rounded">No Freeze</span>}
                      {template.revokeUpdate && <span className="text-xs bg-green-500/20 text-green-400 px-2 py-0.5 rounded">Immutable</span>}
                    </div>
                  </button>
                ))}
              </div>
              <button
                onClick={() => setSelectedTemplate('custom')}
                className="w-full p-4 rounded-xl border border-dashed border-zinc-600 hover:border-zinc-400 text-zinc-400 hover:text-white transition-all"
              >
                🛠️ Start from Scratch — Full Customization
              </button>
            </div>
          ) : (
            <>
              <div className="flex items-center gap-2 mb-2">
                <button
                  onClick={() => setSelectedTemplate(null)}
                  className="text-sm text-zinc-400 hover:text-white"
                >
                  ← Back to Templates
                </button>
                <span className="text-sm text-zinc-600">|</span>
                <span className="text-sm font-medium text-red-400">
                  {templates[selectedTemplate as keyof typeof templates]?.name || 'Custom'}
                </span>
              </div>

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

              <div className="space-y-4 pt-4 border-t border-zinc-800">
                <Label className="text-lg text-white">Socials & Links (Recommended)</Label>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label className="text-white">Website</Label>
                    <Input name="website" value={formData.website} onChange={handleInputChange} placeholder="https://yourtoken.com" className="bg-zinc-800 border-zinc-700 text-white" />
                  </div>
                  <div>
                    <Label className="text-white">X / Twitter</Label>
                    <Input name="twitter" value={formData.twitter} onChange={handleInputChange} placeholder="https://x.com/yourtoken" className="bg-zinc-800 border-zinc-700 text-white" />
                  </div>
                  <div>
                    <Label className="text-white">Telegram</Label>
                    <Input name="telegram" value={formData.telegram} onChange={handleInputChange} placeholder="https://t.me/yourtoken" className="bg-zinc-800 border-zinc-700 text-white" />
                  </div>
                  <div>
                    <Label className="text-white">Discord</Label>
                    <Input name="discord" value={formData.discord} onChange={handleInputChange} placeholder="https://discord.gg/..." className="bg-zinc-800 border-zinc-700 text-white" />
                  </div>
                </div>
              </div>

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
                  <img src={imagePreview} className="mt-4 max-h-48 rounded-xl border border-zinc-800" alt="Preview" />
                )}
              </div>

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

              <div className="bg-zinc-900 p-6 rounded-xl text-center border border-purple-500/20">
                <div className="text-3xl font-bold text-purple-400">{fee.amount}</div>
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

              <Button
                onClick={createToken}
                disabled={uploading || !publicKey || !file || !formData.name || !formData.symbol}
                className="w-full py-7 text-lg bg-purple-600 hover:bg-purple-700 disabled:opacity-50 text-white"
              >
                {uploading ? <Loader2 className="mr-3 h-5 w-5 animate-spin" /> : null}
                {uploading ? 'Creating Token...' : `Create & Mint Token (${fee.amount})`}
              </Button>

              {status && (
                <div className={`text-center text-sm ${
                  status.startsWith('✅') ? 'text-green-400' :
                  status.startsWith('❌') ? 'text-red-400' :
                  status.startsWith('⚠️') ? 'text-yellow-400' :
                  'text-zinc-400'
                }`}>
                  <p>{status}</p>
                </div>
              )}

              {txId && (
                <div className="bg-green-900/30 border border-green-500/30 rounded-xl p-6 text-center space-y-3">
                  <CheckCircle className="h-12 w-12 text-green-400 mx-auto" />
                  <p className="text-green-400 font-bold text-xl">🎉 Token Created Successfully!</p>
                  <p className="text-zinc-400 text-sm">
                    Your token <span className="text-white font-semibold">{formData.symbol}</span> has been launched on Solana {network === 'devnet' ? 'Devnet' : 'Mainnet'}.
                  </p>
                  {mintAddress && (
                    <div className="bg-zinc-800 rounded-lg p-3">
                      <p className="text-xs text-zinc-500 mb-1">Mint Address</p>
                      <p className="text-xs text-purple-400 font-mono break-all">{mintAddress}</p>
                    </div>
                  )}
                  <div className="flex flex-col gap-2 pt-2">
                    <a
                      href={`${solscanBase}${txId}${solscanCluster}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center justify-center gap-2 bg-purple-600 hover:bg-purple-700 text-white text-sm px-4 py-2 rounded-lg transition-colors"
                    >
                      View Transaction on Solscan <ExternalLink className="h-3 w-3" />
                    </a>
                    <button
                      onClick={() => {
                        setTxId('');
                        setMintAddress('');
                        setStatus('');
                        setFile(null);
                        setImagePreview(null);
                        setImageUri('');
                        setMetadataUri('');
                        setFormData({ name: '', symbol: '', description: '', website: '', twitter: '', telegram: '', discord: '', supply: '1000000000', decimals: '9' });
                        setSelectedTemplate(null);
                      }}
                      className="text-sm text-zinc-400 hover:text-white transition-colors"
                    >
                      Create Another Token
                    </button>
                  </div>
                </div>
              )}
            </>
          )}
        </CardContent>
      </Card>
    </>
  );
};

export default CreateToken;
