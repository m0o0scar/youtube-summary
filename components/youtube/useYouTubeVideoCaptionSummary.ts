import { useEffect, useRef, useState } from 'react';

import { useTrigger } from '@components/commons/useTrigger';
import { completion } from '@components/llm/completion';
import { Anthropic_Claude2 } from '@components/llm/providers/anthropic';
import { OpenAI_GPT3_5, OpenAI_GPT3_5_16k } from '@components/llm/providers/openai';

function getPrompt(title: string, caption: string, language: string) {
  return {
    en: `I will provide you a title and transcription of a video.
Your task is to extract the most relevant key points related to the title from the transcription.
Each key point should be concise, easy to understand, and without any redundant content.
Reply with key points only without extra description. Don't wrap your reply in XML tag.

This is the video title, in <title></title> XML tag:
<title>${title}</title>

This is the video transcription, in <transcription></transcription> XML tag:
<transcription>
${caption}
</transcription>

Please reply in English.`,

    'zh-CN': `我会给你提供一个视频的标题和字幕内容。你的任务是从字幕中提取与标题相关的关键点。
每个关键点应当简洁、易懂，没有多余的内容。仅回复关键点，无需额外说明，切勿将回复内容包含在XML标签里。

以下是视频标题，在 <title></title> XML 标签中:
<title>${title}</title>

以下是视频字幕，在 <transcription></transcription> XML 标签中:
<transcription>
${caption}
</transcription>

请务必以中文回复！`,
  }[language]!;
}

export const useYouTubeVideoCaptionSummary = (
  videoId?: string,
  title?: string,
  caption?: string,
  language?: string,
) => {
  const [model, setModel] = useState('');
  const [summary, setSummary] = useState('');
  const [error, setError] = useState<Error | null>(null);

  const abortController = useRef<AbortController | null>(null);

  const reloadTrigger = useTrigger();

  const createSummary = async (ignoreCache?: boolean) => {
    abortController.current?.abort();

    setModel('');
    setSummary('');
    setError(null);

    if (videoId && title && caption) {
      const languageToUse = language?.startsWith('zh') ? 'zh-CN' : 'en';
      const key = `youtube-caption-${videoId}-${languageToUse}`;

      // is there a cache?
      if (!ignoreCache) {
        const cachedValue = localStorage.getItem(key);
        if (cachedValue) {
          const cached = JSON.parse(cachedValue);
          setSummary(cached.summary);
          setModel(cached.model);
          return;
        }
      }

      // create summary
      const prompt = getPrompt(title, caption, languageToUse);
      abortController.current = new AbortController();
      try {
        const { model, result } = await completion(
          [OpenAI_GPT3_5, OpenAI_GPT3_5_16k, Anthropic_Claude2],
          prompt,
          {
            temperature: 0.2,
            onStream: ({ acc }, model) => {
              setSummary(acc);
              setModel(model);
            },
            signal: abortController.current.signal,
          },
        );

        localStorage.setItem(key, JSON.stringify({ summary: result, model }));
      } catch (error) {
        setError(error as Error);
      }
    }
  };

  useEffect(() => {
    createSummary();
  }, [videoId, title, caption]);

  useEffect(() => {
    createSummary(true);
  }, [reloadTrigger.value]);

  return {
    model,
    summary,
    error,
    reload: reloadTrigger.trigger,
  };
};
