import { list } from '@keystone-6/core';
import { allowAll } from '@keystone-6/core/access';
import { relationship, text } from '@keystone-6/core/fields';
import { type Lists } from '.keystone/types';

export const Email: Lists.Email = list({
  access: allowAll,
  fields: {
    address: text({ validation: { isRequired: true } }),
  },
});

export const Phone: Lists.Phone = list({
  access: allowAll,
  fields: {
    number: text({ validation: { isRequired: true } }),
    country: relationship({
      ref: 'Country',
      many: false,
    }),
  },
});

export const Address: Lists.Address = list({
  access: allowAll,
  fields: {
    house: text({ validation: { isRequired: false } }),
    street: text({ validation: { isRequired: true } }),
    landmark: text({ validation: { isRequired: false } }),
    postalCode: relationship({
      ref: 'PostalCode',
      many: false,
    }),
  },
});
