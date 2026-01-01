/**
 * Syntax Parser Patterns
 * Regex patterns for tokenizing TypeScript/JavaScript/JSX code
 */

/**
 * Token pattern configuration
 * Order matters - patterns are tested in sequence
 */
export const TOKEN_PATTERNS = [
  // Single-line comments
  { type: 'comment' as const, pattern: /\/\/.*$/gm },

  // Multi-line comments
  { type: 'comment' as const, pattern: /\/\*[\s\S]*?\*\//g },

  // Template literals and strings
  { type: 'string' as const, pattern: /`(?:\\.|[^`\\])*`/g },
  { type: 'string' as const, pattern: /"(?:\\.|[^"\\])*"/g },
  { type: 'string' as const, pattern: /'(?:\\.|[^'\\])*'/g },

  // JSX/TSX tags
  { type: 'tag' as const, pattern: /<\/?[A-Z][a-zA-Z0-9]*(?=[\s>])/g },
  { type: 'tag' as const, pattern: /<\/?[a-z][a-zA-Z0-9-]*(?=[\s>])/g },

  // Keywords
  {
    type: 'keyword' as const,
    pattern: /\b(const|let|var|function|return|if|else|for|while|do|switch|case|break|continue|throw|try|catch|finally|new|typeof|instanceof|void|delete|async|await|yield|export|import|from|default|class|extends|implements|interface|type|enum|namespace|declare|public|private|protected|static|readonly|abstract|as|is|in|of|null|undefined)\b/g
  },

  // Booleans
  { type: 'boolean' as const, pattern: /\b(true|false)\b/g },

  // Numbers
  { type: 'number' as const, pattern: /\b\d+\.?\d*(?:e[+-]?\d+)?(?:n)?\b/gi },
  { type: 'number' as const, pattern: /\b0x[0-9a-f]+\b/gi },

  // Function calls
  { type: 'function' as const, pattern: /\b[a-zA-Z_$][a-zA-Z0-9_$]*(?=\s*\()/g },

  // Class names (PascalCase identifiers)
  { type: 'className' as const, pattern: /\b[A-Z][a-zA-Z0-9]*\b/g },

  // JSX attributes
  { type: 'attribute' as const, pattern: /\b[a-z][a-zA-Z0-9]*(?=\s*=)/g },

  // Object properties (after dot)
  { type: 'property' as const, pattern: /(?<=\.)[a-zA-Z_$][a-zA-Z0-9_$]*/g },

  // Operators
  {
    type: 'operator' as const,
    pattern: /[+\-*/%=!<>&|^~?:]+|&&|\|\||\.\.\.|\?\?|===|!==|==|!=|<=|>=|<<|>>|>>>/g
  },

  // Punctuation
  { type: 'punctuation' as const, pattern: /[{}[\](),.;]/g },
] as const;

/**
 * Characters that should be treated as whitespace
 */
export const WHITESPACE = /\s+/g;
