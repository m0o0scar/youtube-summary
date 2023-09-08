import cls from 'classnames';
/* eslint-disable @next/next/no-img-element */
import { FC } from 'react';

export interface YouTubeVideoShareCardProps {
  url?: string;
  thumbnail?: string;
  title?: string;
  content?: string;
  model?: string;
  duration?: string;
}

export const YouTubeVideoShareCard: FC<YouTubeVideoShareCardProps> = ({
  url,
  thumbnail,
  title,
  content,
  model,
  duration,
}) => {
  const subtitle: string[] = [];
  if (duration) subtitle.push(duration);
  if (model) subtitle.push(`by ${model}`);

  const text = content?.replace(/^-\s+/gm, '').replace(/\n+/gm, '');

  return (
    <div
      className={cls(
        // basic
        'card overflow-hidden',

        // width
        'w-full sm:w-96',

        // height
        'h-full sm:h-auto sm:max-h-[800px]',

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
            <a href={url}>
              <h3 className="card-title !p-3">{title}</h3>
            </a>
            {subtitle.length && (
              <div className="px-3 text-xs text-slate-400 -mt-3">{subtitle.join(' / ')}</div>
            )}
          </>
        )}

        {/* {(title || content) && <hr className="dark:border-slate-700" />} */}

        {/* content */}
        {text && <p className="text-sm p-3 mb-4 overflow-y-auto">{text}</p>}
      </div>
    </div>
  );
};
