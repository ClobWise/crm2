import type { AdminConfig } from '@keystone-6/core/types';

import { Navigation } from './Navigation';
import { ClobwiseLogo } from './generated/library';

export const components: AdminConfig['components'] = {
  // Navigation,
  Logo: ClobwiseLogo,
};
