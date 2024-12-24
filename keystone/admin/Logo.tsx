import clsx from 'clsx';

import { ClobwiseLogo } from './generated/Keystone';

export function Logo() {
  return (
    <div className={clsx('Logo')}>
      <ClobwiseLogo />
    </div>
  );
}
