import { AccessOperation } from '@keystone-6/core/dist/declarations/src/types/config/access-control';

export type SessionData = {
  id: string;
  isAdmin: boolean;
  firstName: string;
  lastName: string;
};

export type Session = {
  listKey: 'User';
  itemId: string;
  data: SessionData;
}

export function isAdmin(session?: Session) {
  return !!session?.data.isAdmin;
}

export function isSession(session?: Session) {
  return !!session;
}

export function allowReadOnly(session?: Session, operation?: AccessOperation) {
  if (!isSession(session)) {
    return false;
  }

  if (isAdmin(session)) {
    return true;
  }

  if (session.data && operation === 'query') {
    return true;
  }

  return false;
}
