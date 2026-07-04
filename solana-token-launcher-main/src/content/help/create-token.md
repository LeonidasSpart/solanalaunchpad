---
title: How to Create a Token on ZRP
description: Complete step-by-step guide to creating your first token
category: Creating Tokens
order: 1
---

# How to Create a Token on ZRP

Creating a token on ZRP is designed to be simple and fast. This guide walks you through every step.

## Quick Overview

| Step | Action | Time |
|------|--------|------|
| 1 | Connect wallet | 10 seconds |
| 2 | Choose template | 10 seconds |
| 3 | Fill token details | 20 seconds |
| 4 | Upload image | 10 seconds |
| 5 | Configure security | 10 seconds |
| 6 | Create token | 60 seconds |
| **Total** | | **~2 minutes** |

## Step 1: Connect Your Wallet

1. Go to [ZRP Create Token](https://zrp.one/create-mint)
2. Click **"Select Wallet"** in the top right corner
3. Choose your wallet (Phantom, Solflare, or Backpack)
4. Approve the connection in your wallet

> 💡 **Tip:** Make sure you have at least 0.05 SOL for Devnet or 0.2 SOL for Mainnet.

## Step 2: Choose a Template (Optional)

You'll see four templates to choose from:

| Template | Supply | Decimals | Best For |
|----------|--------|----------|----------|
| **Meme Coin** | 1,000,000,000 | 0 | Viral community tokens |
| **Utility Token** | 10,000,000 | 6 | Governance & utility |
| **Governance DAO** | 100,000,000 | 6 | Voting and delegation |
| **Simple Token** | 1,000,000 | 9 | Testing and private use |

You can also click **"Start from Scratch"** for full customization.

## Step 3: Fill Token Details

### Token Name
- Max 32 characters
- Example: "Pepe Coin", "Solana Cat", "My Project"

### Symbol (Ticker)
- Max 10 characters (usually 3-5)
- Example: "PEPE", "CAT", "MPT"
- Use uppercase letters only

### Description
- Optional but recommended
- Explain what your token does
- Keep it clear and concise

### Total Supply
- For memecoins: 1,000,000,000 (1 billion)
- For utility tokens: 10,000,000 (10 million)
- For DAOs: 100,000,000 (100 million)
- For testing: 1,000,000 (1 million)

### Decimals
- **6** — For memecoins (no fractions)
- **6** — For utility tokens and DAOs
- **9** — For standard tokens (Solana default)

## Step 4: Upload Image

### Image Requirements
- **Format:** PNG, JPEG, GIF, or WebP
- **Size:** Max 5MB
- **Resolution:** At least 200x200 pixels recommended

### How to Upload
1. Click **"Choose File"**
2. Select your image
3. Preview will appear

> 💡 **Tip:** For best results, use a square image with a transparent background.

## Step 5: Configure Security

### Security Options

| Option | What It Does | Cost |
|--------|--------------|------|
| **Revoke Mint** | No more tokens can be minted | +0.15 SOL |
| **Revoke Freeze** | No accounts can be frozen | +0.15 SOL |
| **Revoke Update** | Metadata becomes permanent | +0.15 SOL |

### Recommended Settings

| Token Type | Mint | Freeze | Update |
|------------|------|--------|--------|
| **Meme Coin** | ✅ Revoke | ✅ Revoke | ✅ Revoke |
| **Utility Token** | ❌ Keep | ✅ Revoke | ✅ Revoke |
| **Governance DAO** | ❌ Keep | ✅ Revoke | ✅ Revoke |
| **Simple Token** | ✅ Revoke | ✅ Revoke | ❌ Keep |

## Step 6: Create Token

1. Review all details
2. Check the fee (FREE on Devnet)
3. Click **"Create & Mint Token"**
4. Confirm the transaction in your wallet
5. Wait for confirmation (usually 30-60 seconds)

## Step 7: What Happens Next

After creation, you'll see:
