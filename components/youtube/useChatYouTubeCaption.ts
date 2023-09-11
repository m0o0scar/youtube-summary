import { useEffect, useState } from 'react';

import { useChatContent } from '@components/commons/useChatContent';

export const useChatYouTubeCaption = (videoId?: string, title?: string, caption?: string) => {
  const [prompt, setPrompt] = useState('');

  const storageKey = videoId ? `youtube-chat-${videoId}` : '';
  const chat = useChatContent(storageKey, prompt);

  useEffect(() => {
    if (title && caption) {
      setPrompt(
        [
          `You are a helpful AI assistant answering questions regarding a YouTube video.`,
          `Keep your reply concise and easy to understand.`,
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
