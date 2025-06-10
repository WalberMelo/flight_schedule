import { render, renderHook, waitFor } from "@testing-library/react";

import FlightDashboard from "@/app/page";
import { useFlights } from "@/hooks/use-flights";

import "@testing-library/jest-dom";

describe("FlightDashboard - Fetch flight", () => {
  it("fetchFlights sets flights and pagination", async () => {
    render(<FlightDashboard />);
    const { result } = renderHook(() => useFlights({ limit: 10 }));

    await waitFor(() => {
      expect(result.current.flights.length).toBeGreaterThan(0);
      expect(result.current.loading).toBe(false);
      expect(result.current.total).toBeGreaterThan(0);
    });
  });
});
