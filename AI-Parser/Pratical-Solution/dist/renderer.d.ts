/**
 * Renderer - Converts Markdown tokens to HTML with Mermaid support
 */
import { ParserOptions } from './types';
import { MermaidProcessor } from './mermaidProcessor';
export declare class MarkdownRenderer {
    private renderer;
    private mermaidProcessor;
    private options;
    private mermaidIndex;
    constructor(options: ParserOptions, mermaidProcessor: MermaidProcessor);
    /**
     * Sets up custom rendering rules
     */
    private setupCustomRenderers;
    /**
     * Renders Markdown to HTML
     */
    render(markdown: string): string;
    /**
     * Generates complete HTML document with styles and scripts
     */
    renderComplete(html: string): string;
    /**
     * Generates CSS styles for the rendered content
     */
    private generateStyles;
    /**
     * Resets the renderer state
     */
    reset(): void;
}
//# sourceMappingURL=renderer.d.ts.map