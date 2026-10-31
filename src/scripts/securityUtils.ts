/**
 * Phase 09: Centralized Security, Input Sanitization & Privacy Utilities
 * Used across Contact forms, AI Assistant, and JSON-LD structured data serialization.
 */

/**
 * Strips ASCII control characters, null bytes, and angle brackets to prevent
 * injection or malformed payloads while preserving normal punctuation and international text.
 */
export function sanitizePlainText(input: unknown, maxLength: number): string {
  if (typeof input !== 'string') return '';
  return input
    .replace(/[\u0000-\u0008\u000B\u000C\u000E-\u001F\u007F]/g, '')
    .replace(/[<>]/g, '')
    .trim()
    .slice(0, maxLength);
}

/**
 * Validates and normalizes an optional HTTP/HTTPS website URL.
 * Strictly rejects javascript:, data:, vbscript:, file:, and malformed URLs.
 */
export function validateSafeHttpUrl(rawUrl: string): {
  valid: boolean;
  normalizedUrl: string;
  error?: string;
} {
  const trimmed = rawUrl.trim();
  if (!trimmed) {
    return { valid: true, normalizedUrl: '' };
  }

  if (trimmed.length > 200) {
    return {
      valid: false,
      normalizedUrl: '',
      error: 'Website URL must be 200 characters or fewer.',
    };
  }

  // Reject dangerous URI schemes immediately
  if (/^(javascript|data|vbscript|file|blob):/i.test(trimmed)) {
    return {
      valid: false,
      normalizedUrl: '',
      error: 'Only standard http:// or https:// website URLs are permitted.',
    };
  }

  const candidate = /^https?:\/\//i.test(trimmed)
    ? trimmed
    : `https://${trimmed}`;

  try {
    const parsed = new URL(candidate);
    if (parsed.protocol !== 'http:' && parsed.protocol !== 'https:') {
      return {
        valid: false,
        normalizedUrl: '',
        error: 'Only http:// and https:// URLs are supported.',
      };
    }
    if (!parsed.hostname || !parsed.hostname.includes('.')) {
      return {
        valid: false,
        normalizedUrl: '',
        error: 'Please enter a valid domain name (e.g. https://example.com).',
      };
    }
    return {
      valid: true,
      normalizedUrl: parsed.toString(),
    };
  } catch {
    return {
      valid: false,
      normalizedUrl: '',
      error: 'Please enter a valid website URL (or leave the field blank).',
    };
  }
}

/**
 * Validates an email address with strict length and RFC-compatible syntax bounds.
 */
export function isValidEmailAddress(rawEmail: string): boolean {
  const trimmed = rawEmail.trim();
  if (!trimmed || trimmed.length > 120) return false;
  const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  return emailRegex.test(trimmed);
}

/**
 * Redacts accidental payment card numbers or SSN-like sequences before transmitting
 * visitor messages to the AI endpoint to protect visitor privacy.
 */
export function redactSensitivePatterns(text: string): {
  redactedText: string;
  hadSensitivePattern: boolean;
} {
  let hadSensitivePattern = false;

  // 13-to-19 digit card-like sequences
  const cardPattern = /\b(?:\d[ -]*?){13,19}\b/g;
  // US SSN-like pattern
  const ssnPattern = /\b\d{3}-\d{2}-\d{4}\b/g;

  let redactedText = text.replace(cardPattern, () => {
    hadSensitivePattern = true;
    return '[REDACTED-NUMBER]';
  });

  redactedText = redactedText.replace(ssnPattern, () => {
    hadSensitivePattern = true;
    return '[REDACTED-ID]';
  });

  return { redactedText, hadSensitivePattern };
}

/**
 * Safely serializes an object to JSON for embedding inside a <script type="application/ld+json"> tag,
 * escaping <, >, and & so untrusted strings can never break out of the script element.
 */
export function safeJsonLdStringify(data: unknown): string {
  return JSON.stringify(data, null, 2)
    .replace(/</g, '\\u003c')
    .replace(/>/g, '\\u003e')
    .replace(/&/g, '\\u0026');
}
