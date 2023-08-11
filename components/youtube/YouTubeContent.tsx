import { FC, useEffect, useState } from 'react';

import { SupportedURL } from '@type';

import { useYouTubeChannel } from './useYouTubeChannel';
import { useYouTubeVideoCaption } from './useYouTubeVideoCaption';
import { useYouTubeVideoComments } from './useYouTubeVideoComments';
import { useYouTubeVideoInfo } from './useYouTubeVideoInfo';
import { YouTubeVideoCaption } from './YouTubeVideoCaption';
import { YouTubeVideoCaptionSummary } from './YouTubeVideoCaptionSummary';
import { YouTubeVideoComments } from './YouTubeVideoComments';
import { YouTubeVideoCommentsSummary } from './YouTubeVideoCommentsSummary';
import { YouTubeVideoInfoCard } from './YouTubeVideoInfo';

export interface YouTubeContentProps {
  source?: SupportedURL;
  language?: string;
}

export const YouTubeContent: FC<YouTubeContentProps> = ({ source, language }) => {
  const isYouTubeSource = source?.type === 'youtube';
  const videoId = isYouTubeSource ? source.id : undefined;

  // video info
  const { channelId, title, thumbnail, duration, ...otherInfo } = useYouTubeVideoInfo(videoId);

  // channel info
  const { channel } = useYouTubeChannel(channelId);

  // video caption
  const { captionStatus, caption, captionLanguage, captionTokens } = useYouTubeVideoCaption(
    videoId,
    language,
  );
  const [captionSummary, setCaptionSummary] = useState('');
  const [captionModel, setCaptionModel] = useState('');

  // video comments
  const { commentsStatus, comments, commentsTokens } = useYouTubeVideoComments(videoId);

  const [shareParams, setShareParams] = useState<URLSearchParams | undefined>(undefined);

  useEffect(() => {
    const items: [string, string?][] = [
      ['u', source?.url],
      ['p', thumbnail],
      ['t', title],
      ['c', captionSummary],
      ['m', captionModel],
      ['d', duration],
    ];

    const params = new URLSearchParams();
    for (const [key, value] of items) {
      if (value) params.set(key, encodeURIComponent(value));
    }
    setShareParams(params);
  }, [source, thumbnail, title, captionSummary, captionModel, duration]);

  if (!source || source.type !== 'youtube') return null;

  return (
    <>
      {/* info */}
      <YouTubeVideoInfoCard
        url={isYouTubeSource ? source.url : ''}
        channel={channel}
        title={title}
        thumbnail={thumbnail}
        duration={duration}
        {...otherInfo}
      />

      {/* caption */}
      <h2 className="!mt-4">Caption</h2>
      {captionStatus === 'loaded' && (
        <YouTubeVideoCaptionSummary
          videoId={videoId}
          title={title}
          caption={caption}
          language={language}
          shareParams={shareParams}
          onSummaryChange={setCaptionSummary}
          onModelChange={setCaptionModel}
        />
      )}
      <YouTubeVideoCaption
        status={captionStatus}
        caption={caption}
        language={captionLanguage}
        tokens={captionTokens}
      />

      {/* comments */}
      <h2 className="!mt-4">Comments</h2>
      {commentsStatus === 'loaded' && (
        <YouTubeVideoCommentsSummary
          videoId={videoId}
          title={title}
          comments={comments}
          language={language}
        />
      )}
      <YouTubeVideoComments status={commentsStatus} comments={comments} tokens={commentsTokens} />
    </>
  );
};
