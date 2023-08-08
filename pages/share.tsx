import { useSearchParams } from 'next/navigation';

import { Header } from '@components/commons/Header';
import { YouTubeVideoShareCard } from '@components/youtube/YouTubeVideoShareCard';

export default function Page() {
  const searchParams = useSearchParams();
  const url = searchParams.get('u') as string;
  const thumbnail = searchParams.get('p') as string;
  const title = searchParams.get('t') as string;
  const content = searchParams.get('c') as string;
  const duration = searchParams.get('d') as string;

  return (
    <>
      <Header
        title={title || 'YouTube Summary'}
        description={content}
        extra={
          <>
            {title && <meta property="og:title" content={title} />}
            {content && <meta property="og:description" content={content} />}
            {thumbnail && <meta property="og:image" content={thumbnail} />}
          </>
        }
      />

      <div className="absolute w-screen h-screen flex items-center justify-center">
        <YouTubeVideoShareCard {...{ url, thumbnail, title, content, duration }} />
      </div>
    </>
  );
}
