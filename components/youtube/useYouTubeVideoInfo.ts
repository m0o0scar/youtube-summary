import dayjs from 'dayjs';
import dayjsDuration from 'dayjs/plugin/duration';
import { useEffect, useState } from 'react';

import { fetchYouTubeVideoInfo } from './api';

dayjs.extend(dayjsDuration);

export const useYouTubeVideoInfo = (videoId?: string) => {
  const [title, setTitle] = useState('');
  const [thumbnail, setThumbnail] = useState('');
  const [duration, setDuration] = useState('');

  const [viewCount, setViewCount] = useState(0);
  const [likeCount, setLikeCount] = useState(0);
  const [dislikeCount, setDislikeCount] = useState(0);
  const [commentCount, setCommentCount] = useState(0);

  const [channel, setChannel] = useState('');

  const reset = () => {
    setTitle('');
    setThumbnail('');
    setDuration('');
    setViewCount(0);
    setLikeCount(0);
    setDislikeCount(0);
    setCommentCount(0);
    setChannel('');
  };

  useEffect(() => {
    reset();

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

        // other info
        setViewCount(parseInt(response.statistics.viewCount) || 0);
        setLikeCount(parseInt(response.statistics.likeCount) || 0);
        setDislikeCount(parseInt(response.statistics.dislikeCount) || 0);
        setCommentCount(parseInt(response.statistics.commentCount) || 0);

        // channel
        setChannel(response.snippet.channelId);
      }
    })();
  }, [videoId]);

  return {
    title,
    thumbnail,
    duration,

    viewCount,
    likeCount,
    dislikeCount,
    commentCount,

    channel,
  };
};
