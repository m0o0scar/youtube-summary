import { FC, useEffect, useState } from 'react';

import { ShareIcon } from '@heroicons/react/24/solid';

import { useYouTubeVideoCaptionSummary } from './useYouTubeVideoCaptionSummary';
import { YouTubeVideoContentSummary } from './YouTubeVideoContentSummary';

export interface YouTubeVideoCaptionSummaryProps {
  videoId?: string;
  title?: string;
  caption?: string;
  language?: string;
  shareParams?: URLSearchParams;
  onSummaryChange?: (value: string) => void;
}

export const YouTubeVideoCaptionSummary: FC<YouTubeVideoCaptionSummaryProps> = ({
  videoId,
  title,
  caption,
  language,
  shareParams,
  onSummaryChange,
}) => {
  const { summary, ...others } = useYouTubeVideoCaptionSummary(videoId, title, caption, language);
  const [shareUrl, setShareUrl] = useState<string>('');

  useEffect(() => {
    onSummaryChange?.(summary);
  }, [summary]);

  useEffect(() => {
    const params = shareParams ? `?${shareParams.toString()}` : '';
    setShareUrl(`/share${params}`);
  }, [shareParams]);

  return (
    <YouTubeVideoContentSummary
      summary={summary}
      {...others}
      extraActions={
        <a className="btn btn-circle btn-xs" href={shareUrl} target="_blank">
          <ShareIcon className="w-1/2 h-1/2" />
        </a>
      }
    />
  );
};
