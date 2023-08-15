import { LLMModel } from '@components/llm/type';

export const Anthropic_Claude_Instant: LLMModel = {
  provider: 'anthropic',
  name: 'claude-instant-1',
  maxTokens: 100 * 1024,
};

export const Anthropic_Claude2: LLMModel = {
  provider: 'anthropic',
  name: 'claude-2',
  maxTokens: 100 * 1024,
};
