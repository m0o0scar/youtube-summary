import { FC } from 'react';

import { useYouTubeVideoCaptionSummary } from './useYouTubeVideoCaptionSummary';
import { YouTubeVideoContentSummary } from './YouTubeVideoContentSummary';

export interface YouTubeVideoCaptionSummaryProps {
  videoId?: string;
  title?: string;
  caption?: string;
  language?: string;
}

export const YouTubeVideoCaptionSummary: FC<YouTubeVideoCaptionSummaryProps> = ({
  videoId,
  title,
  caption,
  language,
}) => {
  const summary = useYouTubeVideoCaptionSummary(videoId, title, caption, language);
  return <YouTubeVideoContentSummary {...summary} />;
};
