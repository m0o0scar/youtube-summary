import { StreamingTextResponse } from 'ai';
import { ChatOpenAI } from 'langchain/chat_models/openai';
import { PromptTemplate } from 'langchain/prompts';
import { BytesOutputParser } from 'langchain/schema/output_parser';
import { NextRequest } from 'next/server';

export const runtime = 'edge';

export default async function handler(req: NextRequest) {
  const { messages } = await req.json();
  const prompt = messages[0].content;

  const promptTemplate = PromptTemplate.fromTemplate('{prompt}');

  const model = new ChatOpenAI({
    modelName: 'gpt-4o',
    openAIApiKey: process.env.OPENAI_API_TOKEN,
    temperature: 0,
    maxTokens: 1024,
  });

  /**
   * Chat models stream message chunks rather than bytes, so this
   * output parser handles serialization and encoding.
   */
  const outputParser = new BytesOutputParser();

  const chain = promptTemplate.pipe(model).pipe(outputParser);
  const stream = await chain.stream({ prompt });
  return new StreamingTextResponse(stream, {
    headers: {
      'llm-provider': 'openai',
      'llm-model': 'gpt-4o',
    },
  });
}
