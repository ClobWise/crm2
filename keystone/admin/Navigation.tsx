import { type NavigationProps } from '@keystone-6/core/admin-ui/components';
// @ts-ignore
import { Anar, initAnar } from '@webf/anar/Anar';
import Link from 'next/link';
import { useEffect, useState } from 'react';

import style from './Navigation.module.css';
import { Navigation } from './generated/Keystone';

function rootElm() {
  const elm = document.querySelector(':root') as HTMLElement;

  return elm;
}

export function KeystoneNavigation(props: NavigationProps) {
  const { authenticatedItem } = props;
  const [init, setInit] = useState(false);

  useEffect(() => {
    initAnar();
    setInit(true);
  }, []);

  const name =
    authenticatedItem.state === 'authenticated'
      ? authenticatedItem.label
      : 'Unknown';

  if (!init) {
    return <div></div>;
  }

  return (
    <Anar colorScheme='light' getRootElement={rootElm}>
      <Navigation className={style.navigation} link={Link} name={name} />
    </Anar>
  );
}
