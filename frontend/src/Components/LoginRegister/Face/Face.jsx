import React from "react";
import "./Face.css";
import { useLocation } from "react-router-dom";
import logo from "../../../images/logo.svg";

function Face() {
  const location = useLocation();
  return (
    <div
      className={`face md:w-[65%] bg-secondary-200 dark:bg-[#080b12] border-l dark:border-[#1e293b] flex justify-center items-center ${
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
          Join Al Taalim for <br /> the best E-learning
        </h1>
        <p>Log in to Al Taalim to get started!</p>
      </div>
    </div>
  );
}

export default Face;
