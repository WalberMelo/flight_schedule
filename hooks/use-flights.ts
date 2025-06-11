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
  const [total, setTotal] = useState<number>(0);
  const [currentOffset, setCurrentOffset] = useState(initialOffset);
  const API_BASE = process.env.NEXT_PUBLIC_API_BASE;

  const fetchFlights = useCallback(
    async (offset: number) => {
      try {
        setLoading(true);
        setError(null);

        const response = await fetch(
          `${API_BASE}/api/flights?limit=${limit}&offset=${offset}`
        );

        if (!response.ok) {
          throw new Error(
            `Failed to fetch flights: ${response.status} ${response.statusText}`
          );
        }

        const apiResponse = await response.json();
        const apiPagination: ApiPaginationResponse[] = apiResponse.pagination;
        const apiFlights: ApiFlightResponse[] = apiResponse.data;

        const pagination = apiPagination;
        const transformedFlights = apiFlights.map(transformApiFlightToFlight);

        setFlights(transformedFlights);
        setTotal(pagination[0]?.total ?? 0);
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
    [limit, API_BASE]
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
