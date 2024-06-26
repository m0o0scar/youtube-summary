import { useEffect, useState } from 'react';

import { fetchYouTubeVideoComments } from './api';
import { ContentStatus } from './type';

export const useYouTubeVideoComments = (videoId?: string) => {
  const [status, setStatus] = useState<ContentStatus>('pending');
  const [comments, setComments] = useState<string[]>([]);

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
  };
};
