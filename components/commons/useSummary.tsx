import { Message, useChat } from 'ai/react';
import { debounce } from 'lodash';
import { useEffect, useRef, useState } from 'react';

import { useTrigger } from './useTrigger';

export type GetPrompt = (title: string, content: string, language: 'en' | 'zh-CN') => string;

export const useSummary = (
  tag: string,
  getPrompt: GetPrompt,
  id?: string,
  title?: string,
  content?: string,
  language?: string,
) => {
  const languageToUse = language?.startsWith('zh') ? 'zh-CN' : 'en';
  const storageKey = `${tag}-${id}-${languageToUse}`;

  // model and summary
  const [model, setModel] = useState('');
  const [summary, _setSummary] = useState('');
  const setSummary = (content: string) => _setSummary(content.replace(/\n{2,}/g, '\n'));
  const [error, setError] = useState<Error | null>(null);

  // duration
  const t0 = useRef(0);
  const [duration, setDuration] = useState(0);

  // summarization finished?
  const [done, setDone] = useState(false);

  const { messages, setMessages, reload } = useChat({
    api: '/api/ai/summary',
    onResponse: (response) => {
      const llmModel = response.headers.get('llm-model') || '';
      setModel(llmModel);
    },
    onFinish: ({ content }) => {
      setSummary(content);

      setDuration(new Date().getTime() - t0.current);

      setDone(true);

      localStorage.setItem(storageKey, JSON.stringify({ summary: content, model }));
    },
  });

  const reGenTrigger = useTrigger();

  const reset = () => {
    setModel('');
    setSummary('');
    setDuration(0);
    setError(null);
    setDone(false);
  };

  const createSummary = debounce(async (ignoreCache?: boolean) => {
    if (id && title && content) {
      reset();

      // is there a cache?
      if (!ignoreCache) {
        const cachedValue = localStorage.getItem(storageKey);
        if (cachedValue) {
          const cached = JSON.parse(cachedValue);
          setSummary(cached.summary);
          setModel(cached.model);
          setDone(true);
          return;
        }
      }

      // no cache available, create new summary
      t0.current = new Date().getTime();
      const prompt = getPrompt(title, content, languageToUse);
      setMessages([{ id: 'request', role: 'user', content: prompt }]);
      reload();
    }
  }, 200);

  useEffect(() => {
    reset();
  }, [id]);

  useEffect(() => {
    createSummary();
  }, [title, content]);

  useEffect(() => {
    if (reGenTrigger.value) {
      createSummary(true);
    }
  }, [reGenTrigger.value]);

  useEffect(() => {
    const { role, content } = messages[1] || {};
    if (role === 'assistant' && content) {
      setSummary(content);
    }
  }, [messages]);

  return {
    model,
    summary,
    duration,
    done,
    error,
    regen: reGenTrigger.trigger,
  };
};
