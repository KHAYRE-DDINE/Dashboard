import React from "react";
import { render, screen } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import Header from "../Components/Header/Header";
import { AuthProvider } from "../Components/authentication/AuthContext";

test("renders Header with Al Taalim application name and search input", () => {
  render(
    <BrowserRouter>
      <AuthProvider>
        <Header sidebarWidth={240} setSidebarWidth={() => {}} />
      </AuthProvider>
    </BrowserRouter>
  );

  expect(screen.getByText(/Al Taalim/i)).toBeInTheDocument();
  expect(screen.getByPlaceholderText(/Search something\.\.\./i)).toBeInTheDocument();
});
