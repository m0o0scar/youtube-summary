import { debounce } from 'lodash';
import { useEffect, useState } from 'react';

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
  const [model, setModel] = useState('');
  const [summary, setSummary] = useState('');
  const [duration, setDuration] = useState(0);
  const [error, setError] = useState<Error | null>(null);
  const [done, setDone] = useState(false);

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
      const languageToUse = language?.startsWith('zh') ? 'zh-CN' : 'en';
      const storageKey = `${tag}-${id}-${languageToUse}`;

      // // is there a cache?
      // if (!ignoreCache) {
      //   const cachedValue = localStorage.getItem(storageKey);
      //   if (cachedValue) {
      //     const cached = JSON.parse(cachedValue);
      //     setSummary(cached.summary);
      //     setModel(cached.model);
      //     setDone(true);
      //     return;
      //   }
      // }

      // no cache available, create new summary
      const prompt = getPrompt(title, content, languageToUse);
      try {
        const t0 = new Date().getTime();

        // const { model, result } = await completion(
        //   [OpenAI_GPT3_5, OpenAI_GPT3_5_16k, Anthropic_Claude_Instant],
        //   prompt,
        //   {
        //     temperature: 0.5,
        //     maxReplyTokens: 1024,
        //     onStream: ({ acc }, model) => {
        //       setSummary(acc.replace(/\n{2,}/g, '\n'));
        //       setModel(model);
        //     },
        //   },
        // );

        const response = await fetch('/api/ai/summary', {
          method: 'POST',
          body: JSON.stringify({ prompt }),
        });

        const result = await response.text();
        setSummary(result);

        const t1 = new Date().getTime();
        setDuration(t1 - t0);

        localStorage.setItem(
          storageKey,
          JSON.stringify({ summary: result.replace(/\n{2,}/g, '\n'), model }),
        );
      } catch (error) {
        setError(error as Error);
      }

      setDone(true);
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

  return {
    model,
    summary,
    duration,
    done,
    error,
    regen: reGenTrigger.trigger,
  };
};
