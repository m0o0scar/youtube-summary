import { Message } from 'ai';
import { useChat } from 'ai/react';
import { useEffect, useState } from 'react';

let id = Date.now();
const getId = () => (++id).toString();
const maxHistoryPair = 5;

export const useChatContent = (storageKey: string, prompt: string, api = '/api/ai/chat') => {
  const [pending, setPending] = useState(false);

  const { messages, setMessages, reload } = useChat({
    api,
    onFinish: () => setPending(false),
  });

  const getSystemMessage = () => {
    return { id: getId(), role: 'system', content: prompt } as Message;
  };

  const sendMessage = (content: string) => {
    setPending(true);

    const newMessage: Message = { id: getId(), role: 'user', content };
    const [systemMessage, ...history] = messages;
    setMessages([systemMessage, ...history.slice(-maxHistoryPair * 2), newMessage]);

    reload();
  };

  const clear = () => {
    setMessages([getSystemMessage()]);
    localStorage.removeItem(storageKey);
  };

  const loadHistory = () => {
    return JSON.parse(localStorage.getItem(storageKey) || '[]') as Message[];
  };

  const saveHistory = () => {
    const [_systemMessage, ...history] = messages;
    const historyToSave = history.slice(-maxHistoryPair * 2);
    localStorage.setItem(storageKey, JSON.stringify(historyToSave));
  };

  useEffect(() => {
    if (storageKey && prompt) {
      const history = loadHistory();
      const newMessages = [getSystemMessage(), ...history];
      setMessages(newMessages);
    }
  }, [storageKey, prompt]);

  useEffect(() => {
    if (messages.length > 0 && messages[messages.length - 1].role === 'assistant') {
      saveHistory();
    }
  }, [messages]);

  return {
    pending,
    messages,
    sendMessage,
    clear,
  };
};
