import type { Interview } from '@prisma/client';
import { CompensationType } from '@prisma/client';

export function formatCompensation(interview: Interview) {
  const currency = interview.currency ?? 'USD';
  const formatter = new Intl.NumberFormat('es-AR', {
    style: 'currency',
    currency,
    maximumFractionDigits: 0,
  });

  if (!interview.compensationLower) {
    return 'Sin definir';
  }

  let salary = formatter.format(Number(interview.compensationLower));
  if (interview.compensationUpper) {
    const upper = formatter.format(Number(interview.compensationUpper));
    salary = `${salary} - ${upper}`;
  }

  if (interview.compensationType === CompensationType.hourly) {
    salary = `${salary}/h`;
  }

  return salary;
}
