import React from "react";
import { useLocation } from "react-router-dom";
import logo from "../../../images/logo.svg";

function EnglishFace() {
  const location = useLocation();
  return (
    <div
      className={`face  md:w-[65%] bg-secondary-200 flex justify-center items-center ${
        location.pathname === "/login" || location.pathname === "/Login"
          ? "h-firstHeightFace"
          : location.pathname.includes("/register-by-username")
          ? "h-secondHeightFace"
          : ""
      }`}
    >
      <div className="info">
        <div className="logo">
          <img src={logo} alt="Logo" />
        </div>
        <h1>
          Join Al Rihla Academy for <br /> the best E-learning
        </h1>
        <p>Log in to Al Rihla Academy to get started!</p>
      </div>
    </div>
  );
}

export default EnglishFace;
