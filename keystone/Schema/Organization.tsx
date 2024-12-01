import { graphql, group, list } from '@keystone-6/core';
import { allowAll } from '@keystone-6/core/access';
import {
  calendarDay,
  relationship,
  text,
  timestamp,
  virtual,
} from '@keystone-6/core/fields';

import { type Lists } from '.keystone/types';

export const Organization: Lists.Organization = list({
  access: allowAll,

  // this is the fields for our User list
  fields: {
    name: text({
      validation: { isRequired: true },
    }),

    phones: relationship({
      ref: 'Phone.organization',
      many: true,
      ui: {
        displayMode: 'cards',
        cardFields: ['number', 'country'],
        inlineCreate: { fields: ['number', 'country'] },
        inlineEdit: { fields: ['number', 'country'] },
      },
    }),

    emails: relationship({
      ref: 'Email.organization',
      many: true,
      ui: {
        displayMode: 'cards',
        cardFields: ['address'],
        inlineCreate: { fields: ['address'] },
        inlineEdit: { fields: ['address'] },
        inlineConnect: true,
      },
    }),

    addresses: relationship({
      ref: 'Address.organization',
      many: true,
      ui: {
        displayMode: 'cards',
        cardFields: ['house', 'street', 'landmark', 'postalCode'],
        inlineCreate: { fields: ['house', 'street', 'landmark', 'postalCode'] },
        inlineEdit: { fields: ['house', 'street', 'landmark', 'postalCode'] },
      },
    }),

    createdAt: timestamp({
      defaultValue: { kind: 'now' },
      ui: {
        createView: { fieldMode: 'hidden' },
        listView: { fieldMode: 'read' },
        itemView: { fieldMode: 'read' },
      },
    }),
  },
});
