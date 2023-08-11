/* eslint-disable @next/next/no-img-element */
import { FC } from 'react';

import { formatNumberShort, percentage } from '@components/utils/number';

import { YouTubeChannel } from './type';
import { useYouTubeVideoInfo } from './useYouTubeVideoInfo';
import { YouTubeChannelInfo } from './YouTubeChannelInfo';

export interface YouTubeVideoInfoProps extends Partial<ReturnType<typeof useYouTubeVideoInfo>> {
  url?: string;
  channel?: YouTubeChannel | null;
}

export const YouTubeVideoInfoCard: FC<YouTubeVideoInfoProps> = ({
  url,
  channel,
  title,
  thumbnail,
  duration,
  likeCount,
  viewCount,
  commentCount,
}) => {
  const subtitle = [];
  if (duration) subtitle.push(`🕚 ${duration}`);
  if (viewCount) subtitle.push(`👁 ${formatNumberShort(viewCount)}`);
  if (likeCount) subtitle.push(`👍 ${formatNumberShort(likeCount)}`);
  if (commentCount) subtitle.push(`💬 ${formatNumberShort(commentCount)}`);

  return (
    <div className="flex flex-col sm:flex-row gap-4 items-start">
      {/* thumbnail */}
      {!thumbnail && <div className="w-full sm:w-60 rounded-lg aspect-video bg-slate-200" />}
      {thumbnail && (
        <img
          src={thumbnail}
          alt="thumbnail"
          className="m-0 w-full sm:w-60 rounded-lg aspect-video object-cover"
          referrerPolicy="no-referrer"
        />
      )}

      {/* info */}
      <div className="flex-1 flex flex-col gap-2">
        {/* title */}
        {!title && <span className="loading loading-spinner" />}
        {title && (
          <a className="no-underline line-clamp-2" href={url} target="_blank">
            <div className="text-lg sm:text-xl">{title}</div>
          </a>
        )}

        {subtitle.length && <div className="text-sm">{subtitle.join(', ')}</div>}
        {subtitle.length && channel && <hr className="m-1" />}
        {channel && <YouTubeChannelInfo channel={channel} />}
      </div>
    </div>
  );
};
