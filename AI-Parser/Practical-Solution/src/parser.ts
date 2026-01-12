/**
 * Main Parser - Orchestrates the parsing pipeline
 */

import { MarkdownLexer } from './lexer';
import { MermaidProcessor } from './mermaidProcessor';
import { MarkdownRenderer } from './renderer';
import { ParserOptions, ParseResult, DEFAULT_OPTIONS } from './types';

export class MarkdownParser {
  private lexer: MarkdownLexer;
  private mermaidProcessor: MermaidProcessor;
  private renderer: MarkdownRenderer;
  private options: ParserOptions;

  constructor(options: Partial<ParserOptions> = {}) {
    this.options = { ...DEFAULT_OPTIONS, ...options };
    this.lexer = new MarkdownLexer();
    this.mermaidProcessor = new MermaidProcessor(this.options);
    this.renderer = new MarkdownRenderer(this.options, this.mermaidProcessor);
  }

  /**
   * Parses Markdown content and returns HTML
   */
  parse(markdown: string): ParseResult {
    const startTime = performance.now();

    // Reset processors
    this.mermaidProcessor.reset();
    this.renderer.reset();

    // Tokenize
    const tokens = this.lexer.tokenize(markdown);

    // Extract Mermaid blocks
    this.mermaidProcessor.extractMermaidBlocks(tokens);

    // Render to HTML
    const html = this.renderer.render(markdown);

    const endTime = performance.now();

    return {
      html,
      hasMermaid: this.mermaidProcessor.hasMermaidDiagrams(),
      mermaidCount: this.mermaidProcessor.getMermaidCount(),
      metadata: {
        tokens: tokens.length,
        processingTime: endTime - startTime
      }
    };
  }

  /**
   * Parses Markdown and returns complete HTML document
   */
  parseToDocument(markdown: string): string {
    const result = this.parse(markdown);
    return this.renderer.renderComplete(result.html);
  }

  /**
   * Updates parser options
   */
  setOptions(options: Partial<ParserOptions>): void {
    this.options = { ...this.options, ...options };
    this.mermaidProcessor = new MermaidProcessor(this.options);
    this.renderer = new MarkdownRenderer(this.options, this.mermaidProcessor);
  }

  /**
   * Gets current parser options
   */
  getOptions(): ParserOptions {
    return { ...this.options };
  }

  /**
   * Analyzes Markdown content without rendering
   */
  analyze(markdown: string): {
    tokenCount: number;
    codeBlocks: Map<string, number>;
    hasMermaid: boolean;
    mermaidCount: number;
  } {
    const tokens = this.lexer.tokenize(markdown);
    const codeBlocks = this.lexer.countCodeBlocks(tokens);
    const mermaidBlocks = this.mermaidProcessor.extractMermaidBlocks(tokens);

    return {
      tokenCount: tokens.length,
      codeBlocks,
      hasMermaid: mermaidBlocks.length > 0,
      mermaidCount: mermaidBlocks.length
    };
  }
}