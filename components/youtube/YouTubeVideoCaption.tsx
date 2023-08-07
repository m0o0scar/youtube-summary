import { FC } from 'react';

import { formatTokens } from '@components/llm/utils';

export interface YouTubeVideoCaptionProps {
  caption?: string;
  language?: string;
  tokens?: number;
}

export const YouTubeVideoCaption: FC<YouTubeVideoCaptionProps> = ({
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
      {!caption && <span className="loading loading-spinner" />}
      {caption && (
        <div className="p-4 shadow-inner rounded-xl text-sm sm:text-base bg-slate-100 overflow-auto max-h-64">
          {caption}
        </div>
      )}
    </div>
  );
};
