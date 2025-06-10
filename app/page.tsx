"use client";

import { Plane, RefreshCw } from "lucide-react";
import { useMemo, useState } from "react";

import { useFlights } from "@/hooks/use-flights";
import Image from "next/image";

import { FlightCard } from "@/components/flight-card";
import { FlightsTable } from "@/components/flights-table";
import { LoadingSkeleton } from "@/components/loading-skeleton";
import { Pagination } from "@/components/pagination";
import { StatusFilter } from "@/components/status-filter";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";

import type { FlightStatus } from "@/types/flight";

export default function FlightDashboard() {
  const [statusFilter, setStatusFilter] = useState<FlightStatus>("all");
  const [refreshDisabled, setRefreshDisabled] = useState<boolean>(false);
  const {
    flights,
    loading,
    error,
    total,
    currentPage,
    totalPages,
    nextPage,
    prevPage,
    canGoNext,
    canGoPrev,
    fetchFlights,
  } = useFlights({ limit: 10 });

  const filteredFlights = useMemo(() => {
    if (statusFilter === "all") return flights;

    return flights.filter((flight) => flight.status === statusFilter);
  }, [flights, statusFilter]);

  const handleRefresh = () => {
    if (refreshDisabled) return;

    const currentOffset = (currentPage - 1) * 10;

    fetchFlights(currentOffset);
    setRefreshDisabled(true);

    setTimeout(() => {
      setRefreshDisabled(false);
    }, 300000);
  };

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-8">
          <div className="p-2 ">
            <Image
              src="/logo.png"
              alt="IAG Group Logo"
              width={100}
              height={50}
              className="w-full h-full object-contain text-primary"
            />
          </div>

          <div className="flex items-center gap-3">
            <div className="p-2 bg-primary/10 rounded-lg">
              <Plane className="w-5 h-5 text-primary" />
            </div>

            <div>
              <h1 className="text-2xl font-bold">Flight Status Dashboard</h1>
              <p className="text-muted-foreground">
                Real-time flight information and status updates
              </p>
            </div>
          </div>
          <Button
            variant="outline"
            onClick={handleRefresh}
            disabled={loading || refreshDisabled}
            className="flex items-center gap-2"
          >
            <RefreshCw className={`w-4 h-4 ${loading ? "animate-spin" : ""}`} />
            {refreshDisabled ? "Please wait 5 minutes..." : "Refresh"}
          </Button>
        </div>

        {/* Filters and Status */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
          <StatusFilter value={statusFilter} onValueChange={setStatusFilter} />
          <div className="text-sm text-muted-foreground">
            {loading ? (
              "Loading flights..."
            ) : error ? (
              "Unable to load flight data"
            ) : (
              <>
                Showing {filteredFlights.length} of {total} flights
                {statusFilter !== "all" && ` (filtered by ${statusFilter})`}
              </>
            )}
          </div>
        </div>

        {error && (
          <Alert className="mb-6" variant="destructive">
            <AlertDescription>
              {error}. Please try refreshing the page or contact support if the
              problem persists.
            </AlertDescription>
          </Alert>
        )}

        {loading && <LoadingSkeleton />}

        {/* Content */}
        {!loading && !error && (
          <>
            {filteredFlights.length === 0 ? (
              <div className="text-center py-12">
                <Plane className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
                <h3 className="text-lg font-semibold mb-2">No flights found</h3>
                <p className="text-muted-foreground">
                  {statusFilter !== "all"
                    ? `No flights with status "${statusFilter}" found.`
                    : "No flights are currently available."}
                </p>
              </div>
            ) : (
              <>
                {/* Desktop Table View */}
                <div className="hidden md:block mb-6">
                  <FlightsTable flights={filteredFlights} />
                </div>

                {/* Mobile Card View */}
                <div className="md:hidden space-y-4 mb-6">
                  {filteredFlights.map((flight) => (
                    <FlightCard key={flight.id} flight={flight} />
                  ))}
                </div>

                {/* Pagination */}
                {totalPages > 1 && (
                  <Pagination
                    currentPage={currentPage}
                    totalPages={totalPages}
                    onPrevious={prevPage}
                    onNext={nextPage}
                    canGoPrev={canGoPrev}
                    canGoNext={canGoNext}
                    loading={loading}
                  />
                )}
              </>
            )}
          </>
        )}
      </div>
    </div>
  );
}
