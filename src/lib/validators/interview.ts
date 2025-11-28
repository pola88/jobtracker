import { z } from "zod";

const statusEnum = ["applied", "screening", "tech", "offer", "rejected"] as const;
export const COMPENSATION_TYPES = ["fixed", "hourly", "range", "contract"] as const;
export const EXPERIENCE_RATINGS = [
  "very_negative",
  "negative",
  "neutral",
  "positive",
  "very_positive",
] as const;
export const CURRENCIES = ["USD", "ARS", "EUR", "GBP"] as const;
export const interviewSchema = z.object({
  company: z.string().min(2, "La empresa es obligatoria"),
  position: z.string().min(2, "El puesto es obligatorio"),
  recruiter: z.string().optional().transform((value) => value?.trim() || undefined),
  date: z.coerce.date({ required_error: "La fecha es obligatoria" }),
  benefits: z.string().optional().transform((value) => value?.trim() || undefined),
  compensationType: z.enum(COMPENSATION_TYPES),
  compensationLower: z
    .string()
    .optional()
    .transform((value) => {
      if (!value) return undefined;
      const parsed = Number(value);
      return Number.isFinite(parsed) ? parsed : undefined;
    }),
  compensationUpper: z
    .string()
    .optional()
    .transform((value) => {
      if (!value) return undefined;
      const parsed = Number(value);
      return Number.isFinite(parsed) ? parsed : undefined;
    }),
  compensationNotes: z
    .string()
    .optional()
    .transform((value) => value?.trim() || undefined),
  currency: z.enum(CURRENCIES),
  experienceRating: z.enum(EXPERIENCE_RATINGS),
  initialNote: z
    .string()
    .optional()
    .transform((value) => value?.trim() || undefined),
  status: z.enum(statusEnum, {
    required_error: "El estado es obligatorio",
  }),
  tags: z
    .string()
    .optional()
    .transform((value) =>
      value
        ? value
            .split(",")
            .map((tag) => tag.trim())
            .filter(Boolean)
        : []
    ),
});

export type InterviewPayload = z.infer<typeof interviewSchema>;
export type InterviewStatus = (typeof statusEnum)[number];

