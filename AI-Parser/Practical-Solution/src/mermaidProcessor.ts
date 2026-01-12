/**
 * Mermaid Processor - Handles Mermaid diagram extraction and rendering
 */

import { marked } from 'marked';
import { MermaidBlock, ParserOptions } from './types';
import { 
  generateMermaidId, 
  isMermaidBlock, 
  validateMermaidCode,
  extractDiagramType 
} from './utils';

export class MermaidProcessor {
  private mermaidBlocks: MermaidBlock[] = [];
  private options: ParserOptions;

  constructor(options: ParserOptions) {
    this.options = options;
  }

  /**
   * Extracts all Mermaid blocks from tokens
   */
  extractMermaidBlocks(tokens: marked.Token[]): MermaidBlock[] {
    this.mermaidBlocks = [];
    let index = 0;

    for (const token of tokens) {
      if (token.type === 'code' && 'lang' in token && isMermaidBlock(token.lang)) {
        const codeToken = token as marked.Tokens.Code;
        
        if (validateMermaidCode(codeToken.text)) {
          this.mermaidBlocks.push({
            id: generateMermaidId(index++),
            code: codeToken.text,
            type: extractDiagramType(codeToken.text)
          });
        }
      }
    }

    return this.mermaidBlocks;
  }

  /**
   * Gets the count of Mermaid diagrams
   */
  getMermaidCount(): number {
    return this.mermaidBlocks.length;
  }

  /**
   * Checks if there are any Mermaid diagrams
   */
  hasMermaidDiagrams(): boolean {
    return this.mermaidBlocks.length > 0;
  }

  /**
   * Generates HTML container for a Mermaid diagram
   */
  generateMermaidHtml(block: MermaidBlock): string {
    const escapedCode = block.code
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;');

    return `<div class="mermaid-container" data-diagram-type="${block.type}">
  <pre class="mermaid" id="${block.id}">${escapedCode}</pre>
</div>`;
  }

  /**
   * Generates initialization script for Mermaid
   */
  generateMermaidScript(): string {
    if (!this.hasMermaidDiagrams()) {
      return '';
    }

    const config = {
      startOnLoad: true,
      theme: this.options.mermaidTheme || 'default',
      ...this.options.mermaidConfig
    };

    return `
<script type="module">
  import mermaid from 'https://cdn.jsdelivr.net/npm/mermaid@10/dist/mermaid.esm.min.mjs';
  mermaid.initialize(${JSON.stringify(config, null, 2)});
</script>`;
  }

  /**
   * Gets all extracted Mermaid blocks
   */
  getBlocks(): MermaidBlock[] {
    return [...this.mermaidBlocks];
  }

  /**
   * Resets the processor state
   */
  reset(): void {
    this.mermaidBlocks = [];
  }
}