/**
 * Main Parser - Orchestrates the parsing pipeline
 */
import { ParserOptions, ParseResult } from './types';
export declare class MarkdownParser {
    private lexer;
    private mermaidProcessor;
    private renderer;
    private options;
    constructor(options?: Partial<ParserOptions>);
    /**
     * Parses Markdown content and returns HTML
     */
    parse(markdown: string): ParseResult;
    /**
     * Parses Markdown and returns complete HTML document
     */
    parseToDocument(markdown: string): string;
    /**
     * Updates parser options
     */
    setOptions(options: Partial<ParserOptions>): void;
    /**
     * Gets current parser options
     */
    getOptions(): ParserOptions;
    /**
     * Analyzes Markdown content without rendering
     */
    analyze(markdown: string): {
        tokenCount: number;
        codeBlocks: Map<string, number>;
        hasMermaid: boolean;
        mermaidCount: number;
    };
}
//# sourceMappingURL=parser.d.ts.map