import { GetPrompt, useSummary } from '@components/commons/useSummary';

const getPrompt: GetPrompt = (title: string, caption: string, language: 'en' | 'zh-CN') => {
  return {
    en: `This is the title of a video, in <title></title> XML tag:
<title>${title}</title>

This is the caption of the video, in <caption></caption> XML tag:
<caption>
${caption}
</caption>

Your task is to extract the major key points, facts, and opinions from the caption (try your best to keep it under 10 points), and reply in English.
Your reply should be concise, easy to understand. You should reply without any redundant content like title or description.`,

    'zh-CN': `这是一个视频的标题，在<title></title> XML标签里：
<title>${title}</title>

这是该视频的字幕，在<caption></caption> XML标签里：
<caption>
${caption}
</caption>

你的任务是从字幕中总结出视频的关键要点、事实、和观点（尽量不超过十条），并以中文回复。你的总结应简洁和易懂，不用带标题或描述等多余内容。
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
