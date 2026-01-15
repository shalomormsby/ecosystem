/**
 * Syntax Parser Types
 * Type definitions for the syntax parsing system
 */

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

export interface SyntaxToken {
  text: string;
  type: SyntaxType;
}

export type Language = 'typescript' | 'javascript' | 'tsx' | 'jsx';
