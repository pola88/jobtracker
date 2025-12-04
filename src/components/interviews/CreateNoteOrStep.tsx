import Button from "@/components/Button";
import { PlusIcon } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { StepForm } from "@/components/interviews/step-form";
import { createInterviewStepAction } from "@/actions/interview-steps";
import { AddNoteForm } from "@/components/interviews/add-note-form";
import { useState } from "react";

type CreateNoteOrStepProps = {
  interviewId: string;
};

export const CreateNoteOrStep = ({ interviewId }: CreateNoteOrStepProps) => {
  const [open, setOpen] = useState<"note" | "step" | null>(null);

  const handleOpen = (type: "note" | "step") => {
    setOpen(type);
  };

  const handleSuccess = () => {
    setOpen(null);
  };

  return <div className="flex gap-2">
    <Button variant="outline" className="w-full" onClick={() => handleOpen("note")}>
      <PlusIcon className="h-4 w-4" />
      Crear nota
    </Button>
    <Button variant="outline" className="w-full" onClick={() => handleOpen("step")}>
      <PlusIcon className="h-4 w-4" />
      Crear paso
    </Button>
    <Dialog open={!!open} onOpenChange={() => setOpen(null)}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>{open === "note" ? "Crear nota" : "Crear paso"}</DialogTitle>
            <DialogDescription>
              {open === "note" && <AddNoteForm interviewId={interviewId} onSuccess={handleSuccess} />}
              {open === "step" && <StepForm action={createInterviewStepAction} interviewId={interviewId} submitLabel="Agregar paso" onSuccess={handleSuccess} />}
            </DialogDescription>
          </DialogHeader>
        </DialogContent>
      </Dialog>
  </div>
};