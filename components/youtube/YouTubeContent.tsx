import { FC } from 'react';

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

  // video comments
  const { commentsStatus, comments, commentsTokens } = useYouTubeVideoComments(videoId);

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
