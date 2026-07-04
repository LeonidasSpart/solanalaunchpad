# RPC Connection Errors

RPC errors can occur when your app can't connect to the Solana network. This guide explains why and how to fix them.

## What Is RPC?

| Term | Definition |
|------|------------|
| **RPC** | Remote Procedure Call |
| **Purpose** | Connects your app to Solana |
| **Required** | For all blockchain interactions |

## Common RPC Errors

### "Connection closed unexpectedly"

```

Error: Connection closed unexpectedly

```

**Cause:** RPC endpoint is slow or unavailable.

**Solution:**
1. Refresh the page
2. Try again later
3. Check your internet

### "RPC 502 Bad Gateway"

```

Error: 502 Bad Gateway

```

**Cause:** The RPC service is having issues.

**Solution:**
1. Wait a few minutes
2. Try again
3. Contact support if persistent

### "RPC rate limit exceeded"

```

Error: Rate limit exceeded

```

**Cause:** Too many requests in a short time.

**Solution:**
1. Wait a few minutes
2. Reduce request frequency
3. Try again

### "RPC timeout"

```

Error: Request timed out

```

**Cause:** RPC is taking too long to respond.

**Solution:**
1. Refresh the page
2. Try again
3. Check your connection

## Why RPC Errors Happen

### 1. Network Congestion

- Solana network is busy
- Too many transactions
- RPC can't keep up

### 2. RPC Provider Issues

- Free tier limits
- Rate limiting
- Provider downtime

### 3. Your Connection

- Slow internet
- Firewall issues
- VPN interference

## How to Fix

### Quick Fixes

| Step | Action |
|------|--------|
| 1 | Refresh the page |
| 2 | Wait 30 seconds |
| 3 | Try again |
| 4 | Check internet |

### Advanced Fixes

| Step | Action |
|------|--------|
| 1 | Clear browser cache |
| 2 | Try incognito mode |
| 3 | Use different browser |
| 4 | Check firewall settings |

## Prevention Tips

### 1. Use Reliable RPC

ZRP uses multiple RPC endpoints:
- Helius
- Public Solana RPC
- Fallback providers

### 2. Limit Requests

- Avoid refreshing too often
- Wait between actions
- Let transactions complete

### 3. Stable Connection

- Use a stable internet connection
- Avoid VPNs (if possible)
- Ensure low latency

## What ZRP Does

### Multiple RPC Endpoints

| Provider | Purpose |
|----------|---------|
| **Helius** | Primary RPC |
| **Public** | Fallback |
| **Additional** | Load balancing |

### Auto-Fallback

If one RPC fails, ZRP automatically tries another.

### Retry Logic

Failed requests are automatically retried.

## Common Solutions

### If Error Persists

1. **Refresh** the page
2. **Reconnect** your wallet
3. **Try** a different network
4. **Wait** a few minutes
5. **Contact** support

### For Developers

- Use multiple RPC endpoints
- Implement retry logic
- Add timeouts
- Monitor RPC health

## Contact Support

If RPC errors persist:

1. [Contact us](/contact)
2. Include:
   - Error message
   - What you were doing
   - Time of error
   - Browser information

---

## Related Articles

- [Transaction Failed](/help/transaction-failed)
- [Connection Issues](/help/connection-issues)
- [Insufficient SOL Balance](/help/insufficient-sol)
```

---
