/* eslint-disable @next/next/no-img-element */
import { FC } from 'react';

export interface YouTubeVideoInfoProps {
  title?: string;
  thumbnail?: string;
  duration?: string;
  url?: string;
}

export const YouTubeVideoInfoCard: FC<YouTubeVideoInfoProps> = ({
  title,
  thumbnail,
  duration,
  url,
}) => {
  return (
    <div className="flex gap-4 flex-col sm:flex-row">
      {/* thumbnail */}
      {!thumbnail && <div className="w-full sm:w-60 rounded-lg aspect-video bg-slate-200" />}
      {thumbnail && (
        <img
          src={thumbnail}
          alt="thumbnail"
          className="m-0 w-full sm:w-60 rounded-lg aspect-video object-cover"
        />
      )}

      {/* info */}
      <div className="flex-1 flex flex-col gap-2">
        {/* title */}
        {!title && <span className="loading loading-spinner" />}
        {title && (
          <a href={url} target="_blank">
            <h3 className="m-0 sm:m-auto">{title}</h3>
          </a>
        )}

        {/* duration */}
        {duration && <div>{duration}</div>}
      </div>
    </div>
  );
};
