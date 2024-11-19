import { createAuth } from '@keystone-6/auth';
import { statelessSessions } from '@keystone-6/core/session';

// withAuth is a function we can use to wrap our the base configuration
export const { withAuth } = createAuth({
  listKey: 'User',
  identityField: 'email',
  sessionData: 'firstName lastName isAdmin',
  secretField: 'password',

  initFirstItem: {
    fields: ['firstName', 'lastName', 'email', 'password', 'isAdmin'],
  },
});

// Session expiry in seconds (30 days)
const sessionMaxAge = 60 * 60 * 24 * 30;

export const session = statelessSessions({
  maxAge: sessionMaxAge,
  secret: process.env.SESSION_SECRET,
});
