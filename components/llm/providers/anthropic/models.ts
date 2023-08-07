import { LLMModel } from '@components/llm/type';

export const Anthropic_Claude2: LLMModel = {
  provider: 'anthropic',
  name: 'claude-2',
  maxTokens: 100 * 1024,
};
