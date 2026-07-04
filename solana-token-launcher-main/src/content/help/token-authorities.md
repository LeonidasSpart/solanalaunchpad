---
title: Understanding Token Authorities
description: Complete guide to Mint, Freeze, and Update authorities
category: Security & Trust
order: 1
---

# Understanding Token Authorities

Token authorities are special permissions that control your token. This guide explains each one and why they matter.

## What Are Token Authorities?

| Authority | What It Controls |
|-----------|------------------|
| **Mint Authority** | Who can create more tokens |
| **Freeze Authority** | Who can freeze token accounts |
| **Update Authority** | Who can change token metadata |

## Mint Authority

### What It Does

- **Controls** creating new tokens
- **Default** The token creator (you)
- **Can Be** Revoked permanently

### Why It Matters

| Status | Implication |
|--------|-------------|
| **Active** | You can mint more tokens anytime |
| **Revoked** | Supply is fixed forever |

### Use Cases

| Keep | Revoke |
|------|--------|
| Need to mint more later | Fixed supply token |
| Vesting schedules | Memecoin |
| Staking rewards | Community token |

## Freeze Authority

### What It Does

- **Controls** freezing token accounts
- **Default** The token creator (you)
- **Can Be** Revoked permanently

### Why It Matters

| Status | Implication |
|--------|-------------|
| **Active** | You can freeze any account |
| **Revoked** | No one can freeze accounts |

### Use Cases

| Keep | Revoke |
|------|--------|
| Compliance requirements | Decentralized project |
| Security concerns | Memecoin |
| Limited use cases | Community token |

## Update Authority

### What It Does

- **Controls** changing metadata
- **Default** The token creator (you)
- **Can Be** Revoked permanently

### Why It Matters

| Status | Implication |
|--------|-------------|
| **Active** | Can change name, logo, description |
| **Revoked** | Metadata is permanent |

### Use Cases

| Keep | Revoke |
|------|--------|
| Planning updates | Finalized project |
| Brand evolution | Memecoin |
| Testing phase | Serious project |

## How Authorities Work

### During Creation

1. You hold all authorities initially
2. You can choose to revoke any or all
3. Revocation happens in the same transaction

### After Creation

1. You still hold authorities
2. You can revoke later
3. Revocation is permanent

## Authority Status

### Active Authority

- ✅ You have control
- ✅ Can perform actions
- ✅ Can revoke anytime

### Revoked Authority

- ❌ No one has control
- ❌ Cannot perform actions
- ❌ Permanent status

## Building Trust

### Trust Signals

| Action | Trust Level |
|--------|-------------|
| No authorities revoked | ⚠️ Low trust |
| Freeze revoked | ✅ Medium trust |
| Mint + Freeze revoked | ✅✅ High trust |
| All authorities revoked | ✅✅✅ Maximum trust |

## Security Implications

### If You Keep Authorities

| Risk | Impact |
|------|--------|
| **Mint** | Could dilute holders |
| **Freeze** | Could freeze accounts |
| **Update** | Could change token identity |

### If You Revoke Authorities

| Benefit | Impact |
|---------|--------|
| **Mint** | Supply is fixed |
| **Freeze** | No one can freeze |
| **Update** | Identity is locked |

## Making the Decision

### Questions to Ask

1. Will I need to mint more tokens?
2. Do I need to freeze accounts for compliance?
3. Will I need to update metadata later?

### Recommendation

| Token Type | Mint | Freeze | Update |
|------------|------|--------|--------|
| **Meme Coin** | ✅ Revoke | ✅ Revoke | ✅ Revoke |
| **Utility Token** | ❌ Keep | ✅ Revoke | ✅ Revoke |
| **Governance DAO** | ❌ Keep | ✅ Revoke | ✅ Revoke |
| **Simple Token** | ✅ Revoke | ✅ Revoke | ❌ Keep |

---

## Related Articles

- [Authority Revocation](/help/authority-revocation)
- [Security Settings](/help/security-settings)
- [Security Checklist](/help/security-checklist)
