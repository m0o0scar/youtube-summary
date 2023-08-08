import { isArray } from 'lodash';
import { FC } from 'react';

import { ContentStatus } from './type';

export interface YouTubeVideoContentProps {
  title: string;
  subtitle?: string;
  status?: ContentStatus;
  content?: string | string[];
  emptyPlaceholder?: string;
}

export const YouTubeVideoContent: FC<YouTubeVideoContentProps> = ({
  title,
  subtitle,
  status,
  content,
  emptyPlaceholder = null,
}) => {
  if (status === 'empty') return emptyPlaceholder;

  return (
    <div className="collapse bg-base-200 dark:bg-slate-700">
      <input type="checkbox" />
      <div className="collapse-title">
        <div className="flex gap-2 items-center">
          <h3>
            {title}{' '}
            {status === 'pending' && <span className="loading loading-spinner loading-xs" />}
          </h3>
          {subtitle && <span className="text-xs text-slate-400">/ {subtitle}</span>}
        </div>
      </div>
      <div className="collapse-content">
        {/* content */}
        {status === 'pending' && <span className="loading loading-spinner" />}
        {status !== 'pending' && (
          <div className="text-sm text-slate-600 dark:text-slate-300 overflow-auto max-h-64">
            {status === 'loaded' && typeof content === 'string' && content}
            {status === 'loaded' && isArray(content) && (
              <ol className="m-0 pl-8">
                {content.map((item, i) => (
                  <li key={i}>{item}</li>
                ))}
              </ol>
            )}
          </div>
        )}
      </div>
    </div>
  );
};
