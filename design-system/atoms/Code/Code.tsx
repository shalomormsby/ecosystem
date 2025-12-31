'use client';

import { ReactNode } from 'react';

export type SyntaxType =
  | 'comment'
  | 'keyword'
  | 'function'
  | 'string'
  | 'number'
  | 'boolean'
  | 'operator'
  | 'property'
  | 'className'
  | 'tag'
  | 'attribute'
  | 'variable'
  | 'punctuation'
  | 'plain';

export interface CodeProps {
  /** The code content to display */
  children: ReactNode;
  /** Optional syntax highlighting type */
  syntax?: SyntaxType;
  /** Whether to render as inline code (default) or block */
  inline?: boolean;
  /** Additional className for custom styling */
  className?: string;
}

/**
 * Code Atom
 *
 * A simple, semantic code wrapper with automatic syntax highlighting.
 * Leverages CSS variables set by ThemeProvider for theme-aware colors.
 *
 * @example
 * ```tsx
 * // Plain code
 * <Code>example</Code>
 *
 * // With syntax highlighting
 * <Code syntax="keyword">const</Code>
 * <Code syntax="function">useState</Code>
 * <Code syntax="string">"Hello"</Code>
 *
 * // Block code
 * <Code inline={false}>const example = "value";</Code>
 * ```
 */
export function Code({
  children,
  syntax = 'plain',
  inline = true,
  className = '',
}: CodeProps) {
  const baseClasses = inline
    ? 'px-1 py-0.5 bg-[var(--color-surface)] rounded text-sm'
    : 'block p-4 bg-[var(--color-background)] rounded border border-[var(--color-border)]';

  return (
    <code
      className={`font-mono ${baseClasses} ${className}`}
      style={{
        color: `var(--syntax-${syntax})`,
      }}
    >
      {children}
    </code>
  );
}
