import React from "react";
import { FcGoogle } from "react-icons/fc";
import { FaFacebook } from "react-icons/fa6";
import { FaApple } from "react-icons/fa";

function ArabicMethod() {
  return (
    <div className="way">
      <a className="gmail" href="#">
        <FcGoogle />
        التسجيل بإستخدام غوغل
      </a>
      <a className="apple" href="#">
        <FaApple />
        التسجيل بإستخدام أبل
      </a>
      <a className="facebook" href="#">
        <FaFacebook />
        التسجيل بإستخدام فيسبوك
      </a>
    </div>
  );
}

export default ArabicMethod;
