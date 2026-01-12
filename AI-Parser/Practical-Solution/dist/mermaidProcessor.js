"use strict";
/**
 * Mermaid Processor - Handles Mermaid diagram extraction and rendering
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.MermaidProcessor = void 0;
const utils_1 = require("./utils");
class MermaidProcessor {
    constructor(options) {
        this.mermaidBlocks = [];
        this.options = options;
    }
    /**
     * Extracts all Mermaid blocks from tokens
     */
    extractMermaidBlocks(tokens) {
        this.mermaidBlocks = [];
        let index = 0;
        for (const token of tokens) {
            if (token.type === 'code' && 'lang' in token && (0, utils_1.isMermaidBlock)(token.lang)) {
                const codeToken = token;
                if ((0, utils_1.validateMermaidCode)(codeToken.text)) {
                    this.mermaidBlocks.push({
                        id: (0, utils_1.generateMermaidId)(index++),
                        code: codeToken.text,
                        type: (0, utils_1.extractDiagramType)(codeToken.text)
                    });
                }
            }
        }
        return this.mermaidBlocks;
    }
    /**
     * Gets the count of Mermaid diagrams
     */
    getMermaidCount() {
        return this.mermaidBlocks.length;
    }
    /**
     * Checks if there are any Mermaid diagrams
     */
    hasMermaidDiagrams() {
        return this.mermaidBlocks.length > 0;
    }
    /**
     * Generates HTML container for a Mermaid diagram
     */
    generateMermaidHtml(block) {
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
    generateMermaidScript() {
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
    getBlocks() {
        return [...this.mermaidBlocks];
    }
    /**
     * Resets the processor state
     */
    reset() {
        this.mermaidBlocks = [];
    }
}
exports.MermaidProcessor = MermaidProcessor;
//# sourceMappingURL=mermaidProcessor.js.map