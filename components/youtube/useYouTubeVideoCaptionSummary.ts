import { GetPrompt, useSummary } from '@components/commons/useSummary';

const getPrompt: GetPrompt = (title: string, caption: string, language: 'en' | 'zh-CN') => {
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

    'zh-CN': `我会给你提供一个视频的标题和字幕内容。你的任务是从字幕中总结出与标题相关的主要关键点，并以中文回复。
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
};

export const useYouTubeVideoCaptionSummary = (
  videoId?: string,
  title?: string,
  caption?: string,
  language?: string,
) => {
  return useSummary('youtube-caption', getPrompt, videoId, title, caption, language);
};
