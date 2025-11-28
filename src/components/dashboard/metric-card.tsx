import { ReactNode } from "react";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

type MetricCardProps = {
  title: string;
  value: ReactNode;
  description?: string;
  trend?: ReactNode;
};

export function MetricCard({ title, value, description, trend }: MetricCardProps) {
  return (
    <Card className="glass-panel">
      <CardHeader className="space-y-2">
        <CardDescription>{title}</CardDescription>
        <CardTitle className="text-3xl">{value}</CardTitle>
      </CardHeader>
      {(description || trend) && (
        <CardContent className="text-sm text-muted-foreground">
          <div className="flex items-center justify-between">
            <span>{description}</span>
            {trend}
          </div>
        </CardContent>
      )}
    </Card>
  );
}

