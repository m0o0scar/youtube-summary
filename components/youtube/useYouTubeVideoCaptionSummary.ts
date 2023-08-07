import { useEffect, useRef, useState } from 'react';

import { useTrigger } from '@components/commons/useTrigger';
import { completion } from '@components/llm/completion';
import { Anthropic_Claude2 } from '@components/llm/providers/anthropic';
import { OpenAI_GPT3_5, OpenAI_GPT3_5_16k } from '@components/llm/providers/openai';

function getPrompt(title: string, caption: string, language: string) {
  return {
    en: `I will provide you the title and caption of a video.
Your task is to summarize the caption into key points that are most relevant to the title, and reply only the key points to me in English.
You should reply in bullet point format. Your reply should be concise, easy to understand, and without any redundant content.
Don't wrap your reply in XML tag.

This is the video title, in <title></title> XML tag:
<title>${title}</title>

This is the video caption, in <caption></caption> XML tag:
<caption>
${caption}
</caption>

Please reply in English.`,

    'zh-CN': `我会给你提供一个视频的标题和字幕内容。你的任务是从字幕中提取与标题相关的主要关键点，并以中文回复。
你的回复应当简洁、易懂、没有多余的内容。你的回复只需要包括主要关键点，无需包括视频标题、也无需额外说明。
切勿将回复内容包含在XML标签里。

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
  const [done, setDone] = useState(false);

  const reloadTrigger = useTrigger();

  const createSummary = async (ignoreCache?: boolean) => {
    setModel('');
    setSummary('');
    setError(null);
    setDone(false);

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
          setDone(true);
          return;
        }
      }

      // create summary
      const prompt = getPrompt(title, caption, languageToUse);
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
          },
        );

        localStorage.setItem(key, JSON.stringify({ summary: result, model }));
      } catch (error) {
        setError(error as Error);
      }

      setDone(true);
    }
  };

  useEffect(() => {
    createSummary();
  }, [videoId, title, caption]);

  useEffect(() => {
    if (reloadTrigger.value) {
      createSummary(true);
    }
  }, [reloadTrigger.value]);

  return {
    model,
    summary,
    done,
    error,
    reload: reloadTrigger.trigger,
  };
};
