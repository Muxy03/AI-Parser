"use strict";
/**
 * Main Parser - Orchestrates the parsing pipeline
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.MarkdownParser = void 0;
const lexer_1 = require("./lexer");
const mermaidProcessor_1 = require("./mermaidProcessor");
const renderer_1 = require("./renderer");
const types_1 = require("./types");
class MarkdownParser {
    constructor(options = {}) {
        this.options = { ...types_1.DEFAULT_OPTIONS, ...options };
        this.lexer = new lexer_1.MarkdownLexer();
        this.mermaidProcessor = new mermaidProcessor_1.MermaidProcessor(this.options);
        this.renderer = new renderer_1.MarkdownRenderer(this.options, this.mermaidProcessor);
    }
    /**
     * Parses Markdown content and returns HTML
     */
    parse(markdown) {
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
    parseToDocument(markdown) {
        const result = this.parse(markdown);
        return this.renderer.renderComplete(result.html);
    }
    /**
     * Updates parser options
     */
    setOptions(options) {
        this.options = { ...this.options, ...options };
        this.mermaidProcessor = new mermaidProcessor_1.MermaidProcessor(this.options);
        this.renderer = new renderer_1.MarkdownRenderer(this.options, this.mermaidProcessor);
    }
    /**
     * Gets current parser options
     */
    getOptions() {
        return { ...this.options };
    }
    /**
     * Analyzes Markdown content without rendering
     */
    analyze(markdown) {
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
exports.MarkdownParser = MarkdownParser;
//# sourceMappingURL=parser.js.map