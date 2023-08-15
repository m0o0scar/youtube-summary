export interface LLMModel {
  provider: 'openai' | 'anthropic';
  name:
    | 'gpt-3.5-turbo'
    | 'gpt-3.5-turbo-0613'
    | 'gpt-3.5-turbo-16k'
    | 'gpt-3.5-turbo-16k-0613'
    | 'gpt-4'
    | 'gpt-4-0613'
    | 'gpt-4-32k'
    | 'gpt-4-32k-0613'
    | 'claude-instant-1'
    | 'claude-2';

  maxTokens: number;

  // does this model support function calls?
  // https://platform.openai.com/docs/guides/gpt/function-calling
  supportFunctionCall?: boolean;

  // is this model unavailable?
  unavailable?: boolean;
}

export interface LLMCompletionOptions {
  temperature?: number;
  maxReplyTokens?: number;
  onStream?: OnStream;
  signal?: AbortSignal;
}

export const DefaultTemperature = 1;
export const DefaultMaxReplyTokens = 512;

export interface StreamChunk {
  acc: string; // the entire accumulated string
  token: string; // the current token
  done: boolean;
}

export type OnStream = (chunk: StreamChunk, modelName: string) => void;
