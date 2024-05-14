import { Message, StreamingTextResponse } from 'ai';
import { ChatOpenAI } from 'langchain/chat_models/openai';
import { AIMessage, HumanMessage, SystemMessage } from 'langchain/schema';
import { BytesOutputParser } from 'langchain/schema/output_parser';
import { NextRequest } from 'next/server';

export const runtime = 'edge';

interface RequestJson {
  messages: Message[];
}

export default async function handler(req: NextRequest) {
  // get params from request
  const { messages = [] } = (await req.json()) as RequestJson;

  // convert to langchain messages
  const chatMessages = messages.map(({ role, content }) => {
    switch (role) {
      case 'assistant':
        return new AIMessage(content);
      case 'system':
        return new SystemMessage(content);
      default:
        return new HumanMessage(content);
    }
  });

  const model = new ChatOpenAI({
    modelName: 'gpt-4o',
    openAIApiKey: process.env.OPENAI_API_TOKEN,
    maxTokens: 1024,
    temperature: 0,
  });

  const outputParser = new BytesOutputParser();
  const chain = model!.pipe(outputParser);
  const stream = await chain.stream(chatMessages);
  return new StreamingTextResponse(stream);
}
