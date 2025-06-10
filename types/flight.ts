export interface ApiFlightResponse {
  flight_date: string;
  flight_status: string;
  departure: {
    airport: string | null;
    timezone: string | null;
    iata: string;
    icao: string;
    terminal: string | null;
    gate: string | null;
    baggage: string | null;
    delay: number | null;
    scheduled: string;
    estimated: string | null;
    actual: string | null;
    estimated_runway: string | null;
    actual_runway: string | null;
  };
  arrival: {
    airport: string;
    timezone: string | null;
    iata: string;
    icao: string;
    terminal: string | null;
    gate: string | null;
    baggage: string | null;
    delay: number | null;
    scheduled: string;
    estimated: string | null;
    actual: string | null;
    estimated_runway: string | null;
    actual_runway: string | null;
  };
  airline: {
    name: string;
    iata: string | null;
    icao: string | null;
  };
  flight: {
    number: string | null;
    iata: string | null;
    icao: string | null;
    codeshared: {
      airline_name: string;
      airline_iata: string;
      airline_icao: string;
      flight_number: string;
      flight_iata: string;
      flight_icao: string;
    } | null;
  };
  aircraft: any;
  live: any;
}

export interface ApiPaginationResponse {
  limit: number;
  offset: number;
  count: number;
  total: number;
}

// Normalized Flight Types for UI
export interface Flight {
  id: string;
  flightNumber: string;
  airline: string;
  departureAirport: string | null;
  departureAirportCode: string;
  departureTime: string;
  departureGate: string | null;
  arrivalAirport: string;
  arrivalAirportCode: string;
  arrivalTime: string;
  arrivalGate: string | null;
  status: FlightStatusType;
  delay: number | null;
  isCodeshared: boolean;
  codesharedInfo?: {
    airline: string;
    flightNumber: string;
  };
}

export type FlightStatusType =
  | "scheduled"
  | "active"
  | "landed"
  | "cancelled"
  | "incident"
  | "diverted";

export type FlightStatus = FlightStatusType | "all";

export interface UseFlightsReturn {
  flights: Flight[];
  loading: boolean;
  error: string | null;
  total: number;
  currentPage: number;
  totalPages: number;
  fetchFlights: (offset: number) => Promise<void>;
  nextPage: () => void;
  prevPage: () => void;
  canGoNext: boolean;
  canGoPrev: boolean;
}

export interface UseFlightsOptions {
  limit?: number;
  initialOffset?: number;
}
