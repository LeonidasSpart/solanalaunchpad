# Security Policy

## Supported Versions

| Version | Supported          |
| ------- | ------------------ |
| latest  | :white_check_mark: |
| < 1.0   | :x:                |

## Reporting a Vulnerability

We take security seriously. If you discover a vulnerability in ZRP, please report it responsibly.

### How to Report

1. **DO NOT** open a public GitHub issue for security vulnerabilities
2. Email us directly at: **security@zrp.one**
3. Include:
   - Description of the vulnerability
   - Steps to reproduce
   - Potential impact
   - Suggested fix (if any)

### Response Timeline

| Action | Timeline |
|--------|----------|
| Acknowledgment | Within 48 hours |
| Initial assessment | Within 7 days |
| Fix released | Within 30 days (critical), 90 days (non-critical) |
| Public disclosure | After fix is deployed + 7 days grace period |

### What We Expect

- Give us reasonable time to fix the issue before disclosing publicly
- Do not exploit the vulnerability beyond minimal proof-of-concept
- Do not access, modify, or delete other users' data
- Do not perform Denial of Service attacks

### What You Can Expect

- Credit in our security advisories (if you wish)
- Transparency about the fix timeline
- No legal action for good-faith security research

## Security Measures

ZRP implements the following security practices:

### Non-Custodial Design
- We never see or store your private keys
- All transactions are wallet-signed
- No seed phrases are ever collected

### Open Source
- Fully auditable codebase
- No hidden logic or backdoors
- Community can verify all operations

### Authority Revocation
- Revoke Mint Authority — Prevents future token minting
- Revoke Freeze Authority — Prevents freezing token accounts
- Revoke Update Authority — Makes metadata immutable

### Fee Transparency
- Fee amount is hardcoded in source code
- Fee recipient is publicly visible
- No hidden fees or subscriptions

## Known Limitations

- IPFS metadata is permanent and cannot be deleted
- Authority revocation is irreversible
- Devnet tokens have no real value
- Mainnet transactions cost real SOL and are non-refundable

## Dependencies

We regularly audit our dependencies for known vulnerabilities:

```bash
npm audit
