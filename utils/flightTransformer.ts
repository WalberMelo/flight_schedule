import type { ApiFlightResponse, Flight } from "@/types/flight";

export function transformApiFlightToFlight(
  apiFlight: ApiFlightResponse
): Flight {
  // Generate a unique ID from available data
  const id =
    apiFlight.flight.iata ||
    `${apiFlight.airline.iata || "XX"}${apiFlight.flight.number || "XXXX"}` ||
    `${apiFlight.departure.iata}-${apiFlight.arrival.iata}-${apiFlight.flight_date}`;

  const flightNumber =
    apiFlight.flight.iata ||
    apiFlight.flight.icao ||
    (apiFlight.flight.number
      ? `${apiFlight.airline.iata || ""}${apiFlight.flight.number}`
      : "") ||
    apiFlight.flight.codeshared?.flight_iata ||
    "N/A";

  const airline =
    apiFlight.airline.name !== "empty"
      ? apiFlight.airline.name
      : apiFlight.flight.codeshared?.airline_name || "Unknown Airline";

  return {
    id,
    flightNumber,
    airline,
    departureAirport: apiFlight.departure.airport,
    departureAirportCode: apiFlight.departure.iata,
    departureTime: apiFlight.departure.scheduled,
    departureGate: apiFlight.departure.gate,
    arrivalAirport: apiFlight.arrival.airport,
    arrivalAirportCode: apiFlight.arrival.iata,
    arrivalTime: apiFlight.arrival.scheduled,
    arrivalGate: apiFlight.arrival.gate,
    status: apiFlight.flight_status as any,
    delay: apiFlight.departure.delay || apiFlight.arrival.delay,
    isCodeshared: !!apiFlight.flight.codeshared,
    codesharedInfo: apiFlight.flight.codeshared
      ? {
          airline: apiFlight.flight.codeshared.airline_name,
          flightNumber: apiFlight.flight.codeshared.flight_iata,
        }
      : undefined,
  };
}
