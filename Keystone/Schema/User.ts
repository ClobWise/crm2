import { list } from '@keystone-6/core';
import { allowAll } from '@keystone-6/core/access';
import {
  password,
  relationship,
  text,
  timestamp,
} from '@keystone-6/core/fields';
import { type Lists } from '.keystone/types';

export const User: Lists.User = list({
  access: allowAll,

  // this is the fields for our User list
  fields: {
    firstName: text({ validation: { isRequired: true } }),
    lastName: text({ validation: { isRequired: true } }),

    email: text({
      validation: { isRequired: true },
      isIndexed: 'unique',
    }),

    password: password({ validation: { isRequired: true } }),

    createdAt: timestamp({
      // this sets the timestamp to Date.now() when the user is first created
      defaultValue: { kind: 'now' },
    }),
  },
});
