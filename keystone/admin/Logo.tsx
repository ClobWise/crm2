import clsx from 'clsx';

import style from './Logo.module.css';
import { ClobwiseLogo } from './generated/Keystone';

export function Logo() {
  return (
    <div className={clsx('Logo', style.logo)}>
      <ClobwiseLogo />
    </div>
  );
}
