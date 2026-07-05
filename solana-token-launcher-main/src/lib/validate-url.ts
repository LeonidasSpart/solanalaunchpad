/**
 * Validate and sanitize URLs for social links
 * Prevents XSS, phishing, and malicious redirects
 */

/**
 * Validate a URL for safety
 */
export function isValidUrl(url: string): boolean {
  if (!url) return false;

  try {
    const trimmed = url.trim();
    if (!trimmed) return false;

    let urlToParse = trimmed;
    if (!urlToParse.startsWith('http://') && !urlToParse.startsWith('https://')) {
      urlToParse = 'https://' + urlToParse;
    }
    const parsed = new URL(urlToParse);

    // Block javascript: and data: protocols
    if (parsed.protocol === 'javascript:' || parsed.protocol === 'data:') {
      return false;
    }

    // Block IP addresses
    const ipRegex = /^(\d{1,3}\.){3}\d{1,3}$/;
    if (ipRegex.test(parsed.hostname)) {
      return false;
    }

    // Block localhost / internal IPs
    if (parsed.hostname === 'localhost' || parsed.hostname === '127.0.0.1' || parsed.hostname.endsWith('.local')) {
      return false;
    }

    // Allow only http or https
    if (parsed.protocol !== 'https:' && parsed.protocol !== 'http:') {
      return false;
    }

    return true;
  } catch {
    return false;
  }
}

/**
 * Sanitize a URL (trim whitespace, add https:// if missing)
 */
export function sanitizeUrl(url: string): string {
  if (!url) return '';
  let trimmed = url.trim();
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
