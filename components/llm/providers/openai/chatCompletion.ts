import {
    ChatCompletionResponseMessage, CreateChatCompletionRequest, CreateChatCompletionResponse
} from 'openai';

import { DefaultMaxReplyTokens, DefaultTemperature, OnStream } from '../../type';
import { baseUrl } from './middleware';

export async function chatCompletion(
  request: Partial<CreateChatCompletionRequest>,
  onStream?: OnStream,
  signal?: AbortSignal,
) {
  // provide default options
  const {
    model = 'gpt-3.5-turbo',
    max_tokens = DefaultMaxReplyTokens,
    temperature = DefaultTemperature,
    stream = Boolean(onStream),
    ...otherOptions
  } = request;

  // send request to OpenAI via middleware proxy
  const response = await fetch(`${baseUrl}/v1/chat/completions`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      model,
      max_tokens,
      temperature,
      stream,
      ...otherOptions,
    } as CreateChatCompletionRequest),
    signal,
  });

  if (stream && onStream) {
    const reader = response.body!.pipeThrough(new TextDecoderStream()).getReader();
    let acc = '';
    while (true) {
      /**
       * value format:
       *
       * data: {"id":"chatcmpl-7kChEAVEUx6iTk07gfTH0V1bvtVsw","object":"chat.completion.chunk","created":1691246248,"model":"gpt-3.5-turbo-0613","choices":[{"index":0,"delta":{},"finish_reason":"stop"}]}
       *
       * data: [DONE]
       */
      const { done, value = '' } = await reader.read();

      const lines = value.split('\n\n').map((i) => i.trim().replace(/^data: /, ''));
      for (const line of lines) {
        if (line && line !== '[DONE]') {
          const chunk = JSON.parse(line);
          const content = chunk.choices[0].delta.content || '';
          acc += content;
          onStream({ acc, token: content, done }, model);
        }
      }
      if (done) return acc;
    }
  } else {
    const json = (await response.json()) as CreateChatCompletionResponse;
    return json.choices[0].message!.content || '';
  }
}
