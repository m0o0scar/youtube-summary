import { FC } from 'react';

import { ArrowPathIcon } from '@heroicons/react/24/solid';

import { useYouTubeVideoCaptionSummary } from './useYouTubeVideoCaptionSummary';

export interface YouTubeVideoCaptionProps {
  videoId?: string;
  title?: string;
  caption?: string;
  language?: string;
}

export const YouTubeVideoCaptionSummary: FC<YouTubeVideoCaptionProps> = ({
  videoId,
  title,
  caption,
  language,
}) => {
  const { model, summary, error, reload } = useYouTubeVideoCaptionSummary(
    videoId,
    title,
    caption,
    language,
  );

  return (
    <div className="flex flex-col gap-2">
      <div className="flex gap-2 items-center">
        <h3>Summary</h3>
        {model && <span className="text-xs text-slate-400">/ {model}</span>}

        <div className="flex-1" />
        <button className="btn btn-circle btn-xs" onClick={reload}>
          <ArrowPathIcon className="w-1/2 h-1/2" />
        </button>
      </div>

      {!error && (
        <>
          {/* caption content */}
          {!summary && <span className="loading loading-spinner" />}
          {summary && (
            <div className="p-4 rounded-xl text-sm sm:text-base bg-teal-200 whitespace-pre-wrap">
              {summary}
            </div>
          )}
        </>
      )}

      {error !== null && (
        <div className="p-4 rounded-lg text-lg font-bold text-white bg-red-400">
          {String(error)}
        </div>
      )}
    </div>
  );
};
