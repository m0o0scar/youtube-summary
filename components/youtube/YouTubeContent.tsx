import { FC, useEffect, useState } from 'react';

import { SupportedURL } from '@type';

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
  const { title, thumbnail, duration } = useYouTubeVideoInfo(videoId);

  // video caption
  const { captionStatus, caption, captionLanguage, captionTokens } = useYouTubeVideoCaption(
    videoId,
    language,
  );
  const [captionSummary, setCaptionSummary] = useState('');

  // video comments
  const { commentsStatus, comments, commentsTokens } = useYouTubeVideoComments(videoId);

  const [shareParams, setShareParams] = useState<URLSearchParams | undefined>(undefined);

  useEffect(() => {
    const params = new URLSearchParams();
    source?.url && params.set('u', source.url);
    thumbnail && params.set('p', thumbnail);
    title && params.set('t', title);
    captionSummary && params.set('c', captionSummary);
    duration && params.set('d', duration);
    setShareParams(params);
  }, [source, thumbnail, title, captionSummary, duration]);

  if (!source || source.type !== 'youtube') return null;

  return (
    <>
      {/* info */}
      <YouTubeVideoInfoCard
        title={title}
        url={isYouTubeSource ? source.url : ''}
        thumbnail={thumbnail}
        duration={duration}
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
