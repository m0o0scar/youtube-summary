import { useEffect, useMemo, useState } from 'react';

import { useChatContent, UseChatContentOptions } from '@components/commons/useChatContent';

export const useChatYouTubeCaption = (videoId?: string, title?: string, caption?: string) => {
  const [prompt, setPrompt] = useState('');

  const storageKey = videoId ? `youtube-chat-${videoId}` : '';

  const options = useMemo(
    () =>
      ({
        storageKey,
        copyPrefix: `${title}\nhttps://www.youtube.com/watch?v=${videoId}`,
      }) as UseChatContentOptions,
    [storageKey, title, videoId],
  );
  const chat = useChatContent(prompt, options);

  useEffect(() => {
    if (title && caption) {
      setPrompt(
        [
          `You are a helpful AI assistant answering questions regarding a YouTube video.`,
          `ALWAYS include relevant quotes from the caption in your reply, put them in separate paragraphs in markdown format.`,
          `Keep your reply and quotes brief, concise and easy to understand.`,
          `The title of the video is "${title}".`,
          `The caption of the video is:\n\n${caption}`,
        ].join(' '),
      );
    }
  }, [title, caption]);

  return {
    ...chat,
  };
};
