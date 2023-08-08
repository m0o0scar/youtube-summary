import { GetPrompt, useSummary } from '@components/commons/useSummary';

const getPrompt: GetPrompt = (title: string, caption: string, language: 'en' | 'zh-CN') => {
  return {
    en: `## Video Title ##
${title}

## Video Caption ##
${caption}

## Task ##
Summarize the caption into a short paragraph (within 10 sentences), and reply in English.
Your reply should be concise, easy to understand. You should reply without any redundant content like title or description.`,

    'zh-CN': `## 视频标题 ##
${title}

## 视频字幕 ##
${caption}

## 任务 ##
将字幕总结成一段概括字幕主要内容、事实、和观点的短文（不超过十句话），并以中文回复。你的总结应简洁和易懂，不用带标题或描述等多余内容。
重要的事情说三遍：请以中文回复，请以中文回复，请以中文回复！`,
  }[language]!;
};

export const useYouTubeVideoCaptionSummary = (
  videoId?: string,
  title?: string,
  caption?: string,
  language?: string,
) => {
  return useSummary('youtube-caption', getPrompt, videoId, title, caption, language);
};
