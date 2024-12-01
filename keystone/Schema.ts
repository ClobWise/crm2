// CRM Objects
import { Address, Email, Phone } from './Schema/Address';
import { City, Country, PostalCode, State } from './Schema/Location';
import { Organization } from './Schema/Organization';
import { Person } from './Schema/Person';
// Core access control
import { User } from './Schema/User';
import { type Lists } from '.keystone/types';

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
  Organization,
};
