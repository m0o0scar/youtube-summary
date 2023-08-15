import { GetPrompt, useSummary } from '@components/commons/useSummary';

const getPrompt: GetPrompt = (title: string, comments: string, language: 'en' | 'zh-CN') => {
  const lang = language === 'en' ? 'English' : 'Chinese';
  return `This is the title of a video, in <title></title> XML tag:
<title>${title}</title>

These are viewers' comments to the video, in <comments></comments> XML tag:
<comments>
${comments}
</comments>

Your task is to summarize the comments into a short list of most relevant key points (no more than 5), and reply in markdown bullet point format.
Your reply should be concise, easy to understand. You should reply without any redundant content, title, or description.
Please reply in ${lang}.

Example Reply:
- Most viewers think that ...
- Some viewers believe ...
- Overall, ...`;
};

export const useYouTubeVideoCommentsSummary = (
  videoId?: string,
  title?: string,
  commenets?: string[],
  language?: string,
) => {
  return useSummary('youtube-comments', getPrompt, videoId, title, commenets?.join('\n'), language);
};
