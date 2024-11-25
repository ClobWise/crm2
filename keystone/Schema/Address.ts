import { list } from '@keystone-6/core';
import { allowAll } from '@keystone-6/core/access';
import { relationship, text, virtual } from '@keystone-6/core/fields';

import { type Lists } from '.keystone/types';

export const Email: Lists.Email = list({
  access: allowAll,
  ui: {
    hideCreate(args) {
      return true;
    },
    labelField: 'address',
  },
  fields: {
    address: text({
      label: 'Email Address',
      validation: { isRequired: true },
    }),
    person: relationship({
      ref: 'Person.emails',
      many: true,
      ui: {
        displayMode: 'cards',
        cardFields: ['firstName', 'lastName'],
        inlineConnect: true,
        hideCreate: true,
      },
    }),
  },
});

export const Phone: Lists.Phone = list({
  access: allowAll,
  ui: {
    hideCreate(args) {
      return true;
    },
    listView: {
      initialColumns: ['number', 'country'],
    },
    labelField: 'number',
  },
  fields: {
    number: text({
      validation: {
        isRequired: true,
      },
      isOrderable: false,
    }),
    country: relationship({
      ref: 'Country.phones',
      many: false,
      isOrderable: false,
      ui: {
        displayMode: 'cards',
        cardFields: ['name', 'code'],
        // hideCreate: true,
        inlineConnect: true,
      },
    }),
    person: relationship({
      ref: 'Person.phones',
      many: true,
      ui: {
        hideCreate: true,
      },
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
      ui: {
        hideCreate: true,
      },
    }),
    person: relationship({
      ref: 'Person.addresses',
      many: false,
      ui: {
        hideCreate: true,
      },
    }),
  },
});
