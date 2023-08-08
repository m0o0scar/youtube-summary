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
  return (
    <div className="flex flex-col gap-2">
      {/* title & subtitle */}
      <div className="flex gap-2 items-center">
        <h3>{title}</h3>
        {subtitle && <span className="text-xs text-slate-400">/ {subtitle}</span>}
      </div>

      {/* content */}
      {status === 'pending' && <span className="loading loading-spinner" />}
      {status !== 'pending' && (
        <div className="p-4 shadow-inner rounded-xl text-sm sm:text-base text-slate-600 bg-slate-100 dark:text-slate-300 dark:bg-slate-700 overflow-auto max-h-64">
          {status === 'empty' && emptyPlaceholder}
          {status === 'loaded' && typeof content === 'string' && content}
          {status === 'loaded' && isArray(content) && (
            <ol className="m-0">
              {content.map((item, i) => (
                <li key={i}>{item}</li>
              ))}
            </ol>
          )}
        </div>
      )}
    </div>
  );
};
