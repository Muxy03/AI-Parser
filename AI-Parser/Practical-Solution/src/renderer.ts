/**
 * Renderer - Converts Markdown tokens to HTML with Mermaid support
 */

import { marked, Renderer } from 'marked';
import { ParserOptions } from './types';
import { MermaidProcessor } from './mermaidProcessor';
import { isMermaidBlock } from './utils';

export class MarkdownRenderer {
  private renderer: Renderer;
  private mermaidProcessor: MermaidProcessor;
  private options: ParserOptions;
  private mermaidIndex: number = 0;

  constructor(options: ParserOptions, mermaidProcessor: MermaidProcessor) {
    this.options = options;
    this.mermaidProcessor = mermaidProcessor;
    this.renderer = new Renderer();
    this.setupCustomRenderers();
  }

  /**
   * Sets up custom rendering rules
   */
  private setupCustomRenderers(): void {
    const originalCode = this.renderer.code.bind(this.renderer);

    // Override code block rendering to handle Mermaid
    this.renderer.code = (code: string, language: string | undefined, isEscaped: boolean): string => {
      if (isMermaidBlock(language)) {
        const blocks = this.mermaidProcessor.getBlocks();
        if (this.mermaidIndex < blocks.length) {
          const block = blocks[this.mermaidIndex++];
          return this.mermaidProcessor.generateMermaidHtml(block);
        }
      }
      
      // Use default rendering for non-Mermaid code blocks
      return originalCode(code, language, isEscaped);
    };

    // Add custom class to tables for styling
    const originalTable = this.renderer.table.bind(this.renderer);
    this.renderer.table = (header: string, body: string): string => {
      const table = originalTable(header, body);
      return table.replace('<table>', '<table class="markdown-table">');
    };
  }

  /**
   * Renders Markdown to HTML
   */
  render(markdown: string): string {
    this.mermaidIndex = 0;

    // Configure marked options
    marked.setOptions({
      renderer: this.renderer,
      gfm: this.options.gfm ?? true,
      breaks: this.options.breaks ?? true,
      // headerIds: this.options.headerIds ?? true,
      // mangle: false
    });

    return marked.parse(markdown) as string;
  }

  /**
   * Generates complete HTML document with styles and scripts
   */
  renderComplete(html: string): string {
    const mermaidScript = this.mermaidProcessor.generateMermaidScript();
    const styles = this.generateStyles();

    return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Markdown Document</title>
  ${styles}
</head>
<body>
  <div class="markdown-content">
    ${html}
  </div>
  ${mermaidScript}
</body>
</html>`;
  }

  /**
   * Generates CSS styles for the rendered content
   */
  private generateStyles(): string {
    return `<style>
    body {
      font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, sans-serif;
      line-height: 1.6;
      color: #333;
      max-width: 900px;
      margin: 0 auto;
      padding: 20px;
      background-color: #f9f9f9;
    }
    
    .markdown-content {
      background: white;
      padding: 40px;
      border-radius: 8px;
      box-shadow: 0 2px 4px rgba(0,0,0,0.1);
    }
    
    .markdown-content h1,
    .markdown-content h2,
    .markdown-content h3,
    .markdown-content h4,
    .markdown-content h5,
    .markdown-content h6 {
      margin-top: 24px;
      margin-bottom: 16px;
      font-weight: 600;
      line-height: 1.25;
    }
    
    .markdown-content h1 { font-size: 2em; border-bottom: 1px solid #eaecef; padding-bottom: 0.3em; }
    .markdown-content h2 { font-size: 1.5em; border-bottom: 1px solid #eaecef; padding-bottom: 0.3em; }
    .markdown-content h3 { font-size: 1.25em; }
    
    .markdown-content code {
      background-color: rgba(27, 31, 35, 0.05);
      border-radius: 3px;
      padding: 0.2em 0.4em;
      font-family: 'Courier New', Courier, monospace;
      font-size: 0.9em;
    }
    
    .markdown-content pre {
      background-color: #f6f8fa;
      border-radius: 6px;
      padding: 16px;
      overflow: auto;
      line-height: 1.45;
    }
    
    .markdown-content pre code {
      background-color: transparent;
      padding: 0;
    }
    
    .mermaid-container {
      margin: 20px 0;
      padding: 20px;
      background-color: #f9f9f9;
      border-radius: 8px;
      border: 1px solid #e1e4e8;
    }
    
    .mermaid-container pre.mermaid {
      background-color: transparent;
      border: none;
      padding: 0;
      text-align: center;
    }
    
    .markdown-table {
      border-collapse: collapse;
      width: 100%;
      margin: 16px 0;
    }
    
    .markdown-table th,
    .markdown-table td {
      border: 1px solid #dfe2e5;
      padding: 6px 13px;
    }
    
    .markdown-table th {
      background-color: #f6f8fa;
      font-weight: 600;
    }
    
    .markdown-table tr:nth-child(even) {
      background-color: #f9f9f9;
    }
    
    .markdown-content blockquote {
      border-left: 4px solid #dfe2e5;
      padding-left: 16px;
      margin-left: 0;
      color: #6a737d;
    }
    
    .markdown-content a {
      color: #0366d6;
      text-decoration: none;
    }
    
    .markdown-content a:hover {
      text-decoration: underline;
    }
    
    .markdown-content img {
      max-width: 100%;
      height: auto;
    }
    
    .markdown-content ul,
    .markdown-content ol {
      padding-left: 2em;
    }
    
    .markdown-content li {
      margin: 0.25em 0;
    }
  </style>`;
  }

  /**
   * Resets the renderer state
   */
  reset(): void {
    this.mermaidIndex = 0;
  }
}