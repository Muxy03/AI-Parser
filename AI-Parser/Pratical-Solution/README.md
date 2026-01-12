# Markdown Parser with Mermaid Support

A modular, TypeScript-based Markdown parser that supports standard Markdown features and provides special handling for Mermaid diagrams.

## Features

- ✅ Full Markdown support (GFM - GitHub Flavored Markdown)
- ✅ Mermaid diagram rendering (all diagram types)
- ✅ Modular architecture with separate components
- ✅ TypeScript with full type safety
- ✅ Syntax highlighting for code blocks
- ✅ Customizable rendering options
- ✅ Performance metrics and analysis tools
- ✅ Complete HTML document generation

## Project Structure

```
markdown-mermaid-parser/
├── src/
│   ├── types.ts              # Type definitions and interfaces
│   ├── utils.ts              # Shared utility functions
│   ├── lexer.ts              # Tokenization logic
│   ├── mermaidProcessor.ts   # Mermaid diagram handling
│   ├── renderer.ts           # HTML rendering
│   ├── parser.ts             # Main parser orchestration
│   └── index.ts              # Public API and entry point
├── package.json
├── tsconfig.json
└── README.md
```

## Installation

```bash
npm install
```

## Building

```bash
npm run build
```

This compiles TypeScript to JavaScript in the `dist/` directory.

## Usage

### Basic Usage

```typescript
import { MarkdownParser } from './parser';

const parser = new MarkdownParser();
const markdown = `# Hello World

This is a **Markdown** document with a diagram:

\`\`\`mermaid
graph TD
    A[Start] --> B[End]
\`\`\`
`;

const result = parser.parse(markdown);
console.log(result.html);
console.log(`Mermaid diagrams: ${result.mermaidCount}`);
```

### With Custom Options

```typescript
import { MarkdownParser } from './parser';

const parser = new MarkdownParser({
  mermaidTheme: 'dark',
  gfm: true,
  breaks: true,
  sanitize: true
});

const result = parser.parse(markdown);
```

### Generate Complete HTML Document

```typescript
import { MarkdownParser } from './parser';

const parser = new MarkdownParser();
const htmlDocument = parser.parseToDocument(markdown);

// Save to file or serve via HTTP
fs.writeFileSync('output.html', htmlDocument);
```

### Quick Parse Functions

```typescript
import { parseMarkdown, markdownToHtml } from './index';

// Quick parse to get result object
const result = parseMarkdown(markdown, { mermaidTheme: 'forest' });

// Quick parse to complete HTML document
const html = markdownToHtml(markdown);
```

### Content Analysis

```typescript
const analysis = parser.analyze(markdown);
console.log(`Tokens: ${analysis.tokenCount}`);
console.log(`Mermaid diagrams: ${analysis.mermaidCount}`);
console.log('Code blocks:', analysis.codeBlocks);
```

## API Reference

### MarkdownParser

Main parser class that orchestrates the parsing pipeline.

#### Constructor

```typescript
constructor(options?: Partial<ParserOptions>)
```

#### Methods

- `parse(markdown: string): ParseResult` - Parses Markdown and returns structured result
- `parseToDocument(markdown: string): string` - Returns complete HTML document
- `analyze(markdown: string)` - Analyzes content without rendering
- `setOptions(options: Partial<ParserOptions>)` - Updates parser options
- `getOptions(): ParserOptions` - Gets current options

### ParserOptions

```typescript
interface ParserOptions {
  mermaidTheme?: 'default' | 'dark' | 'forest' | 'neutral';
  sanitize?: boolean;
  breaks?: boolean;
  gfm?: boolean;
  headerIds?: boolean;
  mermaidConfig?: Record<string, any>;
}
```

### ParseResult

```typescript
interface ParseResult {
  html: string;
  hasMermaid: boolean;
  mermaidCount: number;
  metadata?: {
    tokens: number;
    processingTime: number;
  };
}
```

## Supported Mermaid Diagrams

All Mermaid diagram types are supported:

- Flowcharts (`flowchart`, `graph`)
- Sequence diagrams (`sequenceDiagram`)
- Class diagrams (`classDiagram`)
- State diagrams (`stateDiagram`)
- Entity Relationship diagrams (`erDiagram`)
- Gantt charts (`gantt`)
- Pie charts (`pie`)
- User Journey (`journey`)
- Git graphs (`gitGraph`)
- Mindmaps (`mindmap`)
- Timelines (`timeline`)

## Running the Demo

```bash
npm run build
npm test
```

This will parse an example Markdown document with Mermaid diagrams and generate `output.html`.

## Module Descriptions

### types.ts
Defines all TypeScript interfaces and types used across the project, ensuring type safety.

### utils.ts
Contains shared utility functions like ID generation, validation, HTML escaping, and diagram type detection.

### lexer.ts
Handles tokenization of Markdown content using the `marked` library, breaking content into processable tokens.

### mermaidProcessor.ts
Specialized component for extracting, validating, and processing Mermaid diagram blocks from tokens.

### renderer.ts
Converts tokens to HTML with custom rendering rules for Mermaid diagrams and other special elements.

### parser.ts
Main orchestrator that coordinates the lexer, processor, and renderer to produce the final output.

### index.ts
Public API entry point that exports all components and provides convenience functions.

## Dependencies

- `marked` - Markdown parsing and rendering
- `mermaid` - Diagram rendering (loaded via CDN in output)

## License

MIT