import { graphql, list } from '@keystone-6/core';
import { allowAll } from '@keystone-6/core/access';
import { relationship, text, virtual } from '@keystone-6/core/fields';

import { Session, allowReadOnly, isAdmin } from '../Access';
import { type Lists } from '.keystone/types';

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
      label: 'ISD Code',
      validation: {
        isRequired: true,
      },
    }),
    states: relationship({
      ref: 'State.country',
      many: true,
      ui: {
        hideCreate: true,
        inlineConnect: false,
        displayMode: 'cards',
        cardFields: ['name', 'code'],
      },
    }),
    phones: relationship({
      ref: 'Phone.country',
      many: true,
    }),
  },
});

export const State: Lists.State<Session> = list({
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
    country: relationship({
      ref: 'Country.states',
      many: false,
      ui: {
        hideCreate: true,
        inlineConnect: true,
        displayMode: 'cards',
        cardFields: ['name'],
      },
    }),
    cities: relationship({
      ref: 'City.state',
      many: true,
      ui: {
        hideCreate: true,
        inlineConnect: false,
        displayMode: 'cards',
        cardFields: ['name'],
      },
    }),
  },
});

export const City: Lists.City<Session> = list({
  access: allowAll,
  fields: {
    name: text({ validation: { isRequired: true } }),
    state: relationship({
      ref: 'State.cities',
      many: false,
      ui: {
        hideCreate: true,
        inlineConnect: true,
      },
    }),
    areas: relationship({
      ref: 'PostalCode.city',
      many: true,
      ui: {
        hideCreate: true,
        inlineConnect: false,
        displayMode: 'cards',
        cardFields: ['name'],
      },
    }),
  },
});

export const PostalCode: Lists.PostalCode<Session> = list({
  access: allowAll,
  ui: {
    listView: {
      initialColumns: ['area', 'code', 'city'],
    },
  },
  fields: {
    name: virtual({
      field: graphql.field({
        type: graphql.String,
        resolve(item) {
          return `${item.area} - ${item.code}`;
        },
      }),
      ui: {
        itemView: { fieldMode: 'hidden' },
      },
    }),
    area: text({
      validation: {
        isRequired: true,
      },
    }),
    code: text({
      validation: { isRequired: true },
      isIndexed: 'unique',
    }),
    city: relationship({
      ref: 'City.areas',
      many: false,
      ui: {
        hideCreate: true,
        inlineConnect: true,
      },
    }),
  },
});
