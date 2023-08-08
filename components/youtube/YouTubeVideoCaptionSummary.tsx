import { FC, useEffect } from 'react';

import { ShareIcon } from '@heroicons/react/24/solid';

import { useYouTubeVideoCaptionSummary } from './useYouTubeVideoCaptionSummary';
import { YouTubeVideoContentSummary } from './YouTubeVideoContentSummary';

export interface YouTubeVideoCaptionSummaryProps {
  videoId?: string;
  title?: string;
  caption?: string;
  language?: string;
  onSummaryChange?: (value: string) => void;
  onShare?: () => void;
}

export const YouTubeVideoCaptionSummary: FC<YouTubeVideoCaptionSummaryProps> = ({
  videoId,
  title,
  caption,
  language,
  onSummaryChange,
  onShare,
}) => {
  const { summary, ...others } = useYouTubeVideoCaptionSummary(videoId, title, caption, language);

  useEffect(() => {
    onSummaryChange?.(summary);
  }, [summary]);

  return (
    <YouTubeVideoContentSummary
      summary={summary}
      {...others}
      extraActions={
        <button className="btn btn-circle btn-xs" onClick={onShare}>
          <ShareIcon className="w-1/2 h-1/2" />
        </button>
      }
    />
  );
};
