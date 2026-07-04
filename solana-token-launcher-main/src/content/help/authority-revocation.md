---
title: Authority Revocation
description: Understand what authority revocation means and why it matters
category: Creating Tokens
order: 5
---

# Authority Revocation

Revoking authorities is one of the most important trust signals you can give to your token holders. This guide explains what it means and why it matters.

## What Are Token Authorities?

When you create a token, you hold three special powers called authorities:

| Authority | What It Controls |
|-----------|------------------|
| **Mint Authority** | Ability to create more tokens |
| **Freeze Authority** | Ability to freeze token accounts |
| **Update Authority** | Ability to change token metadata |

## What Does Revoking Mean?

Revoking means **permanently giving up these powers**. Once revoked:

- ❌ You cannot mint more tokens
- ❌ You cannot freeze accounts
- ❌ You cannot update metadata

> ⚠️ **Important:** Revoking is **permanent**. You cannot get these powers back.

## Why Revoke Authorities?

### 1. Build Trust

| Trust Signal | Impact |
|--------------|--------|
| Mint revoked | ✅ Supply is fixed |
| Freeze revoked | ✅ No one can freeze holders |
| Update revoked | ✅ Metadata is permanent |

### 2. Prove Fixed Supply

When you revoke mint authority, you prove that:

- ✅ Supply cannot increase
- ✅ No inflation
- ✅ Holders can't be diluted

### 3. Show Decentralization

By giving up control, you show that:

- ✅ You're not in control
- ✅ The token belongs to the community
- ✅ No one has special powers

## Cost of Revocation

| Authority | Cost |
|-----------|------|
| Mint Authority | +0.15 SOL |
| Freeze Authority | +0.15 SOL |
| Update Authority | +0.15 SOL |
| **All Three** | **+0.45 SOL** |

## When to Revoke

### Revoke Immediately

- ✅ Maximum trust from day one
- ✅ Done during creation
- ✅ Simplest approach

### Revoke Later

- ✅ Keep flexibility during testing
- ✅ Revoke when ready
- ✅ Still builds trust

### Keep Some

- ✅ Mint authority kept for vesting
- ✅ Update authority kept for flexibility
- ✅ Find the right balance

## Recommended Settings

| Token Type | Mint | Freeze | Update |
|------------|------|--------|--------|
| **Meme Coin** | ✅ Revoke | ✅ Revoke | ✅ Revoke |
| **Utility Token** | ❌ Keep | ✅ Revoke | ✅ Revoke |
| **Governance DAO** | ❌ Keep | ✅ Revoke | ✅ Revoke |
| **Simple Token** | ✅ Revoke | ✅ Revoke | ❌ Keep |

## How to Revoke

### During Creation

1. Check the boxes for:
   - ✅ Revoke Mint Authority
   - ✅ Revoke Freeze Authority
   - ✅ Revoke Update Authority

2. The revocation happens automatically when you create the token

### After Creation

1. Go to the [Revoke Authority tool](/revoke)
2. Enter your token's mint address
3. Select which authority to revoke
4. Confirm the transaction

## Verify Revocation

Check that authorities are revoked by:

1. Going to [Solscan](https://solscan.io)
2. Searching for your token
3. Looking at the authority fields
4. They should show as "Revoked" or "None"

---

## Related Articles

- [Security Settings](/help/security-settings)
- [Token Authorities Explained](/help/token-authorities)
- [Revoke Authority Tool](/help/revoke-after)
- [Security Checklist](/help/security-checklist)
