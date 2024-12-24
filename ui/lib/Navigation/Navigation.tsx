import clsx from 'clsx';
import {
  Building2,
  BusFront,
  Contact,
  Globe,
  LayoutDashboard,
  MapPin,
} from 'lucide-react';

import style from './Navigation.module.css';
import {
  type ExternalLinkProps,
  NavigationItem,
  Subtitle,
} from './NavigationItem.js';
import { UserInfo } from './UserInfo.js';


export type NavigationProps = {
  className?: string;
  link: (props: ExternalLinkProps) => React.ReactNode;
  name: string;
  isSuperAdmin?: boolean;
};

export function Navigation(props: NavigationProps) {
  const { className, link: Link, name } = props;

  return (
    <nav className={clsx('Navigation', style.root, className)}>
      <div className={style.scrollArea}>
        <NavigationItem
          component={Link}
          href='/'
          text='Dashboard'
          icon={LayoutDashboard}
        />
        <NavigationItem
          component={Link}
          href='/people'
          text='People'
          icon={Contact}
        />
        <NavigationItem
          component={Link}
          href='/organizations'
          text='Organizations'
          icon={Building2}
        />
        <Subtitle>Locations</Subtitle>
        <NavigationItem
          component={Link}
          href='/states'
          text='States'
          icon={Globe}
        />
        <NavigationItem
          component={Link}
          href='/cities'
          text='Cities'
          icon={BusFront}
        />
        <NavigationItem
          component={Link}
          href='/postal-codes'
          text='Postal Codes'
          icon={MapPin}
        />
      </div>

      <UserInfo name={name} />
    </nav>
  );
}
