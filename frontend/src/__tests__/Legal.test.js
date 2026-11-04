import React from "react";
import { render, screen } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import Terms from "../Components/Legal/Terms";
import Privacy from "../Components/Legal/Privacy";

describe("Legal Pages", () => {
  test("renders Terms of Service with Al Taalim branding", () => {
    render(
      <BrowserRouter>
        <Terms />
      </BrowserRouter>
    );

    expect(screen.getByText(/Al Taalim Terms of Service/i)).toBeInTheDocument();
    expect(screen.getByText(/Educational Services/i)).toBeInTheDocument();
  });

  test("renders Privacy Policy with data protection terms", () => {
    render(
      <BrowserRouter>
        <Privacy />
      </BrowserRouter>
    );

    expect(screen.getByText(/Al Taalim Privacy Policy/i)).toBeInTheDocument();
    expect(screen.getByText(/Information We Collect/i)).toBeInTheDocument();
  });
});
