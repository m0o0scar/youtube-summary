import { useState } from 'react';

export const useTrigger = () => {
  const [value, setValue] = useState(0);
  const trigger = () => setValue((prev) => prev + 1);

  return { value, trigger };
};
