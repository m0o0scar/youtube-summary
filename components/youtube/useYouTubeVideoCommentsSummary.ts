import { useState } from 'react';

import { GetPrompt, useSummary } from '@components/commons/useSummary';

const getPrompt: GetPrompt = (title: string, comments: string, language: 'en' | 'zh-CN') => {
  return {
    en: `I will provide you the title and viewers' comments of a video.
Your task is to summarize the comments into bullet points representing major opinions of the viewers.
You should include at most the top 5 major opinions in the summary.
You should reply in bullet point format. Your reply should be concise, easy to understand, and without any redundant content.
Don't wrap your reply in XML tag. You should never simply translate each comment!

This is the video title, in <title></title> XML tag:
<title>${title}</title>

These are viewers' comments, in <comments></comments> XML tag:
<comments>
${comments}
</comments>

Please reply in English.`,

    'zh-CN': `我会给你提供一个视频的标题和用户评论。你的任务是从评论中总结出用户的主要观点，并以中文回复。
你在回复里只需要包括最多5个最主要观点即可。你的回复应当简洁、易懂、没有多余的内容。你的回复只需要包括主要观点，无需包括视频标题、也无需额外说明和描述。
切勿将回复内容包含在XML标签里。

以下是视频标题，在 <title></title> XML 标签中:
<title>${title}</title>

以下是用户评论，在 <comments></comments> XML 标签中:
<comments>
${comments}
</comments>

请务必以中文回复！`,
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
