import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { FlightStatusBadge } from "./flight-status-badge"
import { Users, MapPin } from "lucide-react"
import type { Flight } from "@/types/flight"

interface FlightsTableProps {
  flights: Flight[]
}

export function FlightsTable({ flights }: FlightsTableProps) {
  const formatDateTime = (dateString: string) => {
    const date = new Date(dateString)
    return {
      date: date.toLocaleDateString("en-US", { month: "short", day: "numeric" }),
      time: date.toLocaleTimeString("en-US", { hour: "2-digit", minute: "2-digit", hour12: false }),
    }
  }

  return (
    <div className="rounded-md border">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="font-semibold">Flight</TableHead>
            <TableHead className="font-semibold">Airline</TableHead>
            <TableHead className="font-semibold">Departure</TableHead>
            <TableHead className="font-semibold">Arrival</TableHead>
            <TableHead className="font-semibold">Status</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {flights.map((flight) => {
            const departure = formatDateTime(flight.departureTime)
            const arrival = formatDateTime(flight.arrivalTime)

            return (
              <TableRow key={flight.id} className="hover:bg-muted/50">
                <TableCell className="font-medium">
                  <div className="flex items-center gap-2">
                    <span>{flight.flightNumber}</span>
                    {flight.isCodeshared && (
                      <span className="text-xs bg-muted px-1.5 py-0.5 rounded flex items-center gap-1">
                        <Users className="w-3 h-3" />
                        CS
                      </span>
                    )}
                  </div>
                  {flight.isCodeshared && flight.codesharedInfo && (
                    <div className="text-xs text-muted-foreground">via {flight.codesharedInfo.flightNumber}</div>
                  )}
                </TableCell>
                <TableCell>
                  <div>
                    <div>{flight.airline}</div>
                    {flight.isCodeshared && flight.codesharedInfo && (
                      <div className="text-xs text-muted-foreground">Op. by {flight.codesharedInfo.airline}</div>
                    )}
                  </div>
                </TableCell>
                <TableCell>
                  <div>
                    <div className="font-medium flex items-center gap-1">
                      {flight.departureAirportCode}
                      {flight.departureGate && (
                        <span className="text-xs text-muted-foreground flex items-center gap-1">
                          <MapPin className="w-3 h-3" />
                          {flight.departureGate}
                        </span>
                      )}
                    </div>
                    <div className="text-sm text-muted-foreground">{flight.departureAirport}</div>
                    <div className="text-sm text-muted-foreground">
                      {departure.date} • {departure.time}
                    </div>
                  </div>
                </TableCell>
                <TableCell>
                  <div>
                    <div className="font-medium flex items-center gap-1">
                      {flight.arrivalAirportCode}
                      {flight.arrivalGate && (
                        <span className="text-xs text-muted-foreground flex items-center gap-1">
                          <MapPin className="w-3 h-3" />
                          {flight.arrivalGate}
                        </span>
                      )}
                    </div>
                    <div className="text-sm text-muted-foreground">{flight.arrivalAirport}</div>
                    <div className="text-sm text-muted-foreground">
                      {arrival.date} • {arrival.time}
                    </div>
                  </div>
                </TableCell>
                <TableCell>
                  <div className="space-y-1">
                    <FlightStatusBadge status={flight.status} />
                    {flight.delay && <div className="text-xs text-orange-600">+{flight.delay}min delay</div>}
                  </div>
                </TableCell>
              </TableRow>
            )
          })}
        </TableBody>
      </Table>
    </div>
  )
}
