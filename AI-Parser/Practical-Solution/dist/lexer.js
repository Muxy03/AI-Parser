"use strict";
/**
 * Lexer - Tokenizes Markdown content using marked
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.MarkdownLexer = void 0;
const marked_1 = require("marked");
class MarkdownLexer {
    /**
     * Tokenizes Markdown content into a token array
     */
    tokenize(markdown) {
        return marked_1.marked.lexer(markdown);
    }
    /**
     * Extracts simplified token information for analysis
     */
    getTokenInfo(tokens) {
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
    countCodeBlocks(tokens) {
        const counts = new Map();
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
    findCodeBlocksByLang(tokens, lang) {
        const blocks = [];
        for (const token of tokens) {
            if (token.type === 'code' && 'lang' in token) {
                const tokenLang = token.lang?.toLowerCase() || '';
                if (tokenLang === lang.toLowerCase()) {
                    blocks.push(token);
                }
            }
        }
        return blocks;
    }
}
exports.MarkdownLexer = MarkdownLexer;
//# sourceMappingURL=lexer.js.map