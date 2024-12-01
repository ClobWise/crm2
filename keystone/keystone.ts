import { config } from '@keystone-6/core';

import { session, withAuth } from './Auth';
import { lists } from './Schema';

export default withAuth(
  config({
    db: {
      // we're using sqlite for the fastest startup experience
      //   for more information on what database might be appropriate for you
      //   see https://keystonejs.com/docs/guides/choosing-a-database#title
      provider: 'postgresql',
      url: process.env.DATABASE_URL ?? 'invalid-url',
    },
    lists,
    session,
    server: {
      port: 4001,
    },
  })
);
