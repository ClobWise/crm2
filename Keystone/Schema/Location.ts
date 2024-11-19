import { list } from '@keystone-6/core';
import { allowAll } from '@keystone-6/core/access';
import { relationship, text } from '@keystone-6/core/fields';
import { type Lists } from '.keystone/types';
import { allowReadOnly, isAdmin, Session } from '../Access';

export const Country: Lists.Country<Session> = list({
  access(args) {
    return allowReadOnly(args.session, args.operation);
  },
  ui: {
    isHidden(args) {
      return !isAdmin(args.session);
    },
  },
  fields: {
    name: text({ validation: { isRequired: true } }),
    code: text({
      validation: { isRequired: true },
      isIndexed: 'unique',
    }),
    isdCode: text({
      validation: {
        isRequired: true
      }
    }),
  },
});

export const State: Lists.State<Session> = list({
  access: allowAll,
  fields: {
    name: text({ validation: { isRequired: true } }),
    code: text({
      validation: { isRequired: true },
      isIndexed: 'unique',
    }),
    country: relationship({
      ref: 'Country',
      many: false,
    }),
  },
});

export const City: Lists.City<Session> = list({
  access: allowAll,
  fields: {
    name: text({ validation: { isRequired: true } }),
    state: relationship({
      ref: 'State',
      many: false,
    }),
    areas: relationship({
      ref: 'PostalCode',
      many: true,

    }),
  },
});

export const PostalCode: Lists.PostalCode<Session> = list({
  access: allowAll,
  fields: {
    code: text({
      validation: { isRequired: true },
      isIndexed: 'unique',
    }),
    city: relationship({
      ref: 'City',
      many: false,
    }),
  },
});
