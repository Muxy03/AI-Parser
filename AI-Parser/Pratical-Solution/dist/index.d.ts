/**
 * Main entry point - Exports public API and demonstrates usage
 */
import { MarkdownParser } from './parser';
import { ParserOptions, ParseResult, MermaidBlock, DEFAULT_OPTIONS } from './types';
export { MarkdownParser };
export type { ParserOptions, ParseResult, MermaidBlock };
export { DEFAULT_OPTIONS };
export { MarkdownLexer } from './lexer';
export { MermaidProcessor } from './mermaidProcessor';
export { MarkdownRenderer } from './renderer';
/**
 * Convenience function for quick parsing
 */
export declare function parseMarkdown(markdown: string, options?: Partial<ParserOptions>): ParseResult;
/**
 * Convenience function for generating complete HTML documents
 */
export declare function markdownToHtml(markdown: string, options?: Partial<ParserOptions>): string;
//# sourceMappingURL=index.d.ts.map