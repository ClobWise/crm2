import { graphql, list } from '@keystone-6/core';
import { allowAll } from '@keystone-6/core/access';
import {
  checkbox,
  password,
  relationship,
  text,
  timestamp,
  virtual,
} from '@keystone-6/core/fields';

import { allowReadOnly, isAdmin } from '../Access';
import { type Lists } from '.keystone/types';

export const User: Lists.User = list({
  access(args) {
    return allowReadOnly(args.session, args.operation);
  },
  ui: {
    isHidden(args) {
      return !isAdmin(args.session);
    },
  },
  fields: {
    firstName: text({ validation: { isRequired: true } }),
    lastName: text({ validation: { isRequired: true } }),

    name: virtual({
      field: graphql.field({
        type: graphql.String,
        resolve(item) {
          return item.firstName + ' ' + item.lastName;
        },
      }),
    }),

    email: text({
      validation: { isRequired: true },
      isIndexed: 'unique',
    }),

    password: password({ validation: { isRequired: true } }),

    isAdmin: checkbox({ defaultValue: false }),

    createdAt: timestamp({
      // this sets the timestamp to Date.now() when the user is first created
      defaultValue: { kind: 'now' },
    }),
  },
});
