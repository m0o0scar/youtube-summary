import { GetServerSideProps } from 'next';

import { Header } from '@components/commons/Header';
import { YouTubeVideoShareCard } from '@components/youtube/YouTubeVideoShareCard';

interface SharePageProps {
  url?: string;
  thumbnail?: string;
  title?: string;
  content?: string;
  model?: string;
  duration?: string;
}

export const getServerSideProps: GetServerSideProps = async (context) => {
  const host = context.req.headers.host;
  const path = context.req.url;
  const url = new URL(`https://${host}${path}`);

  const props: SharePageProps = {};
  const items: [string, string][] = [
    ['url', 'u'],
    ['thumbnail', 'p'],
    ['title', 't'],
    ['content', 'c'],
    ['model', 'm'],
    ['duration', 'd'],
  ];
  for (const [name, key] of items) {
    const param = url.searchParams.get(key) as string;
    if (param) Object.assign(props, { [name]: decodeURIComponent(param) });
  }

  return { props };
};

export default function Page({ url, thumbnail, title, content, model, duration }: SharePageProps) {
  return (
    <>
      <Header
        title={title || 'YouTube Summary'}
        description={content}
        extra={
          <>
            {/* Open Graph */}
            <meta property="og:title" content={title} />
            <meta property="og:description" content={content} />
            <meta property="og:image" content={thumbnail} />

            {/* Twitter */}
            <meta name="twitter:card" content="summary_large_image" />
            <meta name="twitter:title" content={title} />
            <meta name="twitter:description" content={content} />
            <meta name="twitter:image" content={thumbnail} />
          </>
        }
      />

      <div className="absolute w-screen h-screen flex items-center justify-center">
        <YouTubeVideoShareCard {...{ url, thumbnail, title, content, model, duration }} />
      </div>
    </>
  );
}
