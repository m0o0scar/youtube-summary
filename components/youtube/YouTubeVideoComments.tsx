import { FC } from 'react';

import { formatTokens } from '@components/llm/utils';

import { CommentsStatus } from './useYouTubeVideoComments';

export interface YouTubeVideoCommentsProps {
  commentsStatus?: CommentsStatus;
  comments?: string[];
  tokens?: number;
}

export const YouTubeVideoComments: FC<YouTubeVideoCommentsProps> = ({
  commentsStatus,
  comments = [],
  tokens = 0,
}) => {
  const subtitle = [];
  if (comments.length) subtitle.push(`${comments.length} comments`);
  if (tokens) subtitle.push(`${formatTokens(tokens)} tokens`);

  return (
    <div className="flex flex-col gap-2">
      <div className="flex gap-2 items-center">
        <h3>Comments</h3>
        {tokens > 0 && <span className="text-xs text-slate-400">/ {subtitle.join(', ')}</span>}
      </div>

      {/* caption content */}
      {commentsStatus === 'pending' && <span className="loading loading-spinner" />}
      {commentsStatus !== 'pending' && (
        <div className="p-4 shadow-inner rounded-xl text-sm sm:text-base bg-slate-100 overflow-auto max-h-64">
          {commentsStatus === 'noComments' && 'No comment'}
          {commentsStatus === 'loaded' && (
            <ol className="m-0">
              {comments.map((comment, i) => (
                <li key={i}>{comment}</li>
              ))}
            </ol>
          )}
        </div>
      )}
    </div>
  );
};
