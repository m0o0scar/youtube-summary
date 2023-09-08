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
    setMessages([...messages, { id: getId(), role: 'user', content }]);
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
