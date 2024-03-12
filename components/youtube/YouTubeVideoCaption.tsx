import { FC } from 'react';
import { toast } from 'react-toastify';

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

  const copyCaption = async () => {
    if (caption) {
      await navigator.clipboard.writeText(caption);
      toast.success('Caption copied');
    }
  };

  return (
    <YouTubeVideoContent
      title="Full Caption"
      status={status}
      subtitle={subtitle.join(', ')}
      content={caption}
      emptyPlaceholder="No caption"
      extraActions={
        status === 'loaded' && (
          <button className="btn btn-circle btn-sm z-10" onClick={copyCaption}>
            📋
          </button>
        )
      }
    />
  );
};
