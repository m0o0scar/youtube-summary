import Anthropic from '@anthropic-ai/sdk';

import { DefaultMaxReplyTokens, DefaultTemperature, OnStream } from '../../type';
import { baseUrl } from './middleware';

export async function completion(
  request: Partial<Anthropic.Completions.CompletionCreateParams.CompletionRequestNonStreaming>,
  onStream?: OnStream,
  signal?: AbortSignal,
) {
  const {
    model = 'claude-2',
    max_tokens_to_sample = DefaultMaxReplyTokens,
    temperature = DefaultTemperature,
    prompt,
    ...otherOptions
  } = request;

  const { protocol, host } = location;
  const baseURL = `${protocol}//${host}${baseUrl}`;

  // proxy request via middleware
  const anthropic = new Anthropic({ apiKey: ' ', baseURL });

  const body = {
    model,
    max_tokens_to_sample,
    temperature,
    prompt: `${Anthropic.HUMAN_PROMPT} ${prompt}${Anthropic.AI_PROMPT}`,
    ...otherOptions,
  };

  if (!onStream) {
    const { completion } = await anthropic.completions.create(
      { ...body, stream: false },
      { signal },
    );
    return completion;
  } else {
    const stream = await anthropic.completions.create({ ...body, stream: true }, { signal });

    let acc = '';
    for await (const { completion } of stream) {
      if (acc === '') acc += completion.replace(/^\s+/, '');
      else acc += completion;
      onStream({ acc, token: completion, done: false }, model);
    }
    onStream({ acc, token: '', done: true }, model);
    return acc;
  }
}
