import { FC } from 'react';

import { useYouTubeVideoCommentsSummary } from './useYouTubeVideoCommentsSummary';
import { YouTubeVideoContentSummary } from './YouTubeVideoContentSummary';

export interface YouTubeVideoCommentsSummaryProps {
  videoId?: string;
  title?: string;
  comments?: string[];
  language?: string;
}

export const YouTubeVideoCommentsSummary: FC<YouTubeVideoCommentsSummaryProps> = ({
  videoId,
  title,
  comments,
  language,
}) => {
  const summary = useYouTubeVideoCommentsSummary(videoId, title, comments, language);
  return <YouTubeVideoContentSummary {...summary} />;
};
