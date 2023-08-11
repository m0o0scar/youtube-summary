import { FC } from 'react';

import { formatNumberShort } from '@components/utils/number';

import { ContentStatus } from './type';
import { YouTubeVideoContent } from './YouTubeVideoContent';

export interface YouTubeVideoCaptionProps {
  status?: ContentStatus;
  caption?: string;
  language?: string;
  tokens?: number;
}

export const YouTubeVideoCaption: FC<YouTubeVideoCaptionProps> = ({
  status,
  caption,
  language,
  tokens,
}) => {
  const subtitle = [];
  if (language) subtitle.push(language);
  if (tokens) subtitle.push(`${formatNumberShort(tokens, 1024)} tokens`);

  return (
    <YouTubeVideoContent
      title="Full Caption"
      status={status}
      subtitle={subtitle.join(', ')}
      content={caption}
      emptyPlaceholder="No caption"
    />
  );
};
