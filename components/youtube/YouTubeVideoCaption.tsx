import { FC } from 'react';

import { formatTokens } from '@components/llm/utils';

import { CaptionStatus } from './useYouTubeVideoCaption';

export interface YouTubeVideoCaptionProps {
  captionStatus?: CaptionStatus;
  caption?: string;
  language?: string;
  tokens?: number;
}

export const YouTubeVideoCaption: FC<YouTubeVideoCaptionProps> = ({
  captionStatus,
  caption,
  language,
  tokens,
}) => {
  const subtitle = [];
  if (language) subtitle.push(language);
  if (tokens) subtitle.push(`${formatTokens(tokens)} tokens`);

  return (
    <div className="flex flex-col gap-2">
      <div className="flex gap-2 items-center">
        <h3>Full Caption</h3>
        {subtitle.length > 0 && (
          <span className="text-xs text-slate-400">/ {subtitle.join(', ')}</span>
        )}
      </div>

      {/* caption content */}
      {captionStatus === 'pending' && <span className="loading loading-spinner" />}
      {captionStatus !== 'pending' && (
        <div className="p-4 shadow-inner rounded-xl text-sm sm:text-base bg-slate-100 overflow-auto max-h-64">
          {captionStatus === 'loaded' && caption}
          {captionStatus === 'noCaption' && 'No caption available'}
        </div>
      )}
    </div>
  );
};
