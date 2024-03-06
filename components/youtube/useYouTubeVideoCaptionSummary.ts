import { GetPrompt, useSummary } from '@components/commons/useSummary';

const getPrompt: GetPrompt = (title: string, caption: string, language: 'en' | 'zh-CN') => {
  const lang = language === 'en' ? 'English' : 'Chinese';
  return `This is the title of a video, in <title></title> XML tag:
<title>${title}</title>

This is the caption of the video, in <caption></caption> XML tag:
<caption>
${caption}
</caption>

Your task is to extract the major key points, facts, and opinions from the caption, and reply in markdown bullet point format. Try your best to keep it within 5 bullet points. Reply in ${lang}..
Your reply should be concise and easy to understand.
You should reply without any redundant content like title or description.
You should ignore irrelevant content from the caption, for example ads and reminder for subscribing to or spreading the channel, etc.`;
};

export const useYouTubeVideoCaptionSummary = (
  videoId?: string,
  title?: string,
  caption?: string,
  language?: string,
) => {
  return useSummary('youtube-caption', getPrompt, videoId, title, caption, language);
};
