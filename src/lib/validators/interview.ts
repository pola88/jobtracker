import { z } from "zod";

const statusEnum = ["applied", "screening", "tech", "offer", "rejected"] as const;
const compensationTypes = ["fixed", "hourly", "range", "contract"] as const;
const experienceRatings = [
  "very_negative",
  "negative",
  "neutral",
  "positive",
  "very_positive",
] as const;

export const interviewSchema = z.object({
  company: z.string().min(2, "La empresa es obligatoria"),
  position: z.string().min(2, "El puesto es obligatorio"),
  recruiter: z.string().optional().transform((value) => value?.trim() || undefined),
  date: z.coerce.date({ required_error: "La fecha es obligatoria" }),
  salary: z
    .string()
    .optional()
    .transform((value) => {
      if (!value) return undefined;
      const parsed = Number(value);
      return Number.isFinite(parsed) ? parsed : undefined;
    }),
  benefits: z.string().optional().transform((value) => value?.trim() || undefined),
  compensationType: z.enum(compensationTypes),
  compensationValue: z
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
  currency: z.string().optional().transform((value) => value?.trim() || "USD"),
  experienceRating: z.enum(experienceRatings),
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

