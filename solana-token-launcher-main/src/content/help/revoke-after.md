---
title: Revoking Authorities After Creation
description: How to revoke authorities on an existing token
category: After Token Creation
order: 5
---

# Revoking Authorities After Creation

If you didn't revoke authorities during creation, you can still do it later. This guide shows you how.

## When to Revoke After Creation

| Reason | Explanation |
|--------|-------------|
| **Testing** | You wanted to test first |
| **Flexibility** | You needed to make changes |
| **Ready to Trust** | You're ready to commit |
| **Best Practice** | You forgot during creation |

## How to Revoke

### Step 1: Go to Revoke Authority

1. Navigate to [Revoke Authority](/revoke)
2. Click **"Select Wallet"**
3. Approve the connection

### Step 2: Enter Your Token

1. Paste your token's mint address
2. Click **"Check Authority"**

### Step 3: Select Authority

Choose which authority to revoke:

| Authority | What It Does |
|-----------|--------------|
| **Mint Authority** | Prevents minting more |
| **Freeze Authority** | Prevents freezing accounts |
| **Update Authority** | Makes metadata permanent |

### Step 4: Confirm Revocation

1. Review the details
2. Click **"Revoke"**
3. Approve in your wallet

## Important: It's Permanent!

> ⚠️ **Warning:** Revoking is permanent. Once revoked, you can never get the authority back.

### Before You Revoke

- ✅ Double-check your token details
- ✅ Make sure you're ready to commit
- ✅ Understand the implications

## What Happens After Revoking

| Authority | Result |
|-----------|--------|
| **Mint Revoked** | Supply is fixed forever |
| **Freeze Revoked** | No one can freeze accounts |
| **Update Revoked** | Metadata is locked forever |

## Verify Revocation

### On Solscan

1. Go to [Solscan](https://solscan.io)
2. Search for your token
3. Check the authority fields
4. They should show **"Revoked"**

### On ZRP

1. Go to your token's details page
2. Check the security status
3. It should show **"Revoked"**

## Costs

| Authority | Cost |
|-----------|------|
| Mint Authority | 0.1 SOL |
| Freeze Authority | 0.1 SOL |
| Update Authority | 0.1 SOL |
| **All Three** | **0.3 SOL** |

## Recommended Order

| Step | Priority |
|------|----------|
| 1 | Mint Authority |
| 2 | Freeze Authority |
| 3 | Update Authority |

> 💡 **Tip:** Start with Mint Authority — it's the most important trust signal.

## Common Questions

**Can I revoke just one authority?**
Yes, you can revoke individually.

**What if I change my mind?**
You can't — revoking is permanent.

**Can I check if it worked?**
Yes, check on Solscan.

---

## Related Articles

- [Authority Revocation Guide](/help/authority-revocation)
- [Security Settings](/help/security-settings)
- [Security Checklist](/help/security-checklist)
