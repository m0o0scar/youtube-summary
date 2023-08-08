import dayjs from 'dayjs';
import dayjsDuration from 'dayjs/plugin/duration';
import { FC } from 'react';

import { useSummary } from '@components/commons/useSummary';
import { ArrowPathIcon } from '@heroicons/react/24/solid';

dayjs.extend(dayjsDuration);

export interface YouTubeVideoContentSummaryProps extends ReturnType<typeof useSummary> {
  extraActions?: React.ReactNode;
}

export const YouTubeVideoContentSummary: FC<YouTubeVideoContentSummaryProps> = ({
  model,
  summary,
  duration,
  error,
  done,
  regen,
  extraActions,
}) => {
  const subtitle: string[] = [];
  if (model) subtitle.push(`by ${model}`);
  if (duration) subtitle.push(`in ${dayjs.duration(duration).format('mm:ss')}`);

  return (
    <div className="flex flex-col gap-2">
      {/* title, subtitle, and re-gen button */}
      <div className="flex gap-2 items-center">
        {/* title */}
        <h3>Summary</h3>

        {/* subtitle */}
        {subtitle.length > 0 && (
          <span className="text-xs text-slate-400">/ {subtitle.join(' ')}</span>
        )}

        {/* re-gen button */}
        <div className="flex-1" />
        {done && (
          <div className="flex gap-2">
            <button className="btn btn-circle btn-xs" onClick={regen}>
              <ArrowPathIcon className="w-1/2 h-1/2" />
            </button>
            {extraActions}
          </div>
        )}
      </div>

      {/* summary */}
      {!error && (
        <>
          {!summary && <span className="loading loading-spinner" />}
          {summary && (
            <div className="p-4 rounded-xl text-sm sm:text-base text-slate-800 bg-teal-200 dark:text-slate-100 dark:bg-teal-700 whitespace-pre-wrap">
              {summary}
            </div>
          )}
        </>
      )}

      {/* error */}
      {error !== null && (
        <div className="p-4 rounded-lg text-lg font-bold text-white bg-red-400">
          {String(error)}
        </div>
      )}
    </div>
  );
};