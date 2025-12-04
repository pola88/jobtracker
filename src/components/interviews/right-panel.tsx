'use client';

import { useMemo } from "react";

import { StepItem } from "@/components/interviews/stepItem";
import { NoteItem } from "@/components/interviews/noteItem";
import {
  mapTimelineResponse,
  type InterviewTimelineResponse,
} from "@/lib/interviews/timeline-dto";

type RightPanelProps = {
  interviewId: string;
  initialTimeline: InterviewTimelineResponse;
};

export default function RightPanel({
  interviewId,
  initialTimeline,
}: RightPanelProps) {
  const data = useMemo(
    () => mapTimelineResponse(initialTimeline),
    [initialTimeline]
  );

  return (
    <div className="space-y-3 max-h-dvh overflow-y-auto">
      {data.timeline.map((item) =>
        item.kind === "step" ? (
          <StepItem key={item.id} step={item} interviewId={interviewId} />
        ) : (
          <NoteItem key={item.id} note={item} interviewId={interviewId} />
        )
      )}
    </div>
  );
}