import { useSession } from 'next-auth/react';
import Link from 'next/link';
import { useEffect } from 'react';

import { LoginButton } from '@components/auth/LoginButton';
import { Header } from '@components/commons/Header';
import { NavMenu } from '@components/commons/NavMenu';

export default function Page() {
  const { status } = useSession();

  return (
    <>
      <Header title="YouTube Summary" emoji="📑" />

      {/* page container */}
      <article className="prose max-w-full w-screen h-screen flex flex-col gap-2 p-4">
        {/* title */}
        <h1 className="hidden sm:block">YouTube Summary</h1>
        <h1 className="block sm:hidden">YT Summary</h1>

        {/* show login button if not authenticated */}
        {status !== 'authenticated' && <LoginButton />}

        {/* show main app content if authenticated */}
        {status === 'authenticated' && (
          <>
            <NavMenu />
          </>
        )}
      </article>
    </>
  );
}
