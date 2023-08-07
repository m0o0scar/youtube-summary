/* eslint-disable @next/next/no-img-element */
import { FC } from 'react';

export interface YouTubeVideoInfoProps {
  title?: string;
  thumbnail?: string;
  url?: string;
}

export const YouTubeVideoInfoCard: FC<YouTubeVideoInfoProps> = ({ title, thumbnail, url }) => {
  if (!title || !url) return null;

  return (
    <div className="flex gap-4 flex-col sm:flex-row">
      {/* thumbnail */}
      {thumbnail && (
        <img src={thumbnail} alt="thumbnail" className="m-0 w-full sm:w-60 rounded-lg" />
      )}

      {/* title & url */}
      <div className="flex-1">
        <h3 className="m-0 sm:m-auto">{title}</h3>
        <a href={url} target="_blank" rel="noreferrer">
          {url}
        </a>
      </div>
    </div>
  );
};
