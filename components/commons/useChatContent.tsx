import { Message } from 'ai';
import { useChat } from 'ai/react';
import { useEffect, useState } from 'react';

let id = Date.now();
const getId = () => (++id).toString();

export const useChatContent = (prompt: string, api = '/api/ai/chat') => {
  const [pending, setPending] = useState(false);

  const { messages, setMessages, reload } = useChat({
    api,
    onFinish: () => setPending(false),
  });

  const sendMessage = (content: string) => {
    setPending(true);

    const newMessage: Message = { id: getId(), role: 'user', content };
    const maxHistoryPair = 5;
    if (messages.length <= maxHistoryPair * 2) {
      setMessages([...messages, newMessage]);
    } else {
      const [systemMessage, ...history] = messages;
      setMessages([systemMessage, ...history.slice(-maxHistoryPair * 2), newMessage]);
    }

    reload();
  };

  useEffect(() => {
    setMessages([{ id: getId(), role: 'system', content: prompt }]);
  }, [prompt]);

  return {
    pending,
    messages,
    sendMessage,
  };
};
