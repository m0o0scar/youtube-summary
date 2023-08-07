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
        switch (response.snippet.liveBroadcastContent) {
          case 'upcoming': {
            const startDate = dayjs(response.liveStreamingDetails.scheduledStartTime);
            setDuration(`Will go live on ${startDate.format('YYYY MMM DD HH:mm')}`);
            break;
          }

          default:
            setDuration(dayjs.duration(response.contentDetails.duration).format('HH:mm:ss'));
            break;
        }
      }
    })();
  }, [videoId]);

  return {
    title,
    thumbnail,
    duration,
  };
};
