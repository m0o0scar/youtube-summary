/* eslint-disable @next/next/no-img-element */
import { FC } from 'react';

import { formatNumberShort, percentage } from '@components/utils/number';

import { useYouTubeVideoInfo } from './useYouTubeVideoInfo';

export interface YouTubeVideoInfoProps extends Partial<ReturnType<typeof useYouTubeVideoInfo>> {
  url?: string;
}

export const YouTubeVideoInfoCard: FC<YouTubeVideoInfoProps> = ({
  url,
  title,
  thumbnail,
  duration,
  likeCount,
  viewCount,
  commentCount,
}) => {
  const counts = [];
  if (viewCount) counts.push(`👁 ${formatNumberShort(viewCount)}`);
  if (likeCount) counts.push(`👍 ${formatNumberShort(likeCount)}`);
  if (commentCount) counts.push(`💬 ${formatNumberShort(commentCount)}`);

  return (
    <div className="flex gap-4 items-start">
      {/* thumbnail */}
      {!thumbnail && <div className="w-36 sm:w-60 rounded-lg aspect-video bg-slate-200" />}
      {thumbnail && (
        <img
          src={thumbnail}
          alt="thumbnail"
          className="m-0 w-36 sm:w-60 rounded-lg aspect-video object-cover"
        />
      )}

      {/* info */}
      <div className="flex-1 flex flex-col gap-1">
        {/* title */}
        {!title && <span className="loading loading-spinner" />}
        {title && (
          <a href={url} target="_blank">
            <h3 className="hidden sm:block">{title}</h3>
            <div className="text-sm sm:hidden">{title}</div>
          </a>
        )}

        {counts.length && <div className="text-xs sm:text-sm">{counts.join(', ')}</div>}
        {duration && <div className="text-xs sm:text-sm">{duration}</div>}
      </div>
    </div>
  );
};
