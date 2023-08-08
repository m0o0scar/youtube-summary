import { useState } from 'react';

import { GetPrompt, useSummary } from '@components/commons/useSummary';

const getPrompt: GetPrompt = (title: string, comments: string, language: 'en' | 'zh-CN') => {
  return {
    en: `## Video Title ##
${title}

## Viewers' Comments ##
${comments}

## Task ##
Summarize the comments into a short list of most relevant key points, and reply in English.
Your reply should be concise, easy to understand. You should reply without any redundant content, title, or description.

## Example Reply ##
- Most viewers think that ...
- Some viewers believe ...
- Overall, ...`,

    'zh-CN': `## 视频标题 ##
${title}

## 用户评论 ##
${comments}

## 任务 ##
将用户评论总结成最主要的用户观点，并以中文回复。
你的总结应简洁、易懂、没有多余的内容，不用带标题或描述。

## 示例回复 ##
- 大部分人认为...
- 有些人认为...
- 总体来说...`,
  }[language];
};

export const useYouTubeVideoCommentsSummary = (
  videoId?: string,
  title?: string,
  commenets?: string[],
  language?: string,
) => {
  return useSummary('youtube-comments', getPrompt, videoId, title, commenets?.join('\n'), language);
};
