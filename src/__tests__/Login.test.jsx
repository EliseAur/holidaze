import React from "react";
import { render, screen, fireEvent, act } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import { useAuth } from "../context/useAuth";
import { authLogin } from "../api/authLogin";
import Login from "../pages/Login";

// Mock the useAuth hook
jest.mock("../context/useAuth", () => ({
  useAuth: jest.fn(),
}));

// Mock the authLogin API call
jest.mock("../api/authLogin", () => ({
  authLogin: jest.fn(),
}));

// Mock console.error to suppress error messages during tests
beforeAll(() => {
  jest.spyOn(console, "error").mockImplementation(() => {});
});

describe("Login Component", () => {
  let mockHandleLogin;

  beforeEach(() => {
    mockHandleLogin = jest.fn();
    useAuth.mockReturnValue({
      handleLogin: mockHandleLogin,
    });
  });

  /**
   * Test to verify that the login form is rendered correctly.
   * Ensures that the email input, password input, and login button are present.
   */
  test("renders the login form", () => {
    render(
      <BrowserRouter>
        <Login />
      </BrowserRouter>,
    );

    // Check if the email input is rendered
    const emailInput = screen.getByLabelText(/email/i);
    expect(emailInput).toBeInTheDocument();

    // Check if the password input is rendered
    const passwordInput = screen.getByLabelText(/password/i);
    expect(passwordInput).toBeInTheDocument();

    // Check if the login button is rendered
    const loginButton = screen.getByRole("button", { name: /login/i });
    expect(loginButton).toBeInTheDocument();
  });

  /**
   * Test to verify that a user can log in successfully.
   * Mocks a successful login and ensures that the handleLogin function is called with the correct data.
   *
   * @async
   * @function
   * @returns {Promise<void>} Resolves when the test completes.
   */
  test("allows the user to log in successfully", async () => {
    // Mock a successful API response
    authLogin.mockResolvedValueOnce({
      accessToken: "mockAccessToken",
      name: "mockUser",
      venueManager: false,
    });

    render(
      <BrowserRouter>
        <Login />
      </BrowserRouter>,
    );

    // Fill out the form
    fireEvent.change(screen.getByLabelText(/email/i), {
      target: { value: "user@stud.noroff.no" },
    });
    fireEvent.change(screen.getByLabelText(/password/i), {
      target: { value: "password123" },
    });

    // Submit the form
    await act(async () => {
      fireEvent.click(screen.getByRole("button", { name: /login/i }));
    });

    // Assert that handleLogin was called with the correct data
    expect(mockHandleLogin).toHaveBeenCalledWith(
      "mockAccessToken",
      "mockUser",
      false,
    );
  });

  /**
   * Test to verify that an error message is displayed when the user inputs a wrong password.
   * Mocks a failed login and ensures that the error message is rendered on the screen.
   *
   * @async
   * @function
   * @returns {Promise<void>} Resolves when the test completes.
   */
  test("shows an error message if login fails", async () => {
    // Mock a failed API response
    authLogin.mockRejectedValueOnce(new Error("Invalid email or password"));

    render(
      <BrowserRouter>
        <Login />
      </BrowserRouter>,
    );

    // Fill out the form
    fireEvent.change(screen.getByLabelText(/email/i), {
      target: { value: "user@stud.noroff.no" },
    });
    fireEvent.change(screen.getByLabelText(/password/i), {
      target: { value: "wrongpassword" },
    });

    // Submit the form
    await act(async () => {
      fireEvent.click(screen.getByRole("button", { name: /login/i }));
    });

    screen.debug(); // Inspect the DOM
    // Assert that the error message is displayed
    const errorMessage = await screen.findByText(/Invalid email or password/i);
    expect(errorMessage).toBeInTheDocument();
  });
});
