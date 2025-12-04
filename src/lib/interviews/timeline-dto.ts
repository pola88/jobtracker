type DateValue = string | null;

export type InterviewStepDTO = {
  id: string;
  title: string;
  type: string;
  scheduledAt: DateValue;
  completedAt: DateValue;
  outcome?: string | null;
  notes?: string | null;
  createdAt: string;
  updatedAt: string;
};

export type InterviewNoteDTO = {
  id: string;
  content: string;
  createdAt: string;
};

export type TimelineItemDTO =
  | {
      kind: "step";
      id: string;
      title: string;
      type: string;
      scheduledAt: DateValue;
      completedAt: DateValue;
      outcome?: string | null;
      notes?: string | null;
      createdAt: string;
    }
  | {
      kind: "note";
      id: string;
      content: string;
      createdAt: string;
    };

export type InterviewTimelineResponse = {
  steps: InterviewStepDTO[];
  notes: InterviewNoteDTO[];
  timeline: TimelineItemDTO[];
};

export type InterviewTimeline = {
  steps: (Omit<
    InterviewStepDTO,
    "scheduledAt" | "completedAt" | "createdAt" | "updatedAt"
  > & {
    scheduledAt: Date | null;
    completedAt: Date | null;
    createdAt: Date;
    updatedAt: Date;
  })[];
  notes: (Omit<InterviewNoteDTO, "createdAt"> & { createdAt: Date })[];
  timeline: (
    | (Omit<
        Extract<TimelineItemDTO, { kind: "step" }>,
        "scheduledAt" | "completedAt" | "createdAt"
      > & {
        scheduledAt: Date | null;
        completedAt: Date | null;
        createdAt: Date;
      })
    | (Omit<Extract<TimelineItemDTO, { kind: "note" }>, "createdAt"> & {
        createdAt: Date;
      })
  )[];
};

const parseDate = (value: DateValue) => (value ? new Date(value) : null);

export const mapTimelineResponse = (
  data: InterviewTimelineResponse
): InterviewTimeline => ({
  steps: data.steps.map((step) => ({
    ...step,
    createdAt: new Date(step.createdAt),
    updatedAt: new Date(step.updatedAt),
    scheduledAt: parseDate(step.scheduledAt),
    completedAt: parseDate(step.completedAt),
  })),
  notes: data.notes.map((note) => ({
    ...note,
    createdAt: new Date(note.createdAt),
  })),
  timeline: data.timeline
    .map((item) => {
      if (item.kind === "step") {
        return {
          ...item,
          createdAt: new Date(item.createdAt),
          scheduledAt: parseDate(item.scheduledAt),
          completedAt: parseDate(item.completedAt),
        };
      }

      return {
        ...item,
        createdAt: new Date(item.createdAt),
      };
    })
    .sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime()),
});


