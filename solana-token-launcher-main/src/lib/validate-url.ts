/**
 * Validate and sanitize URLs for social links
 * Prevents XSS, phishing, and malicious redirects
 */

// List of allowed domains for social links
const ALLOWED_DOMAINS = [
  // Twitter/X
  'x.com',
  'twitter.com',
  // Discord
  'discord.com',
  'discord.gg',
  // Telegram
  't.me',
  'telegram.org',
  // GitHub
  'github.com',
  // Other commonly used
  'youtube.com',
  'youtu.be',
  'medium.com',
  'mirror.xyz',
];

/**
 * Validate a URL for safety
 * Returns true if the URL is safe, false otherwise
 */
export function isValidUrl(url: string): boolean {
  if (!url) return false;

  try {
    // Trim whitespace
    const trimmed = url.trim();
    
    // If it's just empty after trimming
    if (!trimmed) return false;

    // Check if it's a valid URL
    let parsed: URL;
    try {
      // Handle URLs without protocol
      let urlToParse = trimmed;
      if (!urlToParse.startsWith('http://') && !urlToParse.startsWith('https://')) {
        urlToParse = 'https://' + urlToParse;
      }
      parsed = new URL(urlToParse);
    } catch {
      return false; // Invalid URL format
    }

    // Block JavaScript: URLs
    if (parsed.protocol === 'javascript:' || parsed.protocol === 'data:') {
      return false;
    }

    // Block IP addresses (potential phishing)
    const hostname = parsed.hostname;
    const ipRegex = /^(\d{1,3}\.){3}\d{1,3}$/;
    if (ipRegex.test(hostname)) {
      return false;
    }

    // Block localhost and internal IPs
    if (hostname === 'localhost' || hostname === '127.0.0.1' || hostname.endsWith('.local')) {
      return false;
    }

    // Allow any URL that starts with https://
    // We don't restrict to allowlisted domains for flexibility,
    // but we can optionally check against a domain allowlist for stricter control.
    // For now, we just make sure it's a valid HTTPS URL or HTTP URL.
    if (parsed.protocol !== 'https:' && parsed.protocol !== 'http:') {
      return false;
    }

    return true;
  } catch {
    return false;
  }
}

/**
 * Sanitize a URL (trim whitespace, add protocol if missing)
 */
export function sanitizeUrl(url: string): string {
  if (!url) return '';
  
  let trimmed = url.trim();
  
  // Add protocol if missing
  if (!trimmed.startsWith('http://') && !trimmed.startsWith('https://')) {
    trimmed = 'https://' + trimmed;
  }
  
  return trimmed;
}

/**
 * Validate and sanitize in one step
 */
export function validateAndSanitizeUrl(url: string): { isValid: boolean; sanitized: string; error?: string } {
  if (!url || url.trim() === '') {
    return { isValid: false, sanitized: '', error: 'URL is required' };
  }

  const sanitized = sanitizeUrl(url);
  const isValid = isValidUrl(sanitized);

  if (!isValid) {
    return { 
      isValid: false, 
      sanitized: '', 
      error: 'Invalid URL. Please enter a valid URL (e.g., https://example.com)' 
    };
  }

  return { isValid: true, sanitized };
}

/**
 * Check if a URL is from a trusted domain
 * (Optional – for stricter validation)
 */
export function isTrustedDomain(url: string): boolean {
  try {
    const parsed = new URL(url);
    const hostname = parsed.hostname.toLowerCase();
    
    // Check if the domain is in the allowlist
    return ALLOWED_DOMAINS.some(domain => 
      hostname === domain || hostname.endsWith('.' + domain)
    );
  } catch {
    return false;
  }
}
