import { type Lists } from '.keystone/types';

// Core access control
import { User } from './Schema/User';

// CRM Objects
import { Person } from './Schema/Person';

export const lists = {
  User,
  Person
} satisfies Lists;
