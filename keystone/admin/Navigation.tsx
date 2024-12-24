import { type NavigationProps } from '@keystone-6/core/admin-ui/components';
// @ts-ignore
import { Anar } from '@webf/anar/Anar';
import Link from 'next/link';

import { Navigation } from './generated/Keystone';

function rootElm() {
  const elm = document.querySelector(':root') as HTMLElement;

  return elm;
}

export function KeystoneNavigation(props: NavigationProps) {
  const { authenticatedItem } = props;

  const name =
    authenticatedItem.state === 'authenticated'
      ? authenticatedItem.label
      : 'Unknown';

  return (
    <Anar colorScheme='light' getRootElement={rootElm}>
      <Navigation className={'Navigation'} link={Link} name={name} />
    </Anar>
  );
}
