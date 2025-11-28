"use client";

import { useFormStatus } from "react-dom";
import { Button } from "@/components/ui/button";
import { Trash2 } from "lucide-react";

export function DeleteInterviewButton() {
  const { pending } = useFormStatus();
  return (
    <Button
      type="submit"
      variant="ghost"
      size="sm"
      className="text-destructive hover:text-destructive"
      disabled={pending}
    >
      <Trash2 className="mr-2 h-4 w-4" />
      {pending ? "Eliminando..." : "Eliminar"}
    </Button>
  );
}

