import type { NavigationProps } from '@keystone-6/core/admin-ui/components';

export function Navigation(props: NavigationProps) {
  const { authenticatedItem, lists } = props;

  console.log(props);

  return <div className='Navigation'></div>;
}
