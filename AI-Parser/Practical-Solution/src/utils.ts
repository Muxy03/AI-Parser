/**
 * Utility functions shared across the parser
 */

/**
 * Generates a unique ID for Mermaid diagrams
 */
export function generateMermaidId(index: number): string {
  return `mermaid-diagram-${index}-${Date.now()}`;
}

/**
 * Detects if a code block is a Mermaid diagram
 */
export function isMermaidBlock(lang: string | undefined): boolean {
  if (!lang) return false;
  const normalized = lang.toLowerCase().trim();
  return normalized === 'mermaid' || normalized === 'mmd';
}

/**
 * Escapes HTML special characters
 */
export function escapeHtml(text: string): string {
  const map: Record<string, string> = {
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
export function validateMermaidCode(code: string): boolean {
  const trimmed = code.trim();
  if (!trimmed) return false;
  
  // Check for common Mermaid diagram types
  const validStarts = [
    'graph', 'flowchart', 'sequenceDiagram', 'classDiagram',
    'stateDiagram', 'erDiagram', 'gantt', 'pie', 'journey',
    'gitGraph', 'mindmap', 'timeline'
  ];
  
  return validStarts.some(start => 
    trimmed.toLowerCase().startsWith(start.toLowerCase())
  );
}

/**
 * Extracts diagram type from Mermaid code
 */
export function extractDiagramType(code: string): string {
  const firstLine = code.trim().split('\n')[0].toLowerCase();
  const match = firstLine.match(/^(graph|flowchart|sequencediagram|classdiagram|statediagram|erdiagram|gantt|pie|journey|gitgraph|mindmap|timeline)/);
  return match ? match[1] : 'unknown';
}