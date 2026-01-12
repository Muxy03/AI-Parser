/**
 * Lexer - Tokenizes Markdown content using marked
 */

import { marked } from 'marked';
import { TokenInfo } from './types';

export class MarkdownLexer {
  /**
   * Tokenizes Markdown content into a token array
   */
  tokenize(markdown: string): marked.Token[] {
    return marked.lexer(markdown);
  }

  /**
   * Extracts simplified token information for analysis
   */
  getTokenInfo(tokens: marked.Token[]): TokenInfo[] {
    return tokens.map(token => ({
      type: token.type,
      raw: token.raw,
      text: 'text' in token ? token.text : undefined,
      lang: 'lang' in token ? token.lang : undefined
    }));
  }

  /**
   * Counts code blocks by language
   */
  countCodeBlocks(tokens: marked.Token[]): Map<string, number> {
    const counts = new Map<string, number>();
    
    for (const token of tokens) {
      if (token.type === 'code' && 'lang' in token && token.lang) {
        const lang = token.lang.toLowerCase();
        counts.set(lang, (counts.get(lang) || 0) + 1);
      }
    }
    
    return counts;
  }

  /**
   * Finds all code blocks of a specific language
   */
  findCodeBlocksByLang(tokens: marked.Token[], lang: string): marked.Tokens.Code[] {
    const blocks: marked.Tokens.Code[] = [];
    
    for (const token of tokens) {
      if (token.type === 'code' && 'lang' in token) {
        const tokenLang = token.lang?.toLowerCase() || '';
        if (tokenLang === lang.toLowerCase()) {
          blocks.push(token as marked.Tokens.Code);
        }
      }
    }
    
    return blocks;
  }
}