import React from "react";
import { render, screen } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import TermsPrivacy from "../Components/LoginRegister/TermsPrivacy/TermsPrivacy";

test("renders Al Taalim branding and legal links correctly", () => {
  render(
    <BrowserRouter>
      <TermsPrivacy info="By registering" />
    </BrowserRouter>
  );

  expect(screen.getByText(/Al Taalim/i)).toBeInTheDocument();
  expect(screen.getByText(/Terms of use/i)).toBeInTheDocument();
  expect(screen.getByText(/Privacy Policy/i)).toBeInTheDocument();
});
