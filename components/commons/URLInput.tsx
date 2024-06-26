import { useSearchParams } from 'next/navigation';
import { FC, useEffect, useState } from 'react';

import { useSettings } from '@components/settings/useSettings';
import { getYouTubeVideoId } from '@components/youtube/utils';
import { SupportedURL } from '@type';

export interface URLInputProps extends ReturnType<typeof useSettings> {
  disabled?: boolean;
  onSupportedURLFound?: (url: SupportedURL) => void;
}

export const URLInput: FC<URLInputProps> = ({ language, disabled, onSupportedURLFound }) => {
  // user input value
  const [value, setValue] = useState('');

  // url from search params
  const searchParams = useSearchParams();

  // check if a given url is supported & valid
  const checkIfUrlIsSupportedAndValid = (url?: string) => {
    if (!url) return null;

    const youtubeId = getYouTubeVideoId(url);
    if (youtubeId) return { type: 'youtube', id: youtubeId, url };

    return null;
  };

  const onClickOnInput = async () => {
    // get content from clipboard
    const text = await navigator.clipboard.readText();
    if (checkIfUrlIsSupportedAndValid(text)) {
      setValue(text);
      onGoButtonClick(text);
    }
  };

  const onInputKeydown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    // if user press enter
    if (e.key === 'Enter') {
      onGoButtonClick();
    }
  };

  const onGoButtonClick = (newValue?: string) => {
    const url = newValue || value;
    if (!url) return;

    const youtubeId = getYouTubeVideoId(url);
    if (youtubeId) {
      onSupportedURLFound?.({ type: 'youtube', id: youtubeId, url });
      return;
    }
  };

  useEffect(() => {
    const urlFromSearchParams = searchParams.get('url') as string;
    if (checkIfUrlIsSupportedAndValid(urlFromSearchParams)) {
      setValue(urlFromSearchParams);
      value === '' && onGoButtonClick(urlFromSearchParams);
    }
  }, []);

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
          className="input input-sm sm:input-md input-bordered w-full"
          value={value}
          onChange={(e) => setValue(e.target.value)}
          onKeyDown={onInputKeydown}
          onClick={onClickOnInput}
        />
        <label className="label">
          <span className="label-text-alt">
            I will summarize this YouTube video in{' '}
            <b>{language === 'en' ? 'English' : 'Chinese'}</b>.
          </span>
        </label>
      </div>

      {/* submit button */}
      <button
        className="btn btn-sm sm:btn-md mb-8"
        disabled={disabled || !value}
        onClick={() => onGoButtonClick()}
      >
        Go
      </button>
    </div>
  );
};
