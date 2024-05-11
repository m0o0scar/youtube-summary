import { GetServerSideProps } from 'next';

import { ShareHeader } from '@components/share/ShareHeader';
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
    ['duration', 'd'],
  ];
  for (const [name, key] of items) {
    const param = url.searchParams.get(key) as string;
    if (param) {
      let value = decodeURIComponent(param);
      if (name === 'content') value = value.replaceAll('_', ' ');
      Object.assign(props, { [name]: value });
    }
  }

  return { props };
};

export default function Page({ url, thumbnail, title, content = '', duration }: SharePageProps) {
  return (
    <>
      <ShareHeader title={title} summary={content} thumbnail={thumbnail} />

      <div className="absolute w-screen h-dvh flex items-center justify-center overflow-hidden">
        <YouTubeVideoShareCard {...{ url, thumbnail, title, content, duration }} />
      </div>
    </>
  );
}
