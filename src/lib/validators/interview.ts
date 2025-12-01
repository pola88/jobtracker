import { z } from "zod";

import {CompensationType, ExperienceRating, InterviewStatus } from "@prisma/client";

export const CURRENCIES = ["USD", "ARS", "EUR", "GBP"] as const;
export const interviewSchema = z.object({
  company: z.string().min(2, "La empresa es obligatoria"),
  position: z.string().min(2, "El puesto es obligatorio"),
  recruiter: z.string().optional().transform((value) => value?.trim() || undefined),
  date: z.coerce.date({ required_error: "La fecha es obligatoria" }),
  benefits: z.string().optional().transform((value) => value?.trim() || undefined),
  compensationType: z.nativeEnum(CompensationType),
  compensationLower: z
    .coerce.number()
    .optional()
    .transform((value) => {
      if (!value) return undefined;
      const parsed = Number(value);
      return Number.isFinite(parsed) ? parsed : undefined;
    }),
  compensationUpper: z
    .coerce.number()
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
  experienceRating: z.nativeEnum(ExperienceRating),
  initialNote: z
    .string()
    .optional()
    .transform((value) => value?.trim() || undefined),
  status: z.nativeEnum(InterviewStatus, {
    required_error: "El estado es obligatorio",
  }),
});

export type InterviewPayload = z.infer<typeof interviewSchema>;

