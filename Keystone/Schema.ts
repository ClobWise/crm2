import { type Lists } from '.keystone/types';

// Core access control
import { User } from './Schema/User';

// CRM Objects
import { Address, Email, Phone } from './Schema/Address';
import { City, Country, PostalCode, State } from './Schema/Location';
import { Person } from './Schema/Person';

export const lists = {
  User,

  // CRM Objects
  Country,
  State,
  City,
  PostalCode,

  Address,
  Email,
  Phone,

  Person,
} satisfies Lists;
