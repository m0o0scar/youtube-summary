import { Message } from 'ai';
import { useChat } from 'ai/react';
import { useEffect, useState } from 'react';
import { toast } from 'react-toastify';

let id = Date.now();
const getId = () => (++id).toString();
const maxHistoryPair = 5;

export interface UseChatContentOptions {
  storageKey?: string;
  api?: string;
  copyPrefix?: string;
}

export const useChatContent = (prompt: string, options?: UseChatContentOptions) => {
  const { storageKey, api = '/api/ai/chat', copyPrefix } = options || {};

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

  const copyMessages = async () => {
    if (messages.length > 1) {
      const text = messages
        .filter(({ role }) => role !== 'system')
        .map(({ role, content }, i) => {
          const isAI = role === 'assistant';
          const name = isAI ? '🤖' : '🙂';
          // prefix an extra newline to user's question, so that we can group each question-answer pair together
          const extraNewline = !isAI && i ? '\n' : '';
          return `${extraNewline}${name}: ${content}`;
        });

      if (copyPrefix) text.unshift(`${copyPrefix}\n`);
      await navigator.clipboard.writeText(text.join('\n'));
      toast.success('Chat messages copied');
    } else {
      toast.warn('No chat messages');
    }
  };

  const clear = () => {
    setMessages([getSystemMessage()]);
    storageKey && localStorage.removeItem(storageKey);
  };

  const loadHistory = () => {
    if (storageKey) {
      return JSON.parse(localStorage.getItem(storageKey) || '[]') as Message[];
    } else {
      return [];
    }
  };

  const saveHistory = () => {
    if (storageKey) {
      const [_systemMessage, ...history] = messages;
      const historyToSave = history.slice(-maxHistoryPair * 2);
      localStorage.setItem(storageKey, JSON.stringify(historyToSave));
    }
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
    copyMessages,
    clear,
  };
};
