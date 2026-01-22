/**
 * Lexer - Tokenizes Markdown content using marked
 */
import { type Token, Tokens } from 'marked';
import { TokenInfo } from './types';
export declare class MarkdownLexer {
    /**
     * Tokenizes Markdown content into a token array
     */
    tokenize(markdown: string): Token[];
    /**
     * Extracts simplified token information for analysis
     */
    getTokenInfo(tokens: Token[]): TokenInfo[];
    /**
     * Counts code blocks by language
     */
    countCodeBlocks(tokens: Token[]): Map<string, number>;
    /**
     * Finds all code blocks of a specific language
     */
    findCodeBlocksByLang(tokens: Token[], lang: string): Tokens.Code[];
}
//# sourceMappingURL=lexer.d.ts.map