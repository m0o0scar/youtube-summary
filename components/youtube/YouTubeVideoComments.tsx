import { FC } from 'react';

import { formatTokens } from '@components/llm/utils';

import { ContentStatus } from './type';
import { YouTubeVideoContent } from './YouTubeVideoContent';

export interface YouTubeVideoCommentsProps {
  status?: ContentStatus;
  comments?: string[];
  tokens?: number;
}

export const YouTubeVideoComments: FC<YouTubeVideoCommentsProps> = ({
  status,
  comments = [],
  tokens = 0,
}) => {
  const subtitle = [];
  if (comments.length) subtitle.push(`${comments.length} comments`);
  if (tokens) subtitle.push(`${formatTokens(tokens)} tokens`);

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
