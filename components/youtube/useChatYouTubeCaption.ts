import { useEffect, useState } from 'react';

import { useChatContent } from '@components/commons/useChatContent';

export const useChatYouTubeCaption = (title?: string, caption?: string) => {
  const [prompt, setPrompt] = useState('');

  const chat = useChatContent(prompt);

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
