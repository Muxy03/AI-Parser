/**
 * Utility functions shared across the parser
 */
/**
 * Generates a unique ID for Mermaid diagrams
 */
export declare function generateMermaidId(index: number): string;
/**
 * Detects if a code block is a Mermaid diagram
 */
export declare function isMermaidBlock(lang: string | undefined): boolean;
/**
 * Escapes HTML special characters
 */
export declare function escapeHtml(text: string): string;
/**
 * Validates Mermaid code syntax (basic check)
 */
export declare function validateMermaidCode(code: string): boolean;
/**
 * Extracts diagram type from Mermaid code
 */
export declare function extractDiagramType(code: string): string;
//# sourceMappingURL=utils.d.ts.map