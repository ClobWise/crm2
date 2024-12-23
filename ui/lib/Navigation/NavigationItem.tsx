import clsx from 'clsx';
import type { LucideProps } from 'lucide-react';
import type { ReactNode } from 'react';

import style from './Navigation.module.css';

export type ExternalLinkProps = {
  className: string;
  href: string;
  children: React.ReactNode;
};

export type NavigationItemProps = {
  href: string;
  text: string;
  icon: React.FC<LucideProps>;
  component: React.FC<ExternalLinkProps>;
};

export type SubtitleProps = {
  children: ReactNode;
};

export function NavigationItem(props: NavigationItemProps) {
  const { component: Component, icon: Icon, href, text } = props;

  const className = clsx('NavigationItem', style.item);

  return (
    <Component className={className} href={href}>
      <Icon size={16} />
      <span>{text}</span>
    </Component>
  );
}

export function Subtitle(props: SubtitleProps) {
  return <p className={style.subtitle}>{props.children}</p>;
}
