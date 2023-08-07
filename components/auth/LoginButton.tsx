import cls from 'classnames';
import { signIn, signOut, useSession } from 'next-auth/react';
import { FC, HTMLAttributes } from 'react';

export const LoginButton: FC<HTMLAttributes<HTMLAnchorElement>> = ({ className, ...props }) => {
  // you can get user name by session.user?.name
  const { status } = useSession();

  switch (status) {
    case 'loading':
      return (
        <a className={cls('btn btn-disabled self-start', className)} {...props}>
          ...
        </a>
      );

    case 'unauthenticated':
      return (
        <a className={cls('btn self-start', className)} onClick={() => signIn('google')} {...props}>
          Login
        </a>
      );

    case 'authenticated':
      return (
        <a
          className={cls('btn btn-error self-start', className)}
          onClick={() => signOut()}
          {...props}
        >
          Logout
        </a>
      );

    default:
      return null;
  }
};
