import { GetServerSideProps, InferGetServerSidePropsType } from 'next';

import { Header } from '@components/commons/Header';
import { YouTubeVideoShareCard } from '@components/youtube/YouTubeVideoShareCard';

interface SharePageProps {
  url?: string;
  thumbnail?: string;
  title?: string;
  content?: string;
  duration?: string;
}

export const getServerSideProps: GetServerSideProps = async (context) => {
  const host = context.req.headers.host;
  const path = context.req.url;
  const { searchParams } = new URL(`https://${host}${path}`);

  const url = searchParams.get('u') as string;
  const thumbnail = searchParams.get('p') as string;
  const title = searchParams.get('t') as string;
  const content = searchParams.get('c') as string;
  const duration = searchParams.get('d') as string;
  const props: SharePageProps = { url, thumbnail, title, content, duration };

  return { props };
};

export default function Page({ url, thumbnail, title, content, duration }: SharePageProps) {
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
        <YouTubeVideoShareCard {...{ url, thumbnail, title, content, duration }} />
      </div>
    </>
  );
}
