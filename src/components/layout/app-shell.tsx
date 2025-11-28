import { ReactNode } from "react";

import { Sidebar } from "@/components/layout/sidebar";
import { cn } from "@/lib/utils";

type AppShellProps = {
  title: string;
  description?: string;
  actions?: ReactNode;
  children: ReactNode;
  className?: string;
};

export function AppShell({
  title,
  description,
  actions,
  children,
  className,
}: AppShellProps) {
  return (
    <div className="min-h-screen bg-muted/30">
      <div className="grid min-h-screen gap-0 md:grid-cols-[240px_1fr]">
        <Sidebar />
        <div className="flex flex-1 flex-col">
          <header className="border-b bg-background px-6 py-6">
            <div className="flex flex-col gap-2 md:flex-row md:items-center md:justify-between">
              <div>
                <h1 className="text-2xl font-semibold tracking-tight">
                  {title}
                </h1>
                {description && (
                  <p className="text-sm text-muted-foreground">{description}</p>
                )}
              </div>
              {actions}
            </div>
          </header>
          <main className={cn("flex-1 px-6 py-8", className)}>{children}</main>
        </div>
      </div>
    </div>
  );
}

