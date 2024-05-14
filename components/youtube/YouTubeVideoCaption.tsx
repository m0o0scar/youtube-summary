import { FC } from 'react';
import { toast } from 'react-toastify';

import { ContentStatus } from './type';
import { YouTubeVideoContent } from './YouTubeVideoContent';

export interface YouTubeVideoCaptionProps {
  status?: ContentStatus;
  caption?: string;
  language?: string;
}

export const YouTubeVideoCaption: FC<YouTubeVideoCaptionProps> = ({
  status,
  caption,
  language,
}) => {
  const subtitle = [];
  if (language) subtitle.push(language);

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
