import { FC } from 'react';

import { SupportedURL } from '@type';

import { useYouTubeVideoCaption } from './useYouTubeVideoCaption';
import { useYouTubeVideoInfo } from './useYouTubeVideoInfo';
import { YouTubeVideoCaption } from './YouTubeVideoCaption';
import { YouTubeVideoCaptionSummary } from './YouTubeVideoCaptionSummary';
import { YouTubeVideoInfoCard } from './YouTubeVideoInfo';

export interface YouTubeContentProps {
  source?: SupportedURL;
  language?: string;
}

export const YouTubeContent: FC<YouTubeContentProps> = ({ source, language }) => {
  const isYouTubeSource = source?.type === 'youtube';

  // video info
  const { title, thumbnail, duration } = useYouTubeVideoInfo(
    isYouTubeSource ? source.id : undefined,
  );

  // video caption
  const { captionStatus, caption, captionLanguage, captionTokens } = useYouTubeVideoCaption(
    isYouTubeSource ? source.id : undefined,
    language,
  );

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
          videoId={isYouTubeSource ? source.id : undefined}
          title={title}
          caption={caption}
          language={language}
        />
      )}
      <YouTubeVideoCaption
        captionStatus={captionStatus}
        caption={caption}
        language={captionLanguage}
        tokens={captionTokens}
      />
    </>
  );
};
