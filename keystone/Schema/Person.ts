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

export const Person: Lists.Person = list({
  access: allowAll,

  ui: {
    listView: {
      initialColumns: ['firstName', 'lastName', 'phones', 'emails'],
    },
  },

  // this is the fields for our User list
  fields: {
    ...group({
      label: 'Name',
      fields: {
        firstName: text({ validation: { isRequired: true } }),
        middleName: text({ validation: { isRequired: false } }),
        lastName: text({ validation: { isRequired: true } }),
        name: virtual({
          field: graphql.field({
            type: graphql.String,
            resolve(item) {
              return item.firstName + ' ' + item.lastName;
            },
          }),
          ui: {
            itemView: { fieldMode: 'hidden' },
          },
        }),
      },
    }),

    ...group({
      label: 'Additional Information',
      fields: {
        dob: calendarDay({ validation: { isRequired: false } }),
        gender: text({ validation: { isRequired: false } }),
      },
    }),

    ...group({
      label: 'Contact Information',
      fields: {
        phones: relationship({
          ref: 'Phone.person',
          many: true,
          ui: {
            displayMode: 'cards',
            cardFields: ['number', 'country'],
            inlineCreate: { fields: ['number', 'country'] },
            inlineEdit: { fields: ['number', 'country'] },
          },
        }),
        emails: relationship({
          ref: 'Email.person',
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
          ref: 'Address.person',
          many: true,
          ui: {
            displayMode: 'cards',
            cardFields: ['house', 'street', 'landmark', 'postalCode'],
            inlineCreate: {
              fields: ['house', 'street', 'landmark', 'postalCode'],
            },
            inlineEdit: {
              fields: ['house', 'street', 'landmark', 'postalCode'],
            },
          },
        }),
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
