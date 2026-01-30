import { DateTime } from 'luxon';

export const parseDate = (date: Date | string): DateTime => {
  if (typeof date === 'string') {
    return DateTime.fromISO(date);
  }
  return DateTime.fromJSDate(date);
};

export const formatDate = (
  date: Date | string,
  format: string = 'yyyy LLL dd',
): string => {
  return parseDate(date).toFormat(format);
};

export function daysFromNow(date: Date | string): string | null {
  return parseDate(date).toRelative();
}
