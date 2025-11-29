import type { Interview } from "@prisma/client";
import { CompensationType, ExperienceRating } from "@prisma/client";

const ratingLabels: Record<Interview["experienceRating"], { label: string; icon: string }> = {
  [ExperienceRating.very_negative]: { label: "Muy negativa", icon: "😡" },
  [ExperienceRating.negative]: { label: "Negativa", icon: "😕" },
  [ExperienceRating.neutral]: { label: "Neutral", icon: "😐" },
  [ExperienceRating.positive]: { label: "Positiva", icon: "🙂" },
  [ExperienceRating.very_positive]: { label: "Muy positiva", icon: "🤩" },
};

export function formatCompensation(interview: Interview) {
  const currency = interview.currency ?? "USD";
  const formatter = new Intl.NumberFormat("es-AR", {
    style: "currency",
    currency,
    maximumFractionDigits: 0,
  });

  if (!interview.compensationLower) {
    return "Sin definir";
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

export function formatExperience(interview: Interview) {
  const { label, icon } = ratingLabels[interview.experienceRating];
  return `${icon} ${label}`;
}

