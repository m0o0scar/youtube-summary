import { GetPrompt, useSummary } from '@components/commons/useSummary';

const getPrompt: GetPrompt = (title: string, caption: string, language: 'en' | 'zh-CN') => {
  return {
    en: `## Video Title ##
${title}

## Video Caption ##
${caption}

## Task ##
Summarize the caption into a short list of key points (no more than 10) that are most relevant to the title, and reply in English.
Your reply should be concise, easy to understand. You should reply without any redundant content, title, or description.`,

    'zh-CN': `## 视频标题 ##
${title}

## 视频字幕 ##
${caption}

## 任务 ##
将字幕总结成跟标题最为相关的最主要的关键点（不多于10个），并以中文回复。
你的总结应简洁、易懂、没有多余的内容，不用带标题、任何前后缀（比如“观点：“、“要点：”等）、或描述。`,
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
