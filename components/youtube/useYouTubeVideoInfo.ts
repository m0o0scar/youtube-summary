import dayjs from 'dayjs';
import duration from 'dayjs/plugin/duration';
import { useEffect, useState } from 'react';

import { fetchYouTubeVideoInfo } from './api';

dayjs.extend(duration);

export const useYouTubeVideoInfo = (videoId?: string) => {
  const [title, setTitle] = useState('');
  const [thumbnail, setThumbnail] = useState('');
  const [duration, setDuration] = useState('');

  useEffect(() => {
    setTitle('');
    setThumbnail('');
    setDuration('');

    (async () => {
      if (videoId) {
        const response = (await fetchYouTubeVideoInfo(videoId))!;

        // title
        setTitle(response.snippet.title);

        // thumbnail
        const { standard, default: defaultThumbnail } = response.snippet.thumbnails;
        const thumbnailUrl = (standard || defaultThumbnail)?.url || '';
        setThumbnail(thumbnailUrl);

        // duration
        setDuration(dayjs.duration(response.contentDetails.duration).format('HH:mm:ss'));
      }
    })();
  }, [videoId]);

  return {
    title,
    thumbnail,
    duration,
  };
};
