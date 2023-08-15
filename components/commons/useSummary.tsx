import { useEffect, useState } from 'react';

import { completion } from '@components/llm/completion';
import { Anthropic_Claude_Instant } from '@components/llm/providers/anthropic';
import { OpenAI_GPT3_5, OpenAI_GPT3_5_16k } from '@components/llm/providers/openai';

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

  const loadSummaryFromCache = async (storageKey: string, ignoreCache?: boolean) => {
    if (id && !ignoreCache) {
      const cachedValue = localStorage.getItem(storageKey);
      if (cachedValue) {
        const cached = JSON.parse(cachedValue);
        setSummary(cached.summary);
        setModel(cached.model);
        setDone(true);
        return true;
      }
    }
    return false;
  };

  const createSummary = async (ignoreCache?: boolean) => {
    setModel('');
    setSummary('');
    setDuration(0);
    setError(null);
    setDone(false);

    if (id) {
      const languageToUse = language?.startsWith('zh') ? 'zh-CN' : 'en';
      const storageKey = `${tag}-${id}-${languageToUse}`;

      // if there is cache to use, use it and return
      if (await loadSummaryFromCache(storageKey, ignoreCache)) return;

      if (title && content) {
        // no cache available, create new summary
        const prompt = getPrompt(title, content, languageToUse);
        try {
          const t0 = new Date().getTime();
          const { model, result } = await completion(
            [OpenAI_GPT3_5, OpenAI_GPT3_5_16k, Anthropic_Claude_Instant],
            prompt,
            {
              temperature: 0.5,
              onStream: ({ acc }, model) => {
                setSummary(acc.replace(/\n{2,}/g, '\n'));
                setModel(model);
              },
            },
          );

          const t1 = new Date().getTime();
          setDuration(t1 - t0);

          // save to cache
          localStorage.setItem(
            storageKey,
            JSON.stringify({ summary: result.replace(/\n{2,}/g, '\n'), model }),
          );
        } catch (error) {
          setError(error as Error);
        }
      }
      setDone(true);
    }
  };

  useEffect(() => {
    createSummary();
  }, [id, title, content, language]);

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
