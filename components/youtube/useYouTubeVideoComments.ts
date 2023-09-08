import { useEffect, useState } from 'react';

import { countTokensOfText } from '@components/llm/countTokens';

import { fetchYouTubeVideoComments } from './api';
import { ContentStatus } from './type';

export const useYouTubeVideoComments = (videoId?: string) => {
  const [status, setStatus] = useState<ContentStatus>('pending');
  const [comments, setComments] = useState<string[]>([]);
  const [commentsTokens, setCommentsTokens] = useState(0);

  useEffect(() => {
    setStatus('pending');
    setComments([]);
    setCommentsTokens(0);

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
          setStatus('empty');
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
