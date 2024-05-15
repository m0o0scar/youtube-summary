import { fromMarkdown } from 'mdast-util-from-markdown';
import { toString } from 'mdast-util-to-string';
import { FC } from 'react';

import { Header } from '@components/commons/Header';

export interface ShareHeaderProps {
  title?: string;
  summary?: string;
  thumbnail?: string;
}

export const ShareHeader: FC<ShareHeaderProps> = ({ title, summary, thumbnail }) => {
  // remove markdown formats from description
  const description = summary ? toString(fromMarkdown(summary)) : '';

  const shareTitle = title || 'YouTube Summary';

  return (
    <Header
      title={shareTitle}
      description={description}
      extra={
        <>
          {/* Open Graph */}
          <meta property="og:title" content={shareTitle} />
          <meta property="og:description" content={description} />
          <meta property="og:image" content={thumbnail} />

          {/* Twitter */}
          <meta name="twitter:card" content="summary_large_image" />
          <meta name="twitter:title" content={shareTitle} />
          <meta name="twitter:description" content={description} />
          <meta name="twitter:image" content={thumbnail} />
        </>
      }
    />
  );
};
