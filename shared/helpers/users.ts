/* eslint-disable i18next/no-literal-string */
import _ from 'lodash';

export const formatName = (profile: Record<string, any> | null | undefined): string => {
  const firstName = _.get(profile, 'firstName');
  const lastName = _.get(profile, 'lastName');
  const fullName = _.get(profile, 'fullName');

  if (typeof fullName === 'string') {
    return fullName;
  }

  return !(_.isNil(firstName) && _.isNil(lastName)) ? `${firstName as string} ${lastName as string}`.trim() : 'unknown';
};

export const formatNameWithLastInitial = (profile: Record<string, any> | undefined): string => {
  const formattedName = formatName(profile);
  const [firstName, lastName] = _.split(formattedName, ' ');

  // fullName could possibly be one name with no spaces. formatName can also just return 'unknown';
  if (!lastName) {
    return firstName;
  }

  return `${firstName} ${lastName[0]}.`;
};

export const isConsumerUser = (user: Record<string, any> | null): boolean =>
  Boolean(user?.profile?.type === 'user' || _.isNil(user?.profile?.type));

export const isSuperAdmin = (user: Record<string, any> | null): boolean =>
  Boolean(user?.profile?.type === 'superAdmin');

export const isDispensaryUser = (user: Record<string, any> | null): boolean =>
  Boolean(user?.profile?.type === 'dispensaryUser');

export const isInternalEmail = (email: string): boolean =>
  _.includes(email, '@dutchie.com') || _.includes(email, '@leaflogix.com') || _.includes(email, '@greenbits.com');

export const isChainAdmin = (user: Record<string, any> | null): boolean =>
  Boolean(
    user?.profile?.chainID &&
      isDispensaryUser(user) &&
      (user.profile.permissions?.allLocations || user.profile.permissions.dispensaryIds?.length > 1)
  );

export const isAdminAccessible = (user: Record<string, any> | null): boolean =>
  isSuperAdmin(user) || isDispensaryUser(user);

export const superAdminCan = (permissions: Record<string, any> | null, permission: string): boolean => {
  let hasPermission = true;

  if (isRecord(permissions) && (permissions[permission] === false || !(permission in permissions))) {
    hasPermission = false;
  }

  if (permission === 'menuReview' && !permissions?.menuReview) {
    hasPermission = false;
  }

  return hasPermission;
};

function isRecord<K extends number | string | symbol, T>(
  record: Record<K, T> | null | undefined
): record is Record<K, T> {
  return !_.isEmpty(record);
}
