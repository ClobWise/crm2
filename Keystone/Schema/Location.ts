import { list } from '@keystone-6/core';
import { allowAll } from '@keystone-6/core/access';
import { relationship, text } from '@keystone-6/core/fields';
import { type Lists } from '.keystone/types';

export const Country: Lists.Country = list({
  access: allowAll,
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

export const State: Lists.State = list({
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

export const City: Lists.City = list({
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

export const PostalCode: Lists.PostalCode = list({
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
