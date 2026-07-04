# Uploading Images to IPFS

When you create a token on ZRP, your image is uploaded to IPFS via Pinata. This guide explains the process.

## Why IPFS?

| Feature | Benefit |
|---------|---------|
| **Decentralized** | No single point of failure |
| **Permanent** | Content is always available |
| **Censorship-Resistant** | Cannot be removed |
| **Trusted** | Used by major projects |

## Image Requirements

| Requirement | Details |
|-------------|---------|
| **Formats** | PNG, JPEG, GIF, WebP |
| **Max Size** | 5MB |
| **Recommended** | 512x512 or 256x256 pixels |

## Supported Formats

| Format | Best For | Quality |
|--------|----------|---------|
| **PNG** | Logos, transparent backgrounds | High |
| **JPEG** | Photos, complex images | Medium |
| **GIF** | Animations | Low |
| **WebP** | Modern, smaller files | High |

## How to Upload

1. Click **"Choose File"**
2. Select your image
3. Preview will appear
4. Image is automatically uploaded to IPFS when you create the token

## Common Issues

### "Invalid file type"

**Solution:** Use PNG, JPEG, GIF, or WebP format.

### "File too large"

**Solution:** Compress image to under 5MB.

### "Image not showing"

**Solution:** Wait a moment for IPFS to propagate, then refresh.

## Image Best Practices

| Practice | Why |
|----------|-----|
| **Square image** | Displays correctly on all platforms |
| **Transparent background** | Looks clean on dark/light modes |
| **At least 200x200** | Maintains quality at different sizes |
| **Clear and simple** | Recognizable at small sizes |

## How It Works

1. **You upload** → Image sent to Pinata
2. **Pinata stores** → Image added to IPFS
3. **IPFS hash** → Unique identifier created
4. **Gateway URL** → Image accessible via gateway.pinata.cloud

## View Your Image

After token creation, your image will be available at:

```

https://gateway.pinata.cloud/ipfs/YOUR_CID

```

You can see it on:
- ✅ Solscan
- ✅ Phantom/Solflare wallet
- ✅ Token Explorer
- ✅ Token Details page

---

## Related Articles

- [How to Create a Token](/help/create-token)
- [Token Parameters Explained](/help/token-parameters)
- [Troubleshooting Image Issues](/help/image-upload-issue)
```

---
