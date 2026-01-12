/**
 * Mermaid Processor - Handles Mermaid diagram extraction and rendering
 */
import { marked } from 'marked';
import { MermaidBlock, ParserOptions } from './types';
export declare class MermaidProcessor {
    private mermaidBlocks;
    private options;
    constructor(options: ParserOptions);
    /**
     * Extracts all Mermaid blocks from tokens
     */
    extractMermaidBlocks(tokens: marked.Token[]): MermaidBlock[];
    /**
     * Gets the count of Mermaid diagrams
     */
    getMermaidCount(): number;
    /**
     * Checks if there are any Mermaid diagrams
     */
    hasMermaidDiagrams(): boolean;
    /**
     * Generates HTML container for a Mermaid diagram
     */
    generateMermaidHtml(block: MermaidBlock): string;
    /**
     * Generates initialization script for Mermaid
     */
    generateMermaidScript(): string;
    /**
     * Gets all extracted Mermaid blocks
     */
    getBlocks(): MermaidBlock[];
    /**
     * Resets the processor state
     */
    reset(): void;
}
//# sourceMappingURL=mermaidProcessor.d.ts.map