import { useEffect, useState } from 'react';

import { countTokensOfText } from '@components/llm/providers/openai';

import { fetchYouTubeVideoCaption, fetchYouTubeVideoCaptionLanguages } from './api';
import { ContentStatus } from './type';

export const useYouTubeVideoCaption = (videoId?: string, preferredLanguage: string = 'en') => {
  const [status, setStatus] = useState<ContentStatus>('pending');
  const [caption, setCaption] = useState('');
  const [captionLanguage, setCaptionLanguage] = useState('');
  const [captionTokens, setCaptionTokens] = useState(0);

  useEffect(() => {
    setStatus('pending');
    setCaption('');
    setCaptionLanguage('');
    setCaptionTokens(0);

    (async () => {
      if (videoId) {
        const { english, chinese, languages } = await fetchYouTubeVideoCaptionLanguages(videoId);

        let language = languages[0] || '';
        if (preferredLanguage.startsWith('en') && english !== undefined) language = english;
        if (preferredLanguage.startsWith('zh') && chinese !== undefined) language = chinese;

        if (language) {
          const text = await fetchYouTubeVideoCaption(videoId, language);
          setCaption(text);
          setCaptionLanguage(language);
          setCaptionTokens(countTokensOfText(text));
          setStatus('loaded');
        } else {
          setStatus('empty');
        }
      }
    })();
  }, [videoId, preferredLanguage]);

  return {
    captionStatus: status,
    caption,
    captionLanguage,
    captionTokens,
  };
};
