/* eslint-disable @next/next/no-html-link-for-pages */
import { useSession } from 'next-auth/react';
import { useState } from 'react';

import { LoginButton } from '@components/auth/LoginButton';
import { Header } from '@components/commons/Header';
import { NavMenu } from '@components/commons/NavMenu';
import { URLInput } from '@components/commons/URLInput';
import { useSettings } from '@components/settings/useSettings';
import { YouTubeContent } from '@components/youtube/YouTubeContent';
import { SupportedURL } from '@type';

export default function Page() {
  const { status } = useSession();

  const [source, setSource] = useState<SupportedURL | undefined>(undefined);

  const settings = useSettings(source);

  return (
    <>
      <Header title="YouTube Summary" />

      {/* page container */}
      <article className="prose absolute max-w-full w-screen h-screen overflow-y-auto p-4">
        <div className="flex flex-col gap-6 w-full max-w-2xl mb-4 m-auto">
          {/* title */}
          <a href="/" className="no-underline self-start">
            <h1 className="hidden sm:block">YouTube Summary</h1>
            <h1 className="block sm:hidden">YT Summary</h1>
          </a>

          {/* show login button if not authenticated */}
          {status === 'loading' && <span className="loading loading-spinner" />}
          {status === 'unauthenticated' && <LoginButton />}

          {/* show main app content if authenticated */}
          {status === 'authenticated' && (
            <>
              <NavMenu {...settings} />

              <URLInput {...settings} onSupportedURLFound={setSource} />

              <YouTubeContent source={source} language={settings.language} />
            </>
          )}
        </div>
      </article>
    </>
  );
}
