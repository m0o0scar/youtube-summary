import { LLMModel } from '@components/llm/type';

export const OpenAI_GPT3_5: LLMModel = {
  provider: 'openai',
  name: 'gpt-3.5-turbo',
  maxTokens: 4 * 1024,
};

export const OpenAI_GPT3_5_0613: LLMModel = {
  provider: 'openai',
  name: 'gpt-3.5-turbo-0613',
  maxTokens: 4 * 1024,
  supportFunctionCall: true,
};

export const OpenAI_GPT3_5_16k: LLMModel = {
  provider: 'openai',
  name: 'gpt-3.5-turbo-16k',
  maxTokens: 16 * 1024,
};

export const OpenAI_GPT3_5_16k_0613: LLMModel = {
  provider: 'openai',
  name: 'gpt-3.5-turbo-16k-0613',
  maxTokens: 16 * 1024,
  supportFunctionCall: true,
};

export const OpenAI_GPT4: LLMModel = {
  provider: 'openai',
  name: 'gpt-4',
  maxTokens: 8 * 1024,
};

export const OpenAI_GPT4_0613: LLMModel = {
  provider: 'openai',
  name: 'gpt-4-0613',
  maxTokens: 8 * 1024,
  supportFunctionCall: true,
};

export const OpenAI_GPT4_32k: LLMModel = {
  provider: 'openai',
  name: 'gpt-4-32k',
  maxTokens: 32 * 1024,
  unavailable: true,
};

export const OpenAI_GPT4_32k_0613: LLMModel = {
  provider: 'openai',
  name: 'gpt-4-32k-0613',
  maxTokens: 32 * 1024,
  supportFunctionCall: true,
  unavailable: true,
};
