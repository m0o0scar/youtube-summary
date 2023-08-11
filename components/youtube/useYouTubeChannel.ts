import { useEffect, useState } from 'react';

import { fetchYouTubeChannelInfo } from './api';
import { YouTubeChannel, YouTubeChannelListResponse } from './type';

export const useYouTubeChannel = (channelId?: string) => {
  const [channel, setChannel] = useState<YouTubeChannel | null>(null);

  const reset = () => {
    setChannel(null);
  };

  useEffect(() => {
    (async () => {
      reset();

      if (channelId) {
        const response = (await fetchYouTubeChannelInfo(channelId)) as YouTubeChannelListResponse;
        setChannel(response.items[0]);
      }
    })();
  }, [channelId]);

  return {
    channel,
  };
};
