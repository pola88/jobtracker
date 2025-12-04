import type { InterviewTimelineResponse } from "@/lib/interviews/timeline-dto";
import { getInterviewStepsAndNotes } from "@/lib/data/interviews";

const toISOStringOrNull = (value: Date | null) => value?.toISOString() ?? null;

export async function getInterviewTimelineDTO(
  interviewId: string
): Promise<InterviewTimelineResponse> {
  const [steps, notes] = await getInterviewStepsAndNotes(interviewId);

  const stepsDto = steps.map((step) => ({
    id: step.id,
    title: step.title,
    type: step.type,
    scheduledAt: toISOStringOrNull(step.scheduledAt),
    completedAt: toISOStringOrNull(step.completedAt),
    outcome: step.outcome,
    notes: step.notes,
    createdAt: step.createdAt.toISOString(),
    updatedAt: step.updatedAt.toISOString(),
  }));

  const notesDto = notes.map((note) => ({
    id: note.id,
    content: note.content,
    createdAt: note.createdAt.toISOString(),
  }));

  const timelineDto = [
    ...stepsDto.map((step) => ({
      kind: "step" as const,
      id: step.id,
      title: step.title,
      type: step.type,
      scheduledAt: step.scheduledAt,
      completedAt: step.completedAt,
      outcome: step.outcome,
      notes: step.notes,
      createdAt: step.createdAt,
    })),
    ...notesDto.map((note) => ({
      kind: "note" as const,
      id: note.id,
      content: note.content,
      createdAt: note.createdAt,
    })),
  ].sort(
    (a, b) =>
      new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
  );

  return {
    steps: stepsDto,
    notes: notesDto,
    timeline: timelineDto,
  };
}


