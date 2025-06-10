import { fireEvent, render, screen } from "@testing-library/react";

import FlightDashboard from "@/app/page";
import { Flight } from "@/types/flight";

import "@testing-library/jest-dom";

type MockReturnValue = {
  flights: Flight[];
  loading: boolean;
  error: string | null;
  total: number;
  currentPage: number;
  totalPages: number;
  nextPage: jest.Mock;
  prevPage: jest.Mock;
  canGoNext: boolean;
  canGoPrev: boolean;
  fetchFlights: jest.Mock;
};

const fetchFlightsMock = jest.fn();
let mockReturnValue: MockReturnValue;

jest.mock("@/hooks/use-flights", () => ({
  useFlights: () => mockReturnValue,
}));

describe("FlightDashboard - UI (with mocked useFlights)", () => {
  beforeEach(() => {
    fetchFlightsMock.mockClear();
  });

  mockReturnValue = {
    flights: [],
    loading: false,
    error: null,
    total: 0,
    currentPage: 1,
    totalPages: 1,
    nextPage: jest.fn(),
    prevPage: jest.fn(),
    canGoNext: false,
    canGoPrev: false,
    fetchFlights: fetchFlightsMock,
  };

  it("calls fetchFlights when Refresh is clicked", () => {
    render(<FlightDashboard />);
    fireEvent.click(screen.getByRole("button", { name: /refresh/i }));
    expect(fetchFlightsMock).toHaveBeenCalled();
  });

  it("shows loading skeleton when loading", () => {
    mockReturnValue.loading = true;

    render(<FlightDashboard />);
    expect(screen.getByTestId("loading-skeleton")).toBeInTheDocument();
  });

  it("shows an error if not flight is fetch", () => {
    mockReturnValue.error = "An unexpected error occurred";

    render(<FlightDashboard />);
    expect(screen.getByRole("alert")).toBeInTheDocument();
    expect(
      screen.getByText(
        /An unexpected error occurred. please try refreshing the page or contact support/i
      )
    ).toBeInTheDocument();
  });

  it("shows message when no flights match status filter", async () => {
    mockReturnValue = {
      ...mockReturnValue,
      flights: [
        {
          id: "abc",
          flightNumber: "34556",
          airline: "IAG",
          departureAirport: "LHR",
          departureAirportCode: "LHR",
          departureTime: "2024-03-01T10:00:00Z",
          departureGate: "A1",
          arrivalAirport: "JFK",
          arrivalAirportCode: "JFK",
          arrivalTime: "2024-03-01T12:00:00Z",
          arrivalGate: "B2",
          status: "cancelled",
          delay: 15,
          isCodeshared: false,
        },
      ],
      loading: false,
      error: null,
      total: 1,
    };
    window.HTMLElement.prototype.scrollIntoView = jest.fn();

    render(<FlightDashboard />);

    // Select flight status
    const trigger = screen.getByRole("combobox");
    fireEvent.click(trigger);

    const scheduledOption = await screen.findByText("Scheduled");
    fireEvent.click(scheduledOption);

    expect(screen.getByText(/no flights with status/i)).toBeInTheDocument();
  });
});
