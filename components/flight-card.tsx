import { Card, CardContent } from "@/components/ui/card"
import { FlightStatusBadge } from "./flight-status-badge"
import { Plane, Clock, MapPin, Users } from "lucide-react"
import type { Flight } from "@/types/flight"

interface FlightCardProps {
  flight: Flight
}

export function FlightCard({ flight }: FlightCardProps) {
  const formatTime = (dateString: string) => {
    return new Date(dateString).toLocaleTimeString("en-US", {
      hour: "2-digit",
      minute: "2-digit",
      hour12: false,
    })
  }

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
    })
  }

  return (
    <Card className="w-full">
      <CardContent className="p-4">
        <div className="flex items-start justify-between mb-3">
          <div>
            <div className="flex items-center gap-2">
              <h3 className="font-semibold text-lg">{flight.flightNumber}</h3>
              {flight.isCodeshared && (
                <span className="text-xs bg-muted px-2 py-1 rounded">
                  <Users className="w-3 h-3 inline mr-1" />
                  Codeshare
                </span>
              )}
            </div>
            <p className="text-sm text-muted-foreground">{flight.airline}</p>
            {flight.isCodeshared && flight.codesharedInfo && (
              <p className="text-xs text-muted-foreground">
                Operated by {flight.codesharedInfo.airline} ({flight.codesharedInfo.flightNumber})
              </p>
            )}
          </div>
          <FlightStatusBadge status={flight.status} />
        </div>

        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <div className="flex-1">
              <div className="flex items-center gap-2 mb-1">
                <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                <span className="font-medium">{flight.departureAirportCode}</span>
              </div>
              <div className="text-sm text-muted-foreground mb-1">{flight.departureAirport}</div>
              <div className="flex items-center gap-1 text-sm text-muted-foreground">
                <Clock className="w-3 h-3" />
                <span>{formatTime(flight.departureTime)}</span>
                <span>•</span>
                <span>{formatDate(flight.departureTime)}</span>
              </div>
              {flight.departureGate && (
                <div className="flex items-center gap-1 text-xs text-muted-foreground mt-1">
                  <MapPin className="w-3 h-3" />
                  <span>Gate {flight.departureGate}</span>
                </div>
              )}
            </div>

            <div className="px-4">
              <Plane className="w-4 h-4 text-muted-foreground" />
            </div>

            <div className="flex-1 text-right">
              <div className="flex items-center justify-end gap-2 mb-1">
                <span className="font-medium">{flight.arrivalAirportCode}</span>
                <div className="w-2 h-2 bg-red-500 rounded-full"></div>
              </div>
              <div className="text-sm text-muted-foreground mb-1 text-right">{flight.arrivalAirport}</div>
              <div className="flex items-center justify-end gap-1 text-sm text-muted-foreground">
                <span>{formatDate(flight.arrivalTime)}</span>
                <span>•</span>
                <span>{formatTime(flight.arrivalTime)}</span>
                <Clock className="w-3 h-3" />
              </div>
              {flight.arrivalGate && (
                <div className="flex items-center justify-end gap-1 text-xs text-muted-foreground mt-1">
                  <span>Gate {flight.arrivalGate}</span>
                  <MapPin className="w-3 h-3" />
                </div>
              )}
            </div>
          </div>

          {flight.delay && (
            <div className="text-center">
              <span className="text-xs bg-orange-100 text-orange-800 px-2 py-1 rounded">
                Delayed by {flight.delay} minutes
              </span>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  )
}
