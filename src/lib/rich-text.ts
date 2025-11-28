import type { Interview } from "@prisma/client";

const ratingLabels: Record<Interview["experienceRating"], string> = {
  very_negative: "Muy negativa",
  negative: "Negativa",
  neutral: "Neutral",
  positive: "Positiva",
  very_positive: "Muy positiva",
};

const ratingEmoji: Record<Interview["experienceRating"], string> = {
  very_negative: "😡",
  negative: "😕",
  neutral: "😐",
  positive: "🙂",
  very_positive: "🤩",
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

  const base = formatter.format(Number(interview.compensationLower));

  switch (interview.compensationType) {
    case "hourly":
      return `${base}/h`;
    case "range":
      if (interview.compensationUpper) {
        const upper = formatter.format(Number(interview.compensationUpper));
        return `${base} - ${upper}`;
      }
      return `${base}+`;
    case "contract":
      return `${base} contrato`;
    default:
      return base;
  }
}

export function formatExperience(interview: Interview) {
  const label = ratingLabels[interview.experienceRating];
  const icon = ratingEmoji[interview.experienceRating];
  return `${icon} ${label}`;
}

