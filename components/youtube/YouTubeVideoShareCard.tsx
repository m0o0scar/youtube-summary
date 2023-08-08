/* eslint-disable @next/next/no-img-element */
import { FC } from 'react';

export interface YouTubeVideoShareCardProps {
  url?: string;
  thumbnail?: string;
  title?: string;
  content?: string;
  model?: string;
  duration?: string;
}

export const YouTubeVideoShareCard: FC<YouTubeVideoShareCardProps> = ({
  url,
  thumbnail,
  title,
  content,
  model,
  duration,
}) => {
  return (
    <div className="card w-full sm:w-96 h-full sm:h-auto sm:max-h-[800px] rounded-none sm:rounded-2xl shadow-none sm:shadow-xl bg-base-100 overflow-hidden sm:border-2 border-white dark:border-slate-700">
      {/* thumbnail */}
      {thumbnail && (
        <a href={url} target="_blank">
          <img className="aspect-video object-cover" src={thumbnail} alt="Thumbnail" />
        </a>
      )}

      <div className="card-body p-0 min-h-0">
        {/* title */}
        {title && (
          <>
            <a href={url} target="_blank">
              <h3 className="card-title !p-3">{title}</h3>
            </a>
            {duration && <div className="px-3 text-xs text-slate-400 -mt-3">{duration}</div>}
          </>
        )}

        {(title || content) && <hr className="dark:border-slate-700" />}

        {/* content */}
        {content && <p className="whitespace-pre-wrap text-sm p-3 overflow-y-auto">{content}</p>}

        {/* model */}
        {model && <p className="text-xs text-slate-400 px-3 mb-4">By {model}</p>}
      </div>
    </div>
  );
};
