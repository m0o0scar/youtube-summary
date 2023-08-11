/* eslint-disable @next/next/no-img-element */
import { FC } from 'react';

import { formatNumberShort } from '@components/utils/number';

import { YouTubeChannel } from './type';

export interface YouTubeChannelProps {
  channel: YouTubeChannel;
}

export const YouTubeChannelInfo: FC<YouTubeChannelProps> = ({ channel }) => {
  const {
    snippet: {
      customUrl,
      thumbnails: {
        default: { url: defaultThumbnail },
      },
    },
    statistics: { subscriberCount },
  } = channel;

  return (
    <div className="flex items-center gap-2">
      {/* avatar */}
      <div className="not-prose avatar">
        <div className="w-6 rounded-xl">
          <img src={defaultThumbnail} alt="channel avatar" referrerPolicy="no-referrer" />
        </div>
      </div>

      <a className="no-underline" href={`https://www.youtube.com/${customUrl}`} target="_blank">
        <div className="text-sm">{channel.snippet.title}</div>
      </a>
      <div className="text-xs text-slate-400">
        {formatNumberShort(parseInt(subscriberCount))} subscribers
      </div>
    </div>
  );
};
