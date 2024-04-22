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

  const maxReplyTokens = 1024;

  // shared model options
  const options = {
    openAIApiKey: process.env.OPENAI_API_TOKEN,
    anthropicApiKey: process.env.ANTHROPIC_API_TOKEN,
    maxTokens: maxReplyTokens,
    temperature: 0,
  };

  // choose a model that can handle the token count
  const model = new ChatOpenAI({ modelName: 'gpt-4-turbo', ...options });

  const outputParser = new BytesOutputParser();
  const chain = model!.pipe(outputParser);
  const stream = await chain.stream(chatMessages);

  return new StreamingTextResponse(stream);
}
