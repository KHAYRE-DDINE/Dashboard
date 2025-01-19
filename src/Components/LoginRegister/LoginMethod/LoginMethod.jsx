import React, { useContext } from "react";
import "./LoginMethod.css";
import { FcGoogle } from "react-icons/fc";
import { FaFacebook } from "react-icons/fa6";
import { FaApple } from "react-icons/fa";

function LoginMethod() {
  return (
    <div className="way">
      <a className="gmail" href="#">
        <FcGoogle />
        Continue with google
      </a>
      <a className="apple" href="#">
        <FaApple />
        Continue with apple
      </a>
      <a className="facebook" href="#">
        <FaFacebook />
        Continue with facebook
      </a>
    </div>
  );
}

export default LoginMethod;
