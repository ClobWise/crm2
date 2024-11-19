import { list } from '@keystone-6/core';
import { allowAll } from '@keystone-6/core/access';
import {
  calendarDay,
  text,
  timestamp,
} from '@keystone-6/core/fields';
import { type Lists } from '.keystone/types';

export const Person: Lists.Person = list({
  access: allowAll,

  // this is the fields for our User list
  fields: {
    firstName: text({ validation: { isRequired: true } }),
    middleName: text({ validation: { isRequired: false } }),
    lastName: text({ validation: { isRequired: true } }),

    dob: calendarDay({ validation: { isRequired: false } }),
    gender: text({ validation: { isRequired: false } }),

    createdAt: timestamp({
      defaultValue: { kind: 'now' },
    }),
  },
});
