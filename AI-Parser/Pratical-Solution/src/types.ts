/**
 * Core types for the Markdown parser
 */

export interface ParserOptions {
  mermaidTheme?: 'default' | 'dark' | 'forest' | 'neutral';
  sanitize?: boolean;
  breaks?: boolean;
  gfm?: boolean;
  headerIds?: boolean;
  mermaidConfig?: Record<string, any>;
}

export interface ParseResult {
  html: string;
  hasMermaid: boolean;
  mermaidCount: number;
  metadata?: {
    tokens: number;
    processingTime: number;
  };
}

export interface MermaidBlock {
  id: string;
  code: string;
  type: string;
}

export interface TokenInfo {
  type: string;
  raw: string;
  text?: string;
  lang?: string;
}

export const DEFAULT_OPTIONS: ParserOptions = {
  mermaidTheme: 'default',
  sanitize: true,
  breaks: true,
  gfm: true,
  headerIds: true,
  mermaidConfig: {}
};