// Side-effect import to ensure the styles are loaded
import '@webf/anar/Style.css';
import './generated/Navigation/Navigation_module.css';
import './Style.css';

import type { AdminConfig } from '@keystone-6/core/types';

import { Logo } from './Logo';
import { KeystoneNavigation } from './Navigation';

export const components: AdminConfig['components'] = {
  Navigation: KeystoneNavigation,
  Logo,
};
