"use client"

import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Filter } from "lucide-react"
import type { FlightStatus } from "@/types/flight"

interface StatusFilterProps {
  value: FlightStatus
  onValueChange: (value: FlightStatus) => void
}

const statusOptions: { value: FlightStatus; label: string }[] = [
  { value: "all", label: "All Flights" },
  { value: "scheduled", label: "Scheduled" },
  { value: "active", label: "Active" },
  { value: "landed", label: "Landed" },
  { value: "cancelled", label: "Cancelled" },
  { value: "incident", label: "Incident" },
  { value: "diverted", label: "Diverted" },
]

export function StatusFilter({ value, onValueChange }: StatusFilterProps) {
  return (
    <div className="flex items-center gap-2">
      <Filter className="w-4 h-4 text-muted-foreground" />
      <Select value={value} onValueChange={onValueChange}>
        <SelectTrigger className="w-[180px]">
          <SelectValue placeholder="Filter by status" />
        </SelectTrigger>
        <SelectContent>
          {statusOptions.map((option) => (
            <SelectItem key={option.value} value={option.value}>
              {option.label}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  )
}
