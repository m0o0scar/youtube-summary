import { useEffect, useState } from 'react';

import { countTokensOfText } from '@components/llm/providers/openai';

import { fetchYouTubeVideoCaption, fetchYouTubeVideoCaptionLanguages } from './api';

export const useYouTubeVideoCaption = (videoId?: string, preferredLanguage: string = 'en') => {
  const [caption, setCaption] = useState('');
  const [captionLanguage, setCaptionLanguage] = useState('');
  const [captionTokens, setCaptionTokens] = useState(0);

  useEffect(() => {
    setCaption('');
    setCaptionLanguage('');
    setCaptionTokens(0);

    (async () => {
      if (videoId) {
        const { english, chinese, languages } = await fetchYouTubeVideoCaptionLanguages(videoId);

        let language = languages[0];
        if (preferredLanguage.startsWith('en') && english !== undefined) language = english;
        if (preferredLanguage.startsWith('zh') && chinese !== undefined) language = chinese;

        if (language) {
          const text = await fetchYouTubeVideoCaption(videoId, language);
          setCaption(text);
          setCaptionLanguage(language);
          setCaptionTokens(countTokensOfText(text));
        }
      }
    })();
  }, [videoId, preferredLanguage]);

  return {
    caption,
    captionLanguage,
    captionTokens,
  };
};
