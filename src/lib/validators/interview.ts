import { z } from "zod";

const statusEnum = ["applied", "screening", "tech", "offer", "rejected"] as const;

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
  notes: z.string().optional().transform((value) => value?.trim() || undefined),
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

