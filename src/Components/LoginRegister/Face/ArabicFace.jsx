import React from "react";
import logo from "../../../images/logo.svg";
import { useLocation } from "react-router-dom";

function ArabicFace() {
  const location = useLocation();
  return (
    <div
      className={`face md:w-[65%] bg-secondary-200 flex justify-center items-center ${
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
          انضم إلى أكاديمية الرحلة للحصول <br /> على أفضل تعليم إلكتروني
        </h1>
        <p>قم بالتسجيل في أكاديمية الرحلة للبدء! لتعليم إلكتروني أفضل </p>
      </div>
    </div>
  );
}

export default ArabicFace;
