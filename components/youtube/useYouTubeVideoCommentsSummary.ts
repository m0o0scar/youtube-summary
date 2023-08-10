import { useState } from 'react';

import { GetPrompt, useSummary } from '@components/commons/useSummary';

const getPrompt: GetPrompt = (title: string, comments: string, language: 'en' | 'zh-CN') => {
  return {
    en: `This is the title of a video, in <title></title> XML tag:
<title>${title}</title>

These are viewers' comments to the video, in <comments></comments> XML tag:
<comments>
${comments}
</comments>

Your task is to summarize the comments into a short list of most relevant key points (no more than 5), and reply in English.
Your reply should be concise, easy to understand. You should reply without any redundant content, title, or description.

Example Reply:
- Most viewers think that ...
- Some viewers believe ...
- Overall, ...`,

    'zh-CN': `这是一个视频的标题，在<title></title> XML标签里：
<title>${title}</title>

这是用户对该视频的评论，在<comments></comments> XML标签里：
<comments>
${comments}
</comments>

你的任务是将用户评论总结成最主要的用户观点（不超过5个），并以中文回复。
你的总结应简洁、易懂、没有多余的内容，不用带标题或描述。

示例回复：
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
