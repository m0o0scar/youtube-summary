import { useSearchParams } from 'next/navigation';
import { FC, useEffect, useState } from 'react';

import { getYoutubeVideoId } from '@components/youtube/utils';
import { SupportedURL } from '@type';

export interface URLInputProps {
  disabled?: boolean;
  onSupportedURLFound?: (url: SupportedURL) => void;
}

export const URLInput: FC<URLInputProps> = ({ disabled, onSupportedURLFound }) => {
  // user input value
  const [value, setValue] = useState('');

  // url from search params
  const searchParams = useSearchParams();
  const urlFromSearchParams = searchParams.get('url') as string;

  // check if a given url is supported & valid
  const checkIfUrlIsSupportedAndValid = (url?: string) => {
    if (!url) return null;

    const youtubeId = getYoutubeVideoId(url);
    if (youtubeId) return { type: 'youtube', id: youtubeId, url };

    return null;
  };

  const onClickOnInput = async () => {
    // get content from clipboard
    const text = await navigator.clipboard.readText();
    if (checkIfUrlIsSupportedAndValid(text)) {
      setValue(text);
    }
  };

  const onGoButtonClick = (newValue?: string) => {
    if (!value && !newValue) return;

    const url = (value || newValue)!;
    const youtubeId = getYoutubeVideoId(url);
    if (youtubeId) {
      onSupportedURLFound?.({ type: 'youtube', id: youtubeId, url });
      return;
    }
  };

  useEffect(() => {
    if (checkIfUrlIsSupportedAndValid(urlFromSearchParams)) {
      setValue(urlFromSearchParams);
      value === '' && onGoButtonClick(urlFromSearchParams);
    }
  }, [urlFromSearchParams]);

  return (
    <div className="flex gap-2 items-end">
      {/* URL input */}
      <div className="form-control flex-1">
        <label className="label">
          <span className="label-text">Type/paste in the URL here</span>
        </label>
        <input
          type="text"
          disabled={disabled}
          placeholder="URL"
          className="input input-bordered w-full"
          value={value}
          onChange={(e) => setValue(e.target.value)}
          onClick={onClickOnInput}
        />
      </div>

      {/* submit button */}
      <button className="btn" disabled={disabled || !value} onClick={onGoButtonClick}>
        Go
      </button>
    </div>
  );
};
