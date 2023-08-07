import { useEffect, useState } from 'react';

const lsKey = 'settings';

export const useSettings = () => {
  const [language, setLanguage] = useState('en');

  useEffect(() => {
    const values = JSON.parse(localStorage.getItem(lsKey) || '{}');
    setLanguage(values.language || 'en');
  }, []);

  useEffect(() => {
    localStorage.setItem(lsKey, JSON.stringify({ language }));
  }, [language]);

  return {
    language,
    setLanguage,
  };
};
