/**
 * The countTokens function implementation and claude.json comes from the "Anthropic TypeScript Tokenizer"
 * https://github.com/anthropics/anthropic-tokenizer-typescript
 */
import { Tiktoken } from 'tiktoken';

import claude from './claude.json';

let tokenizer: Tiktoken | undefined = undefined;

export function countTokens(text: string): number {
  if (!tokenizer) {
    tokenizer = new Tiktoken(claude.bpe_ranks, claude.special_tokens, claude.pat_str);
  }
  const encoded = tokenizer.encode(text.normalize('NFKC'), 'all');
  return encoded.length;
}
