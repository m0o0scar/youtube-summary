import { ChatCompletionRequestMessage } from 'openai';
import { get_encoding } from 'tiktoken';

const encoder = get_encoding('cl100k_base');

export function countTokens(messages: ChatCompletionRequestMessage[]) {
  /**
   * https://github.com/openai/openai-cookbook/blob/main/examples/How_to_count_tokens_with_tiktoken.ipynb
   *
   * When processing the messages prompt, chat completion API will convert the messages array into encoding like this:
   * From: [{role:'system', content:'hello'}, {role:'user', content:'world'}]
   * To:
   *  <|im_start|>system\n
   *  hello<|im_end|>\n
   *  <|im_start|>user\n
   *  world<|im_end|>\n
   *  <|im_start|>assistant\n
   *
   * <|im_start|>, <|im_end|>, system/user/assistant, and \n all count as 1 token.
   * So we need to add 5 tokens for each message.
   */
  const text = messages.map(({ content }) => `${content}`).join('\n');
  const encoding = encoder.encode(text);
  // 4 = <|im_start|>, system, \n, <|im_end|>, we don't *5 here because one of the token is the join('\n') above
  // 1 = the last \n behind the last <|im_end|>
  // 3 = <|im_start|>, assistant, \n
  const tokenCount = encoding.length + messages.length * 4 + 1 + 3;
  return tokenCount;
}

export function countTokensOfText(text: string) {
  return encoder.encode(text).length;
}

export function formatTokenLength(n: number) {
  if (n < 1024) return n.toString();
  return `${Math.floor(n / 1024)}k`;
}
