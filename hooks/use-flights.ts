"use client";

import { useCallback, useEffect, useState } from "react";

import { transformApiFlightToFlight } from "@/utils/flightTransformer";

import type {
  Flight,
  ApiFlightResponse,
  ApiPaginationResponse,
  UseFlightsReturn,
  UseFlightsOptions,
} from "@/types/flight";

export function useFlights({
  limit = 10,
  initialOffset = 0,
}: UseFlightsOptions = {}): UseFlightsReturn {
  const [flights, setFlights] = useState<Flight[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [total, setTotal] = useState(0);
  const [currentOffset, setCurrentOffset] = useState(initialOffset);

  const fetchFlights = useCallback(
    async (offset: number) => {
      try {
        setLoading(true);
        setError(null);

        // const response = await fetch(
        //   `http://127.0.0.1:8000/api/flights?limit=${limit}&offset=${offset}`
        // );

        // if (!response.ok) {
        //   throw new Error(
        //     `Failed to fetch flights: ${response.status} ${response.statusText}`
        //   );
        // }

        // const apiResponse = await response.json();
        // const apiPagination: ApiPaginationResponse[] = apiResponse.pagination;
        // const apiFlights: ApiFlightResponse[] = apiResponse.data;

        //  TODO: Remove mock

        //! START:
        const apiFlights = [
          {
            flight_date: "2025-06-09",
            flight_status: "scheduled",
            departure: {
              airport: "Hyderabad Airport",
              timezone: "Asia/Kolkata",
              iata: "HYD",
              icao: "VOHS",
              terminal: null,
              gate: "26B",
              baggage: null,
              delay: null,
              scheduled: "2025-06-09T01:10:00+00:00",
              estimated: "2025-06-09T01:10:00+00:00",
              actual: null,
              estimated_runway: null,
              actual_runway: null,
            },
            arrival: {
              airport: "Suvarnabhumi International",
              timezone: "Asia/Bangkok",
              iata: "BKK",
              icao: "VTBS",
              terminal: null,
              gate: null,
              baggage: null,
              delay: null,
              scheduled: "2025-06-09T06:15:00+00:00",
              estimated: null,
              actual: null,
              estimated_runway: null,
              actual_runway: null,
            },
            airline: {
              name: "ANA",
              iata: "NH",
              icao: "ANA",
            },
            flight: {
              number: "5988",
              iata: "NH5988",
              icao: "ANA5988",
              codeshared: {
                airline_name: "thai airways international",
                airline_iata: "tg",
                airline_icao: "tha",
                flight_number: "330",
                flight_iata: "tg330",
                flight_icao: "tha330",
              },
            },
            aircraft: null,
            live: null,
          },
          {
            flight_date: "2025-06-09",
            flight_status: "scheduled",
            departure: {
              airport: "Sochi/Adler International Airport",
              timezone: "Europe/Moscow",
              iata: "AER",
              icao: "URSS",
              terminal: null,
              gate: null,
              baggage: null,
              delay: null,
              scheduled: "2025-06-09T01:05:00+00:00",
              estimated: "2025-06-09T01:05:00+00:00",
              actual: null,
              estimated_runway: null,
              actual_runway: null,
            },
            arrival: {
              airport: "Izhevsk",
              timezone: "Europe/Samara",
              iata: "IJK",
              icao: "USII",
              terminal: null,
              gate: null,
              baggage: null,
              delay: null,
              scheduled: "2025-06-09T05:10:00+00:00",
              estimated: null,
              actual: null,
              estimated_runway: null,
              actual_runway: null,
            },
            airline: {
              name: "Izhavia",
              iata: "I8",
              icao: "IZA",
            },
            flight: {
              number: "504",
              iata: "I8504",
              icao: "IZA504",
              codeshared: null,
            },
            aircraft: null,
            live: null,
          },
          {
            flight_date: "2025-06-09",
            flight_status: "scheduled",
            departure: {
              airport: "Sochi/Adler International Airport",
              timezone: "Europe/Moscow",
              iata: "AER",
              icao: "URSS",
              terminal: null,
              gate: null,
              baggage: null,
              delay: null,
              scheduled: "2025-06-09T01:00:00+00:00",
              estimated: "2025-06-09T01:00:00+00:00",
              actual: null,
              estimated_runway: null,
              actual_runway: null,
            },
            arrival: {
              airport: "Orenburg",
              timezone: "Asia/Yekaterinburg",
              iata: "REN",
              icao: "UWOO",
              terminal: null,
              gate: null,
              baggage: null,
              delay: null,
              scheduled: "2025-06-09T06:00:00+00:00",
              estimated: null,
              actual: null,
              estimated_runway: null,
              actual_runway: null,
            },
            airline: {
              name: "Pegas Fly",
              iata: "IK",
              icao: "KAR",
            },
            flight: {
              number: "431",
              iata: "IK431",
              icao: "KAR431",
              codeshared: null,
            },
            aircraft: null,
            live: null,
          },
          {
            flight_date: "2025-06-09",
            flight_status: "scheduled",
            departure: {
              airport: "Sochi/Adler International Airport",
              timezone: "Europe/Moscow",
              iata: "AER",
              icao: "URSS",
              terminal: null,
              gate: null,
              baggage: null,
              delay: null,
              scheduled: "2025-06-09T01:00:00+00:00",
              estimated: "2025-06-09T01:00:00+00:00",
              actual: null,
              estimated_runway: null,
              actual_runway: null,
            },
            arrival: {
              airport: "Orenburg",
              timezone: "Asia/Yekaterinburg",
              iata: "REN",
              icao: "UWOO",
              terminal: null,
              gate: null,
              baggage: null,
              delay: null,
              scheduled: "2025-06-09T06:00:00+00:00",
              estimated: null,
              actual: null,
              estimated_runway: null,
              actual_runway: null,
            },
            airline: {
              name: "Nordwind Airlines",
              iata: "N4",
              icao: "NWS",
            },
            flight: {
              number: "431",
              iata: "N4431",
              icao: "NWS431",
              codeshared: {
                airline_name: "pegas fly",
                airline_iata: "ik",
                airline_icao: "kar",
                flight_number: "431",
                flight_iata: "ik431",
                flight_icao: "kar431",
              },
            },
            aircraft: null,
            live: null,
          },
          {
            flight_date: "2025-06-09",
            flight_status: "active",
            departure: {
              airport: "Springhill",
              timezone: "Australia/Sydney",
              iata: "OAG",
              icao: "YORG",
              terminal: null,
              gate: null,
              baggage: null,
              delay: null,
              scheduled: "2025-06-09T00:30:00+00:00",
              estimated: "2025-06-09T00:30:00+00:00",
              actual: null,
              estimated_runway: null,
              actual_runway: null,
            },
            arrival: {
              airport: "Sydney Bankstown",
              timezone: "Australia/Sydney",
              iata: "BWU",
              icao: "YSBK",
              terminal: null,
              gate: null,
              baggage: null,
              delay: null,
              scheduled: "2025-06-09T00:51:00+00:00",
              estimated: null,
              actual: null,
              estimated_runway: null,
              actual_runway: null,
            },
            airline: {
              name: "empty",
              iata: null,
              icao: null,
            },
            flight: {
              number: null,
              iata: null,
              icao: null,
              codeshared: null,
            },
            aircraft: null,
            live: null,
          },
          {
            flight_date: "2025-06-09",
            flight_status: "scheduled",
            departure: {
              airport: "Henderson International",
              timezone: "Pacific/Guadalcanal",
              iata: "HIR",
              icao: "AGGH",
              terminal: null,
              gate: null,
              baggage: null,
              delay: null,
              scheduled: "2025-06-09T07:00:00+00:00",
              estimated: "2025-06-09T07:00:00+00:00",
              actual: null,
              estimated_runway: null,
              actual_runway: null,
            },
            arrival: {
              airport: "Gwaunaru'u",
              timezone: "Pacific/Guadalcanal",
              iata: "AKS",
              icao: "AGGA",
              terminal: null,
              gate: null,
              baggage: null,
              delay: null,
              scheduled: "2025-06-09T07:30:00+00:00",
              estimated: null,
              actual: null,
              estimated_runway: null,
              actual_runway: null,
            },
            airline: {
              name: "Solomon Airlines",
              iata: "IE",
              icao: "SOL",
            },
            flight: {
              number: "338",
              iata: "IE338",
              icao: "SOL338",
              codeshared: null,
            },
            aircraft: null,
            live: null,
          },
          {
            flight_date: "2025-06-09",
            flight_status: "cancelled",
            departure: {
              airport: "Henderson International",
              timezone: "Pacific/Guadalcanal",
              iata: "HIR",
              icao: "AGGH",
              terminal: null,
              gate: null,
              baggage: null,
              delay: null,
              scheduled: "2025-06-09T07:00:00+00:00",
              estimated: "2025-06-09T07:00:00+00:00",
              actual: null,
              estimated_runway: null,
              actual_runway: null,
            },
            arrival: {
              airport: "Kagau",
              timezone: "Pacific/Guadalcanal",
              iata: "KGE",
              icao: "AGKG",
              terminal: null,
              gate: null,
              baggage: null,
              delay: null,
              scheduled: "2025-06-09T08:20:00+00:00",
              estimated: null,
              actual: null,
              estimated_runway: null,
              actual_runway: null,
            },
            airline: {
              name: "Solomon Airlines",
              iata: "IE",
              icao: "SOL",
            },
            flight: {
              number: "306",
              iata: "IE306",
              icao: "SOL306",
              codeshared: null,
            },
            aircraft: null,
            live: null,
          },
          {
            flight_date: "2025-06-09",
            flight_status: "scheduled",
            departure: {
              airport: null,
              timezone: null,
              iata: "DWC",
              icao: "OMDW",
              terminal: null,
              gate: null,
              baggage: null,
              delay: null,
              scheduled: "2025-06-09T01:15:00+00:00",
              estimated: "2025-06-09T01:15:00+00:00",
              actual: null,
              estimated_runway: null,
              actual_runway: null,
            },
            arrival: {
              airport: "Hong Kong International",
              timezone: "Asia/Hong_Kong",
              iata: "HKG",
              icao: "VHHH",
              terminal: null,
              gate: null,
              baggage: null,
              delay: null,
              scheduled: "2025-06-09T13:35:00+00:00",
              estimated: null,
              actual: null,
              estimated_runway: null,
              actual_runway: null,
            },
            airline: {
              name: "Emirates",
              iata: "EK",
              icao: "UAE",
            },
            flight: {
              number: "9780",
              iata: "EK9780",
              icao: "UAE9780",
              codeshared: null,
            },
            aircraft: null,
            live: null,
          },
          {
            flight_date: "2025-06-09",
            flight_status: "scheduled",
            departure: {
              airport: "Turany",
              timezone: "Europe/Prague",
              iata: "BRQ",
              icao: "LKTB",
              terminal: null,
              gate: null,
              baggage: null,
              delay: 15,
              scheduled: "2025-06-09T00:05:00+00:00",
              estimated: "2025-06-09T00:05:00+00:00",
              actual: null,
              estimated_runway: null,
              actual_runway: null,
            },
            arrival: {
              airport: "Hurghada",
              timezone: "Africa/Cairo",
              iata: "HRG",
              icao: "HEGN",
              terminal: "1",
              gate: null,
              baggage: null,
              delay: null,
              scheduled: "2025-06-09T05:05:00+00:00",
              estimated: null,
              actual: null,
              estimated_runway: null,
              actual_runway: null,
            },
            airline: {
              name: "SmartLynx Airlines",
              iata: "6Y",
              icao: "ART",
            },
            flight: {
              number: "1440",
              iata: "6Y1440",
              icao: "ART1440",
              codeshared: null,
            },
            aircraft: null,
            live: null,
          },
          {
            flight_date: "2025-06-09",
            flight_status: "scheduled",
            departure: {
              airport: "Sultan Aji Muhamad Sulaiman Airport\r\n",
              timezone: null,
              iata: "BPN",
              icao: "WALL",
              terminal: null,
              gate: "D",
              baggage: null,
              delay: null,
              scheduled: "2025-06-09T06:00:00+00:00",
              estimated: "2025-06-09T06:00:00+00:00",
              actual: null,
              estimated_runway: null,
              actual_runway: null,
            },
            arrival: {
              airport: "Juanda",
              timezone: "Asia/Jakarta",
              iata: "SUB",
              icao: "WARR",
              terminal: "1",
              gate: null,
              baggage: null,
              delay: null,
              scheduled: "2025-06-09T06:30:00+00:00",
              estimated: null,
              actual: null,
              estimated_runway: null,
              actual_runway: null,
            },
            airline: {
              name: "Lion Air",
              iata: "JT",
              icao: "LNI",
            },
            flight: {
              number: "363",
              iata: "JT363",
              icao: "LNI363",
              codeshared: null,
            },
            aircraft: null,
            live: null,
          },
        ];

        const paginatedFlights = apiFlights.slice(offset, offset + limit);
        const apiPagination = {
          limit,
          offset,
          count: paginatedFlights.length,
          total: apiFlights.length,
        };
        //! END:

        const pagination = apiPagination;
        const transformedFlights = apiFlights.map(transformApiFlightToFlight);

        setFlights(transformedFlights);
        setTotal(pagination.total);
        setCurrentOffset(offset);
      } catch (err) {
        setError(
          err instanceof Error ? err.message : "An unexpected error occurred"
        );
        setFlights([]);
      } finally {
        setLoading(false);
      }
    },
    [limit]
  );

  useEffect(() => {
    fetchFlights(initialOffset);
  }, [fetchFlights, initialOffset]);

  const currentPage = Math.floor(currentOffset / limit) + 1;
  const totalPages = Math.ceil(total / limit);
  const canGoNext = currentOffset + limit < total;
  const canGoPrev = currentOffset > 0;

  const nextPage = useCallback(() => {
    if (canGoNext) {
      fetchFlights(currentOffset + limit);
    }
  }, [canGoNext, currentOffset, limit, fetchFlights]);

  const prevPage = useCallback(() => {
    if (canGoPrev) {
      fetchFlights(currentOffset - limit);
    }
  }, [canGoPrev, currentOffset, limit, fetchFlights]);

  return {
    flights,
    loading,
    error,
    total,
    currentPage,
    totalPages,
    fetchFlights,
    nextPage,
    prevPage,
    canGoNext,
    canGoPrev,
  };
}
