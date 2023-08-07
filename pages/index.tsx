import { useSession } from 'next-auth/react';
import { useState } from 'react';

import { LoginButton } from '@components/auth/LoginButton';
import { Header } from '@components/commons/Header';
import { NavMenu } from '@components/commons/NavMenu';
import { URLInput } from '@components/commons/URLInput';
import { YouTubeContent } from '@components/youtube/YouTubeContent';
import { SupportedURL } from '@type';

export default function Page() {
  const { status } = useSession();

  const [source, setSource] = useState<SupportedURL | undefined>(undefined);

  return (
    <>
      <Header title="YouTube Summary" emoji="📑" />

      {/* page container */}
      <article className="prose max-w-full w-screen flex justify-center p-4">
        <div className="flex flex-col gap-6 w-full max-w-2xl mb-4">
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

              <YouTubeContent source={source} />
            </>
          )}
        </div>
      </article>
    </>
  );
}
