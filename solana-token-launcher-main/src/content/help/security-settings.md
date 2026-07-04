---
title: Security Settings
description: Learn about the security settings available when creating a token
category: Creating Tokens
order: 6
---

# Security Settings

When creating a token on ZRP, you can configure security settings to build trust with your holders.

## Overview

| Setting | What It Does | Cost |
|---------|--------------|------|
| **Revoke Mint Authority** | Prevents minting more tokens | +0.15 SOL |
| **Revoke Freeze Authority** | Prevents freezing accounts | +0.15 SOL |
| **Revoke Update Authority** | Makes metadata immutable | +0.15 SOL |

## Revoke Mint Authority

### What It Does
- Prevents creating more tokens
- Supply becomes fixed
- No inflation possible

### Why It Matters

| Feature | Benefit |
|---------|---------|
| **Fixed Supply** | Holders know supply won't increase |
| **Scarcity** | Potential value increase |
| **Trust** | Shows commitment to tokenomics |

### When to Use
- ✅ Memecoins
- ✅ Fixed-supply projects
- ✅ When you want maximum trust

### When NOT to Use
- ❌ When you need vesting
- ❌ When you might mint more later
- ❌ When you need flexibility

## Revoke Freeze Authority

### What It Does
- Prevents freezing token accounts
- No one can lock holders' tokens
- True decentralization

### Why It Matters

| Feature | Benefit |
|---------|---------|
| **No Freezing** | Holders are safe |
| **Decentralized** | No one has special power |
| **Trust** | Cannot lock accounts |

### When to Use
- ✅ All serious projects
- ✅ When you want decentralization
- ✅ When building trust

### When NOT to Use
- ❌ When you need to freeze for compliance
- ❌ When you need to freeze for security

## Revoke Update Authority

### What It Does
- Makes metadata permanent
- Cannot change name, symbol, or logo
- Immutable on-chain data

### Why It Matters

| Feature | Benefit |
|---------|---------|
| **Permanent** | Identity is locked |
| **Trust** | Cannot change token identity |
| **Transparency** | What you see is final |

### When to Use
- ✅ When you're certain of details
- ✅ When you want maximum trust
- ✅ When branding is final

### When NOT to Use
- ❌ When you might update metadata
- ❌ When you're still testing
- ❌ When details might change

## Security Tiers

### Tier 1: Basic (0.15 SOL)
- ✅ Token creation
- No authorities revoked
- Basic trust

### Tier 2: Standard (0.30 SOL)
- ✅ Token creation
- ✅ Freeze authority revoked
- Medium trust

### Tier 3: Secure (0.60 SOL)
- ✅ Token creation
- ✅ All authorities revoked
- Maximum trust

## Recommendations by Token Type

| Token Type | Recommended Security | Cost |
|------------|---------------------|------|
| **Meme Coin** | All revoked | 0.60 SOL |
| **Utility Token** | Freeze + Update revoked | 0.45 SOL |
| **Governance DAO** | Freeze + Update revoked | 0.45 SOL |
| **Simple Token** | Mint + Freeze revoked | 0.45 SOL |

## Making the Decision

### Questions to Ask

1. Do I need to mint more tokens later?
2. Do I need to freeze accounts for compliance?
3. Do I need to update metadata later?

### Guidelines

- **Serious projects** → Revoke all
- **Flexibility needed** → Keep mint and update
- **Maximum trust** → Revoke all

---

## Related Articles

- [Authority Revocation](/help/authority-revocation)
- [Token Authorities Explained](/help/token-authorities)
- [Security Checklist](/help/security-checklist)
- [Pricing Guide](/help/pricing)
