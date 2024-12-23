import { Button } from '@webf/anar/Button/Button.js';
import clsx from 'clsx';
import { LogOut } from 'lucide-react';

import style from './Navigation.module.css';

export type UserInfoProps = {
  name: string;
};

export function UserInfo(props: UserInfoProps) {
  const { name } = props;

  return (
    <div className={clsx('UserInfo', style.userInfo)}>
      <Button label={name} left={LogOut} />
    </div>
  );
}
