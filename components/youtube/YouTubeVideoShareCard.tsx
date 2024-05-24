/* eslint-disable @next/next/no-img-element */
import cls from 'classnames';
import { FC } from 'react';

import { Markdown } from '@components/commons/Markdown';

export interface YouTubeVideoShareCardProps {
  url?: string;
  thumbnail?: string;
  title?: string;
  content?: string;
  duration?: string;
}

export const YouTubeVideoShareCard: FC<YouTubeVideoShareCardProps> = ({
  url,
  thumbnail,
  title,
  content,
  duration,
}) => {
  const subtitle: string[] = [];
  if (duration) subtitle.push(duration);

  const onChatBtnClicked = () => {
    if (url) location.href = `/?url=${encodeURIComponent(url)}`;
  };

  return (
    <div
      className={cls(
        // basic
        'card overflow-hidden',

        // width
        'w-full sm:w-96',

        // height
        'h-full sm:h-auto sm:max-h-[800px] overflow-y-auto z-0',

        // margin
        'm-0 sm:m-5',

        // background and border
        'bg-base-100 dark:border-2 dark:border-slate-700',

        // rounded border
        'rounded-none sm:rounded-2xl',

        // shadow
        'shadow-none sm:shadow-xl',
      )}
    >
      {/* thumbnail */}
      {thumbnail && (
        <a href={url}>
          <img
            className="aspect-video object-cover w-full"
            src={thumbnail}
            alt="Thumbnail"
            referrerPolicy="no-referrer"
          />
        </a>
      )}

      <div className="card-body p-0 min-h-0">
        {/* title */}
        {title && (
          <>
            <a className="sticky top-0 backdrop-blur border-b dark:border-gray-700" href={url}>
              <h3 className="card-title !p-3">{title}</h3>
            </a>
            {subtitle.length && (
              <div className="px-3 text-xs text-slate-400">{subtitle.join(' / ')}</div>
            )}
          </>
        )}

        {/* content */}
        <div className="prose px-4 py-0 rounded-xl text-sm text-slate-800 dark:text-slate-100 whitespace-pre-wrap">
          {content && <Markdown>{content}</Markdown>}
        </div>

        <div className="flex flex-row gap-2 p-4 pt-0 justify-end">
          {url && (
            <button className="btn btn-sm btn-square" onClick={onChatBtnClicked}>
              💬
            </button>
          )}
        </div>
      </div>
    </div>
  );
};
