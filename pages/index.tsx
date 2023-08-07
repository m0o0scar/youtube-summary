import { useSession } from 'next-auth/react';
import { useState } from 'react';

import { LoginButton } from '@components/auth/LoginButton';
import { Header } from '@components/commons/Header';
import { NavMenu } from '@components/commons/NavMenu';
import { URLInput } from '@components/commons/URLInput';
import { useYouTubeVideoInfo } from '@components/youtube/useYouTubeVideoInfo';
import { YouTubeVideoInfoCard } from '@components/youtube/YouTubeVideoInfo';
import { SupportedURL } from '@type';

export default function Page() {
  const { status } = useSession();

  // source
  const [source, setSource] = useState<SupportedURL | null>(null);
  const isYouTubeSource = source?.type === 'youtube';

  // youtube source
  const youtubeVideoInfo = useYouTubeVideoInfo(isYouTubeSource ? source.id : undefined);

  return (
    <>
      <Header title="YouTube Summary" emoji="📑" />

      {/* page container */}
      <article className="prose max-w-full w-screen h-screen flex justify-center p-4">
        <div className="flex flex-col gap-6 w-full max-w-2xl">
          {/* title */}
          <h1 className="hidden sm:block">YouTube Summary</h1>
          <h1 className="block sm:hidden">YT Summary</h1>

          {/* show login button if not authenticated */}
          {status === 'loading' && <span className="loading loading-spinner" />}
          {status === 'unauthenticated' && <LoginButton />}

          {/* show main app content if authenticated */}
          {status === 'authenticated' && (
            <>
              <NavMenu />

              <URLInput onSupportedURLFound={setSource} />

              <YouTubeVideoInfoCard url={isYouTubeSource ? source.url : ''} {...youtubeVideoInfo} />
            </>
          )}
        </div>
      </article>
    </>
  );
}
