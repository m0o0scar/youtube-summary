import { signOut, useSession } from 'next-auth/react';
import { FC } from 'react';

import { Avatar } from '@components/auth/Avatar';
import { LoginButton } from '@components/auth/LoginButton';
import { useSettings } from '@components/settings/useSettings';

export interface NavMenuProps extends ReturnType<typeof useSettings> {}

export const NavMenu: FC<NavMenuProps> = ({ language, setLanguage }) => {
  const { status } = useSession();

  return (
    <div className="not-prose dropdown dropdown-end fixed right-3 top-4 z-30">
      {/* login button */}
      {status === 'unauthenticated' && <LoginButton className="btn-sm" />}

      {/* avatar & dropdown menu */}
      {status !== 'unauthenticated' && (
        <>
          <Avatar tabIndex={0} className="btn btn-ghost btn-circle min-h-0" />
          <ul
            tabIndex={0}
            className="mt-1 z-[1] p-2 shadow menu dropdown-content bg-base-100 rounded-xl"
          >
            <li>
              <label className="swap text-center h-9">
                <input
                  type="checkbox"
                  checked={language === 'en'}
                  onChange={(e) => setLanguage(e.target.checked ? 'en' : 'zh-CN')}
                />
                <div className="swap-on">En</div>
                <div className="swap-off">中文</div>
              </label>
            </li>
            <li>
              <a onClick={() => signOut()}>Logout</a>
            </li>
          </ul>
        </>
      )}
    </div>
  );
};
