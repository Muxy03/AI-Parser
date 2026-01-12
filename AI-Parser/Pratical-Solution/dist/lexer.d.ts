/**
 * Lexer - Tokenizes Markdown content using marked
 */
import { marked } from 'marked';
import { TokenInfo } from './types';
export declare class MarkdownLexer {
    /**
     * Tokenizes Markdown content into a token array
     */
    tokenize(markdown: string): marked.Token[];
    /**
     * Extracts simplified token information for analysis
     */
    getTokenInfo(tokens: marked.Token[]): TokenInfo[];
    /**
     * Counts code blocks by language
     */
    countCodeBlocks(tokens: marked.Token[]): Map<string, number>;
    /**
     * Finds all code blocks of a specific language
     */
    findCodeBlocksByLang(tokens: marked.Token[], lang: string): marked.Tokens.Code[];
}
//# sourceMappingURL=lexer.d.ts.map