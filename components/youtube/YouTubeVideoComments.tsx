import { FC } from 'react';

import { ContentStatus } from './type';
import { YouTubeVideoContent } from './YouTubeVideoContent';

export interface YouTubeVideoCommentsProps {
  status?: ContentStatus;
  comments?: string[];
}

export const YouTubeVideoComments: FC<YouTubeVideoCommentsProps> = ({ status, comments = [] }) => {
  const subtitle = [];
  if (comments.length) subtitle.push(`${comments.length} comments`);

  return (
    <YouTubeVideoContent
      title="Comments"
      status={status}
      subtitle={subtitle.join(', ')}
      content={comments}
      emptyPlaceholder="No comments"
    />
  );
};
