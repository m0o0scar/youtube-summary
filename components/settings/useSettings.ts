import { useEffect, useState } from 'react';

import { SupportedURL } from '@type';

const lsKey = 'settings';

export type Language = 'en' | 'zh-CN';

export const useSettings = (source?: SupportedURL) => {
  const [language, setLanguage] = useState<Language>('en');

  const changeLanguage = (lang: Language) => {
    setLanguage(lang);

    if (source?.url) location.href = `/?url=${encodeURIComponent(source.url)}`;
    else location.href = '/';
  };

  useEffect(() => {
    const values = JSON.parse(localStorage.getItem(lsKey) || '{}');
    setLanguage(values.language || 'en');
  }, []);

  useEffect(() => {
    localStorage.setItem(lsKey, JSON.stringify({ language }));
  }, [language]);

  return {
    language,
    changeLanguage,
  };
};
