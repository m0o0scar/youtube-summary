import * as anthropic from './providers/anthropic';
import * as openai from './providers/openai';
import { DefaultMaxReplyTokens, LLMCompletionOptions, LLMModel } from './type';

export async function completion(
  llmModel: LLMModel | LLMModel[],
  prompt: string,
  options: LLMCompletionOptions = {},
) {
  const llmModels = llmModel instanceof Array ? llmModel : [llmModel];

  // count number of tokens in prompt
  const numberOfTokensInPrompt = openai.countTokensOfText(prompt);

  const { temperature, maxReplyTokens = DefaultMaxReplyTokens, onStream, signal } = options;

  // find the first model that can handle the prompt
  for (const model of llmModels) {
    // if the prompt is too big, skip this model
    if (numberOfTokensInPrompt + maxReplyTokens > model.maxTokens) {
      console.log(
        `[Completion<${model.name}>] prompt (${numberOfTokensInPrompt}) + maxReplyTokens (${maxReplyTokens}) > maxTokens (${model.maxTokens})`,
      );
      continue;
    }

    switch (model.provider) {
      case 'openai':
        console.log(`[Completion<${model.name}>] using OpenAI API`);
        return openai.chatCompletion(
          {
            messages: [{ role: 'user', content: prompt }],
            max_tokens: maxReplyTokens,
            temperature,
          },
          onStream,
          signal,
        );

      case 'anthropic':
        console.log(`[Completion<${model.name}>] using Anthropic API`);
        return anthropic.completion(
          {
            prompt,
            max_tokens_to_sample: maxReplyTokens,
            temperature,
          },
          onStream,
          signal,
        );

      default:
        console.log(`[Completion<${model.name}>] unknown provider "${model.provider}"`);
        continue;
    }
  }

  throw new Error('no model can handle the prompt');
}
