import { useEffect, useState } from 'react';

import { fetchYouTubeVideoInfo } from './api';

export const useYouTubeVideoInfo = (videoId?: string) => {
  const [title, setTitle] = useState('');
  const [thumbnail, setThumbnail] = useState('');

  useEffect(() => {
    setTitle('');
    setThumbnail('');

    (async () => {
      if (videoId) {
        const response = (await fetchYouTubeVideoInfo(videoId))!;

        setTitle(response.snippet.title);

        const { standard, default: defaultThumbnail } = response.snippet.thumbnails;
        const thumbnailUrl = (standard || defaultThumbnail)?.url || '';
        setThumbnail(thumbnailUrl);
      }
    })();
  }, [videoId]);

  return {
    title,
    thumbnail,
  };
};
