"use strict";
/**
 * Utility functions shared across the parser
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.generateMermaidId = generateMermaidId;
exports.isMermaidBlock = isMermaidBlock;
exports.escapeHtml = escapeHtml;
exports.validateMermaidCode = validateMermaidCode;
exports.extractDiagramType = extractDiagramType;
/**
 * Generates a unique ID for Mermaid diagrams
 */
function generateMermaidId(index) {
    return `mermaid-diagram-${index}-${Date.now()}`;
}
/**
 * Detects if a code block is a Mermaid diagram
 */
function isMermaidBlock(lang) {
    if (!lang)
        return false;
    const normalized = lang.toLowerCase().trim();
    return normalized === 'mermaid' || normalized === 'mmd';
}
/**
 * Escapes HTML special characters
 */
function escapeHtml(text) {
    const map = {
        '&': '&amp;',
        '<': '&lt;',
        '>': '&gt;',
        '"': '&quot;',
        "'": '&#039;'
    };
    return text.replace(/[&<>"']/g, (m) => map[m]);
}
/**
 * Validates Mermaid code syntax (basic check)
 */
function validateMermaidCode(code) {
    const trimmed = code.trim();
    if (!trimmed)
        return false;
    // Check for common Mermaid diagram types
    const validStarts = [
        'graph', 'flowchart', 'sequenceDiagram', 'classDiagram',
        'stateDiagram', 'erDiagram', 'gantt', 'pie', 'journey',
        'gitGraph', 'mindmap', 'timeline'
    ];
    return validStarts.some(start => trimmed.toLowerCase().startsWith(start.toLowerCase()));
}
/**
 * Extracts diagram type from Mermaid code
 */
function extractDiagramType(code) {
    const firstLine = code.trim().split('\n')[0].toLowerCase();
    const match = firstLine.match(/^(graph|flowchart|sequencediagram|classdiagram|statediagram|erdiagram|gantt|pie|journey|gitgraph|mindmap|timeline)/);
    return match ? match[1] : 'unknown';
}
//# sourceMappingURL=utils.js.map