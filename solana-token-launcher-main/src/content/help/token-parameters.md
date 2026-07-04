---
title: Token Parameters Explained
description: Understand the key parameters for creating a Solana token
category: Creating Tokens
order: 3
---

# Token Parameters Explained

When creating a token, you need to set several parameters. This guide explains each one in detail.

## Name

| Property | Details |
|----------|---------|
| **Max Length** | 32 characters |
| **Examples** | "Pepe Coin", "Solana Cat" |
| **Best Practice** | Memorable, relevant, unique |

### Tips
- Keep it simple and easy to remember
- Avoid special characters or emojis
- Make it relevant to your project

## Symbol (Ticker)

| Property | Details |
|----------|---------|
| **Max Length** | 10 characters |
| **Examples** | "PEPE", "CAT", "MPT" |
| **Best Practice** | 3-5 letters, uppercase |

### Tips
- Use uppercase letters
- Keep it short (3-5 letters)
- Make it easy to type and remember

## Total Supply

| Property | Details |
|----------|---------|
| **Type** | Positive integer |
| **Examples** | 1,000,000,000 |
| **Best Practice** | Depends on token type |

### Guidelines

| Token Type | Recommended Supply | Why |
|------------|-------------------|-----|
| **Meme Coin** | 1,000,000,000 | Large for viral distribution |
| **Utility Token** | 10,000,000 | Controlled for tokenomics |
| **Governance DAO** | 100,000,000 | Enough for voting weight |
| **Simple Token** | 1,000,000 | Small for testing |

### Considerations
- **Too high** → Each token has less value
- **Too low** → Not enough for distribution
- **Fixed supply** → Revoke mint authority

## Decimals

| Property | Details |
|----------|---------|
| **Range** | 0-9 |
| **Default** | 9 |
| **Example** | 6 = 0.000001 divisible |

### Guidelines

| Decimals | Best For | Example |
|----------|----------|---------|
| **0** | Memecoins | 1,000,000 |
| **6** | Utility tokens | 1.000000 |
| **9** | Standard tokens | 1.000000001 |

### What It Means
- **0 decimals** → Only whole numbers
- **6 decimals** → 1,000,000 divisible parts
- **9 decimals** → 1,000,000,000 divisible parts

## Network (Devnet/Mainnet)

| Network | Use For | Cost |
|---------|---------|------|
| **Devnet** | Testing | Free |
| **Mainnet** | Production | 0.15-0.60 SOL |

### Devnet
- ✅ Free testing
- ✅ No real value
- ✅ Experiment freely

### Mainnet
- ✅ Real tokens
- ✅ DEX trading
- ✅ Community building

## Authorities

### Mint Authority
- **What it does:** Allows creating more tokens
- **Revoked:** Fixed supply ✅
- **Kept:** Can mint more 🔄

### Freeze Authority
- **What it does:** Allows freezing accounts
- **Revoked:** No one can freeze ✅
- **Kept:** Can freeze accounts 🔄

### Update Authority
- **What it does:** Allows changing metadata
- **Revoked:** Metadata is permanent ✅
- **Kept:** Can update metadata 🔄

---

## Related Articles

- [How to Create a Token](/help/create-token)
- [Using Templates](/help/templates)
- [Security Settings](/help/security-settings)
- [Authority Revocation](/help/authority-revocation)
