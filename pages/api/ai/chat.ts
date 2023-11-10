import { Message, StreamingTextResponse } from 'ai';
import { ChatAnthropic } from 'langchain/chat_models/anthropic';
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

  // calculate total token
  const tokenCalculator = new ChatOpenAI({ openAIApiKey: process.env.OPENAI_API_TOKEN });
  const { totalCount: messagesTokens } =
    await tokenCalculator.getNumTokensFromMessages(chatMessages);
  const maxReplyTokens = 1024;
  const totalTokens = messagesTokens + maxReplyTokens;

  // shared model options
  const options = {
    openAIApiKey: process.env.OPENAI_API_TOKEN,
    anthropicApiKey: process.env.ANTHROPIC_API_TOKEN,
    maxTokens: maxReplyTokens,
    temperature: 0.3,
  };

  // choose a model that can handle the token count
  let model;
  if (totalTokens < 16 * 1024) {
    model = new ChatOpenAI({ modelName: 'gpt-3.5-turbo-1106', ...options });
  } else {
    model = new ChatOpenAI({ modelName: 'gpt-4-1106-preview', ...options });
  }

  const outputParser = new BytesOutputParser();
  const chain = model!.pipe(outputParser);
  const stream = await chain.stream(chatMessages);

  return new StreamingTextResponse(stream);
}
