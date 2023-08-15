import { GetPrompt, useSummary } from '@components/commons/useSummary';

const getPrompt: GetPrompt = (title: string, caption: string, language: 'en' | 'zh-CN') => {
  const lang = language === 'en' ? 'English' : 'Chinese';
  return `This is the title of a video, in <title></title> XML tag:
<title>${title}</title>

This is the caption of the video, in <caption></caption> XML tag:
<caption>
${caption}
</caption>

Your task is to extract the major key points, facts, and opinions from the caption, and reply in markdown bullet point format (try your best to keep it under 10 points).
Your reply should be concise, easy to understand. You should reply without any redundant content like title or description.
Please reply in ${lang}.`;
};

export const useYouTubeVideoCaptionSummary = (
  videoId?: string,
  title?: string,
  caption?: string,
  language?: string,
) => {
  return useSummary('youtube-caption', getPrompt, videoId, title, caption, language);
};
