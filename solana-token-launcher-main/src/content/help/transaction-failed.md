# Transaction Failed

Transaction failures can be frustrating. This guide explains why they happen and how to fix them.

## Common Reasons

### 1. Insufficient SOL Balance

| Issue | Solution |
|-------|----------|
| **Not enough SOL** | Add SOL to your wallet |
| **No fees** | SOL needed for transaction fees |
| **Rent not covered** | Need extra SOL for account rent |

### 2. Network Congestion

| Issue | Solution |
|-------|----------|
| **Solana network busy** | Try again later |
| **High fees** | Wait for lower fees |
| **Timeout** | Transaction took too long |

### 3. Wallet Issues

| Issue | Solution |
|-------|----------|
| **Wallet locked** | Unlock your wallet |
| **Wrong network** | Switch to correct network |
| **Wallet needs update** | Update your wallet |

### 4. Token Issues

| Issue | Solution |
|-------|----------|
| **Invalid mint address** | Check the address |
| **Already exists** | Token may already be created |
| **Invalid parameters** | Check your inputs |

## Error Messages

### "Insufficient balance"

```

Error: Insufficient balance. You need at least X SOL.

```

**Solution:**
1. Add more SOL to your wallet
2. Check your balance
3. Try again

### "Transaction simulation failed"

```

Error: Transaction simulation failed. Please check your inputs.

```

**Solution:**
1. Check your token details
2. Verify the mint address
3. Try again

### "Block height exceeded"

```

Error: Block height exceeded. Transaction may have succeeded.

```

**Solution:**
1. Check your wallet
2. Check Solscan for the transaction
3. The token may have been created

### "User rejected"

```

Error: User rejected the transaction.

```

**Solution:**
1. Approve the transaction in your wallet
2. Try again

### "RPC error"

```

Error: RPC connection failed.

```

**Solution:**
1. Refresh the page
2. Try again later
3. Check your internet connection

## How to Fix

### Step 1: Check Your Balance

| Network | Minimum Needed |
|---------|----------------|
| **Devnet** | 0.05 SOL |
| **Mainnet** | 0.2 SOL |

### Step 2: Check Your Network

1. Open your wallet
2. Check the network (Devnet/Mainnet)
3. Match the ZRP network

### Step 3: Refresh and Retry

1. Refresh the page
2. Reconnect your wallet
3. Try again

### Step 4: Check Wallet Connection

1. Make sure wallet is unlocked
2. Check wallet extension
3. Reconnect if needed

### Step 5: Wait and Try Again

1. Wait a few minutes
2. Try again
3. Solana network may be busy

## Prevention Tips

### Before Creating a Token

| Check | Why |
|-------|-----|
| **SOL balance** | Need fees and rent |
| **Correct network** | Devnet or Mainnet |
| **Wallet unlocked** | Need to approve |

### During Creation

| Check | Why |
|-------|-----|
| **All fields filled** | Complete form |
| **Valid inputs** | Correct format |
| **Ready to approve** | Wallet ready |

## What to Do If It Fails

### Step 1: Check Your Wallet

1. **Balance** — Do you have enough SOL?
2. **Network** — Are you on the right one?
3. **Status** — Is your wallet unlocked?

### Step 2: Check ZRP

1. **Refresh** the page
2. **Reconnect** your wallet
3. **Retry** the transaction

### Step 3: Check Solscan

1. Search for your transaction
2. Look for `mint_address` in the transaction
3. If found, your token was created

### Step 4: Contact Support

If nothing works:

1. [Contact us](/contact)
2. Include:
   - Error message
   - Steps you took
   - Transaction ID (if any)

---

## Related Articles

- [Insufficient SOL Balance](/help/insufficient-sol)
- [RPC Connection Errors](/help/rpc-errors)
- [Token Not Showing](/help/token-not-showing)
```
