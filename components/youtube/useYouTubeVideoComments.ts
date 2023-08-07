import { useEffect, useState } from 'react';

import { countTokensOfText } from '@components/llm/providers/openai';

import { fetchYouTubeVideoComments } from './api';

export type CommentsStatus = 'pending' | 'noComments' | 'loaded';

export const useYouTubeVideoComments = (videoId?: string) => {
  const [status, setStatus] = useState<CommentsStatus>('pending');
  const [comments, setComments] = useState<string[]>([]);
  const [commentsTokens, setCommentsTokens] = useState(0);

  useEffect(() => {
    setStatus('pending');
    setComments([]);

    (async () => {
      if (videoId) {
        const threads = await fetchYouTubeVideoComments(videoId);
        if (threads.length) {
          const commentTexts = threads.map((thread) => {
            const { textDisplay, authorDisplayName } = thread.snippet.topLevelComment.snippet;
            return `${authorDisplayName}: ${textDisplay}`;
          });
          setComments(commentTexts);
          setCommentsTokens(countTokensOfText(commentTexts.join('\n')));
          setStatus('loaded');
        } else {
          setStatus('noComments');
        }
      }
    })();
  }, [videoId]);

  return {
    commentsStatus: status,
    comments,
    commentsTokens,
  };
};
