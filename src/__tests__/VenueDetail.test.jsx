import React from "react";
import { render, screen, waitFor } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import VenueDetail from "../pages/VenueDetail";
import { fetchVenueDetails } from "../api";
import { AuthContext } from "../context/AuthContext";
import { useParams } from "react-router-dom";

// Mock react-datepicker
jest.mock("react-datepicker", () => {
  const MockDatePicker = (props) => {
    return <input {...props} />;
  };
  MockDatePicker.displayName = "MockDatePicker";
  return {
    __esModule: true,
    default: MockDatePicker,
    registerLocale: jest.fn(),
  };
});

// Mock react-router-dom
jest.mock("react-router-dom", () => ({
  ...jest.requireActual("react-router-dom"),
  useParams: jest.fn(),
}));

// Mock the API module
jest.mock("../api", () => ({
  fetchVenueDetails: jest.fn(),
}));

describe("VenueDetailContent Component", () => {
  beforeAll(() => {
    jest.spyOn(console, "error").mockImplementation(() => {});
    jest.spyOn(console, "warn").mockImplementation(() => {});
  });

  afterAll(() => {
    jest.restoreAllMocks();
  });

  test("fetches and displays venue details when opened with an ID", async () => {
    useParams.mockReturnValue({ id: "1" });

    const mockVenue = {
      id: "1",
      name: "Test Venue",
      media: [
        {
          url: "https://via.placeholder.com/600x400",
          alt: "Test Venue Image",
        },
      ],
      description: "A beautiful venue for your stay.",
      price: 100,
      rating: 4.5,
      maxGuests: 4,
      meta: { wifi: true, parking: true, breakfast: false, pets: true },
      location: { city: "Oslo", country: "Norway" },
      owner: {
        name: "Owner Name",
        email: "owner@example.com",
        avatar: { url: "", alt: "" },
      },
      bookings: [],
    };

    // Mock the API response
    fetchVenueDetails.mockResolvedValueOnce(mockVenue);

    render(
      <AuthContext.Provider value={{ isLoggedIn: true }}>
        <BrowserRouter>
          <VenueDetail />
        </BrowserRouter>
      </AuthContext.Provider>,
    );

    // Wait for the venue details to load and assert
    await waitFor(() => {
      expect(screen.getByText(/test venue/i)).toBeInTheDocument();
      expect(
        screen.getByText(/a beautiful venue for your stay/i),
      ).toBeInTheDocument();
    });
  });
});
