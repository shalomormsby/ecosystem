/**
 * Syntax Tokenizer
 * Core tokenization logic for parsing code into syntax tokens
 */

import { SyntaxToken, Language } from './types';
import { TOKEN_PATTERNS } from './patterns';

interface Match {
  text: string;
  type: SyntaxToken['type'];
  index: number;
}

/**
 * Tokenizes source code into an array of syntax tokens
 *
 * @param code - The source code to tokenize
 * @param language - The programming language (currently only affects metadata, all use same patterns)
 * @returns Array of syntax tokens with text and type information
 *
 * @example
 * ```ts
 * const tokens = tokenize('const greeting = "Hello";');
 * // Returns:
 * // [
 * //   { text: 'const', type: 'keyword' },
 * //   { text: ' ', type: 'plain' },
 * //   { text: 'greeting', type: 'plain' },
 * //   { text: ' ', type: 'plain' },
 * //   { text: '=', type: 'operator' },
 * //   { text: ' ', type: 'plain' },
 * //   { text: '"Hello"', type: 'string' },
 * //   { text: ';', type: 'punctuation' },
 * // ]
 * ```
 */
export function tokenize(code: string, language: Language = 'typescript'): SyntaxToken[] {
  // If empty, return plain token
  if (!code || code.trim() === '') {
    return [{ text: code, type: 'plain' }];
  }

  // Collect all matches from all patterns
  const matches: Match[] = [];

  for (const { type, pattern } of TOKEN_PATTERNS) {
    // Reset regex lastIndex
    pattern.lastIndex = 0;

    let match;
    while ((match = pattern.exec(code)) !== null) {
      matches.push({
        text: match[0],
        type,
        index: match.index,
      });
    }
  }

  // Sort matches by position
  matches.sort((a, b) => a.index - b.index);

  // Remove overlapping matches (keep first match at each position)
  const nonOverlapping: Match[] = [];
  let lastEnd = 0;

  for (const match of matches) {
    if (match.index >= lastEnd) {
      nonOverlapping.push(match);
      lastEnd = match.index + match.text.length;
    }
  }

  // Build tokens array, filling gaps with plain text
  const tokens: SyntaxToken[] = [];
  let position = 0;

  for (const match of nonOverlapping) {
    // Add plain text before this match
    if (match.index > position) {
      const plainText = code.slice(position, match.index);
      tokens.push({ text: plainText, type: 'plain' });
    }

    // Add the matched token
    tokens.push({ text: match.text, type: match.type });
    position = match.index + match.text.length;
  }

  // Add any remaining plain text
  if (position < code.length) {
    tokens.push({ text: code.slice(position), type: 'plain' });
  }

  return tokens;
}

/**
 * Detects the language from code content or file extension
 * Currently returns 'typescript' for all cases as patterns support TS/JS/JSX/TSX
 *
 * @param code - The source code
 * @param filename - Optional filename for extension detection
 * @returns Detected language
 */
export function detectLanguage(code: string, filename?: string): Language {
  // For now, treat everything as TypeScript since our patterns support all variants
  // Future: Could detect based on JSX syntax or file extension
  if (filename) {
    if (filename.endsWith('.tsx')) return 'tsx';
    if (filename.endsWith('.jsx')) return 'jsx';
    if (filename.endsWith('.js')) return 'javascript';
  }

  return 'typescript';
}
