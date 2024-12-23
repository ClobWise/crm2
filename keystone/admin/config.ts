// Side-effect import to ensure the styles are loaded
import type { AdminConfig } from '@keystone-6/core/types';
import '@webf/anar/Style.css';

import { Logo } from './Logo';
import { KeystoneNavigation } from './Navigation';
import './Style.css';
import './generated/library.css';

export const components: AdminConfig['components'] = {
  Navigation: KeystoneNavigation,
  Logo,
};
