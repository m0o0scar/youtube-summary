import { StreamingTextResponse } from 'ai';
import { ChatOpenAI } from 'langchain/chat_models/openai';
import { PromptTemplate } from 'langchain/prompts';
import { BytesOutputParser } from 'langchain/schema/output_parser';
import { NextRequest } from 'next/server';

export const runtime = 'edge';

export default async function handler(req: NextRequest) {
  const { prompt, temperature = 0.5, maxReplyTokens = 1024 } = await req.json();

  const promptTemplate = PromptTemplate.fromTemplate('{prompt}');

  const options = {
    openAIApiKey: process.env.OPENAI_API_TOKEN,
    temperature,
    maxTokens: maxReplyTokens,
  };

  const models = [
    { maxTotalToken: 4, model: new ChatOpenAI({ modelName: 'gpt-3.5-turbo', ...options }) },
    { maxTotalToken: 16, model: new ChatOpenAI({ modelName: 'gpt-3.5-turbo-16k', ...options }) },
  ];

  /**
   * Chat models stream message chunks rather than bytes, so this
   * output parser handles serialization and encoding.
   */
  const outputParser = new BytesOutputParser();

  for (const { maxTotalToken, model } of models) {
    const inputTokens = await model.getNumTokens(prompt);
    const canHandlePromot = inputTokens + maxReplyTokens < maxTotalToken * 1024;
    console.log(
      `model=${
        model.modelName
      }, inputTokens (${inputTokens}) + maxReplyTokens (${maxReplyTokens}) ${
        canHandlePromot ? '<' : '>'
      } maxTotalToken (${maxTotalToken})`,
    );

    if (canHandlePromot) {
      const chain = promptTemplate.pipe(model).pipe(outputParser);
      const stream = await chain.stream({ prompt });
      return new StreamingTextResponse(stream);
    }
  }

  return new Response('Prompt too long', { status: 400, statusText: 'Prompt too long' });
}
