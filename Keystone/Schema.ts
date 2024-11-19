import { type Lists } from '.keystone/types';

// Core access control
import { User } from './Schema/User';

// CRM Objects
import { Address, Email, Phone } from './Schema/Address';
import { City, Country, PostalCode, State } from './Schema/Location';
import { Person } from './Schema/Person';

export const lists: Lists = {
  // IAM
  User,

  // Seed data
  Country,
  State,
  City,
  PostalCode,

  // CRM Objects
  Address,
  Email,
  Phone,

  Person,
};
