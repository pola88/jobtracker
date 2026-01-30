import { DateTime } from 'luxon';

export const parseDate = (date: Date | string) => {
  if (typeof date === 'string') {
    return DateTime.fromISO(date).toFormat('yyyy LLL dd');
  }
  return DateTime.fromJSDate(date).toFormat('yyyy LLL dd');
};
