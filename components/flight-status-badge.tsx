import { Badge } from "@/components/ui/badge";

import type { FlightStatusType } from "@/types/flight";

interface FlightStatusBadgeProps {
  status: FlightStatusType;
}

const statusConfig = {
  scheduled: {
    variant: "secondary" as const,
    color: "bg-blue-100 text-blue-800 hover:bg-blue-100",
    label: "Scheduled",
  },
  active: {
    variant: "default" as const,
    color: "bg-green-100 text-green-800 hover:bg-green-100",
    label: "Active",
  },
  landed: {
    variant: "default" as const,
    color: "bg-gray-100 text-gray-800 hover:bg-gray-100",
    label: "Landed",
  },
  cancelled: {
    variant: "destructive" as const,
    color: "bg-red-100 text-red-800 hover:bg-red-100",
    label: "Cancelled",
  },
  incident: {
    variant: "destructive" as const,
    color: "bg-orange-100 text-orange-800 hover:bg-orange-100",
    label: "Incident",
  },
  diverted: {
    variant: "destructive" as const,
    color: "bg-yellow-100 text-yellow-800 hover:bg-yellow-100",
    label: "Diverted",
  },
};

export function FlightStatusBadge({ status }: FlightStatusBadgeProps) {
  const config = statusConfig[status] || statusConfig.scheduled;

  return (
    <Badge
      variant={config.variant}
      className={config.color}
      data-testid="badge-status"
    >
      {config.label}
    </Badge>
  );
}
