import { FC, useEffect, useState } from 'react';

import { Chat } from '@components/commons/Chat';
import { ShareHeader } from '@components/share/ShareHeader';

import { useChatYouTubeCaption } from './useChatYouTubeCaption';
import { useYouTubeVideoCaptionSummary } from './useYouTubeVideoCaptionSummary';
import { YouTubeVideoContentSummary } from './YouTubeVideoContentSummary';

export interface YouTubeVideoCaptionSummaryProps {
  videoId?: string;
  title?: string;
  thumbnail?: string;
  caption?: string;
  language?: string;
  shareParams?: URLSearchParams;
  onModelChange?: (value: string) => void;
  onSummaryChange?: (value: string, done: boolean) => void;
}

export const YouTubeVideoCaptionSummary: FC<YouTubeVideoCaptionSummaryProps> = ({
  videoId,
  title,
  thumbnail,
  caption,
  language,
  shareParams,
  onModelChange,
  onSummaryChange,
}) => {
  const { summary, model, done, ...others } = useYouTubeVideoCaptionSummary(
    videoId,
    title,
    caption,
    language,
  );

  const chat = useChatYouTubeCaption(videoId, title, caption);

  const [shareUrl, setShareUrl] = useState<string>('');

  const onShare = async () => {
    if (navigator.share!) {
      if (title) {
        await navigator.clipboard.writeText(title);
      }
      navigator.share({ title, url: shareUrl });
    } else {
      window.open(shareUrl, '_blank');
    }
  };

  useEffect(() => onSummaryChange?.(summary || '', done || false), [summary, done]);
  useEffect(() => onModelChange?.(model), [model]);

  useEffect(() => {
    const params = shareParams ? `?${shareParams.toString()}` : '';
    setShareUrl(`/share${params}`);
  }, [shareParams]);

  useEffect(() => {
    if (done && shareUrl && process.env.NODE_ENV !== 'development') {
      window.history.pushState(undefined, title!, shareUrl);
    }
  }, [done, title, shareUrl]);

  return (
    <>
      {done && <ShareHeader title={title} summary={summary} thumbnail={thumbnail} />}

      {/* chat */}
      {done && <Chat placeholder="Ask me anything about the caption" chatHook={chat} />}

      {/* summary */}
      <YouTubeVideoContentSummary
        summary={summary}
        model={model}
        done={done}
        {...others}
        extraActions={
          <>
            <button className="btn btn-circle btn-sm" onClick={others.copySummary}>
              📋
            </button>
            <button className="btn btn-circle btn-sm" onClick={onShare}>
              📥
            </button>
          </>
        }
      />
    </>
  );
};
