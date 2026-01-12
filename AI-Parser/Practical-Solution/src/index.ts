/**
 * Main entry point - Exports public API and demonstrates usage
 */

import { MarkdownParser } from './parser';
import { 
  ParserOptions, 
  ParseResult, 
  MermaidBlock,
  DEFAULT_OPTIONS 
} from './types';

// Export main class and types
export { MarkdownParser };
export type { ParserOptions, ParseResult, MermaidBlock };
export { DEFAULT_OPTIONS };

// Export individual components for advanced usage
export { MarkdownLexer } from './lexer';
export { MermaidProcessor } from './mermaidProcessor';
export { MarkdownRenderer } from './renderer';

/**
 * Convenience function for quick parsing
 */
export function parseMarkdown(
  markdown: string, 
  options?: Partial<ParserOptions>
): ParseResult {
  const parser = new MarkdownParser(options);
  return parser.parse(markdown);
}

/**
 * Convenience function for generating complete HTML documents
 */
export function markdownToHtml(
  markdown: string,
  options?: Partial<ParserOptions>
): string {
  const parser = new MarkdownParser(options);
  return parser.parseToDocument(markdown);
}

// Demo/Test code (can be removed in production)
if (require.main === module) {
  const fs = require('fs');
  const path = require('path');

  console.log('🚀 Markdown Parser with Mermaid Support\n');

  // Example Markdown with Mermaid diagrams
  const exampleMarkdown = `# Markdown Parser Demo

This is a **demonstration** of the Markdown parser with *Mermaid* diagram support.

## Features

- Standard Markdown parsing
- Mermaid diagram rendering
- Multiple diagram types
- Syntax highlighting for code blocks

## Example Code Block

\`\`\`javascript
function greet(name) {
  console.log(\`Hello, \${name}!\`);
}
\`\`\`

## Flowchart Diagram

\`\`\`mermaid
flowchart TD
    A[Start] --> B{Is it working?}
    B -->|Yes| C[Great!]
    B -->|No| D[Debug]
    D --> B
    C --> E[End]
\`\`\`

## Sequence Diagram

\`\`\`mermaid
sequenceDiagram
    participant User
    participant Parser
    participant Renderer
    
    User->>Parser: Input Markdown
    Parser->>Parser: Tokenize
    Parser->>Renderer: Send tokens
    Renderer->>User: Return HTML
\`\`\`

## Data Table

| Feature | Status | Notes |
|---------|--------|-------|
| Markdown | ✅ | Fully supported |
| Mermaid | ✅ | All diagram types |
| Syntax | ✅ | Code highlighting |

## Blockquote

> This parser handles complex Markdown documents with ease,
> including nested structures and special formatting.

### Links and Images

Check out [Mermaid documentation](https://mermaid.js.org/) for more diagram types!

---

**That's it!** The parser is ready to use. 🎉
`;

  // Create parser instance
  const parser = new MarkdownParser({
    mermaidTheme: 'default',
    gfm: true,
    breaks: true
  });

  // Analyze the content
  console.log('📊 Analysis:');
  const analysis = parser.analyze(exampleMarkdown);
  console.log(`  - Total tokens: ${analysis.tokenCount}`);
  console.log(`  - Mermaid diagrams: ${analysis.mermaidCount}`);
  console.log(`  - Code blocks by language:`);
  analysis.codeBlocks.forEach((count, lang) => {
    console.log(`    - ${lang}: ${count}`);
  });
  console.log();

  // Parse to HTML
  console.log('🔄 Parsing...');
  const result = parser.parse(exampleMarkdown);
  console.log(`  - HTML generated: ${result.html.length} characters`);
  console.log(`  - Processing time: ${result.metadata?.processingTime.toFixed(2)}ms`);
  console.log(`  - Has Mermaid: ${result.hasMermaid}`);
  console.log();

  // Generate complete HTML document
  const htmlDocument = parser.parseToDocument(exampleMarkdown);

  // Save to file
  const outputPath = path.join(__dirname, '..', 'output.html');
  fs.writeFileSync(outputPath, htmlDocument, 'utf-8');
  console.log(`✅ Complete HTML document saved to: ${outputPath}`);
  console.log('   Open it in a browser to see the rendered result!\n');

  // Show usage examples
  console.log('📖 Usage Examples:\n');
  console.log('// Basic usage:');
  console.log('const parser = new MarkdownParser();');
  console.log('const result = parser.parse(markdown);\n');
  
  console.log('// With custom options:');
  console.log('const parser = new MarkdownParser({');
  console.log('  mermaidTheme: "dark",');
  console.log('  gfm: true');
  console.log('});\n');
  
  console.log('// Quick parse:');
  console.log('const result = parseMarkdown(markdown);\n');
  
  console.log('// Generate HTML document:');
  console.log('const html = markdownToHtml(markdown);\n');
}