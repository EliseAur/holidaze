import React from "react";
import { render, screen, fireEvent, act } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import Register from "../pages/Register";
import { authRegister } from "../api/authRegister";

// Mock the authRegister API call
jest.mock("../api/authRegister", () => ({
  authRegister: jest.fn(),
}));

// Mock console.error to suppress error messages during tests
beforeAll(() => {
  jest.spyOn(console, "error").mockImplementation(() => {});
});

describe("Register Component", () => {
  /**
   * Test to verify that a user can successfully register without registering as a host.
   * This test mocks a successful API response and ensures that the form data
   * is submitted correctly to the `authRegister` function with `venueManager` set to `false`.
   *
   * @async
   * @function
   * @returns {Promise<void>} Resolves when the test completes.
   */
  test("allows the user to register successfully", async () => {
    // Mock the API response
    authRegister.mockResolvedValueOnce({ success: true });

    render(
      <BrowserRouter>
        <Register />
      </BrowserRouter>,
    );

    // Fill out the form
    fireEvent.change(screen.getByLabelText(/email/i), {
      target: { value: "user@stud.noroff.no" },
    });
    fireEvent.change(screen.getByLabelText(/username/i), {
      target: { value: "username" },
    });
    fireEvent.change(screen.getByLabelText(/password/i), {
      target: { value: "password123" },
    });

    // Submit the form
    await act(async () => {
      fireEvent.click(screen.getByRole("button", { name: /register/i }));
    });

    // Assert that the API was called with the correct data
    expect(authRegister).toHaveBeenCalledWith({
      email: "user@stud.noroff.no",
      name: "username",
      password: "password123",
      venueManager: false, // Default value
    });
  });

  /**
   * Test to verify that an error message is displayed when registration fails.
   * This test mocks a failed API response and ensures that the error message
   * is rendered on the screen when the API call rejects.
   *
   * @async
   * @function
   * @returns {Promise<void>} Resolves when the test completes.
   *
   * @example
   * // Simulate a failed registration
   * authRegister.mockRejectedValueOnce(new Error("Registration failed"));
   *
   * // Assert that the error message is displayed
   * const errorMessage = await screen.findByText(/registration failed/i);
   * expect(errorMessage).toBeInTheDocument();
   */
  test("shows an error message if registration fails", async () => {
    // Mock a failed API response
    authRegister.mockRejectedValueOnce(new Error("Registration failed"));

    render(
      <BrowserRouter>
        <Register />
      </BrowserRouter>,
    );

    // Fill out the form
    fireEvent.change(screen.getByLabelText(/email/i), {
      target: { value: "user@stud.noroff.no" },
    });
    fireEvent.change(screen.getByLabelText(/username/i), {
      target: { value: "username" },
    });
    fireEvent.change(screen.getByLabelText(/password/i), {
      target: { value: "password123" },
    });

    // Submit the form
    await act(async () => {
      fireEvent.click(screen.getByRole("button", { name: /register/i }));
    });

    // Assert that the error message is displayed
    const errorMessage = await screen.findByText(/registration failed/i);
    expect(errorMessage).toBeInTheDocument();
  });
});
