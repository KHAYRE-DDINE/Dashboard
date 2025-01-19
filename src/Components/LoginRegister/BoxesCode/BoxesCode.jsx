import React, { useContext, useEffect, useState } from "react";
import "./BoxesCode.css";
import { LanguageContext } from "../../../App";

function BoxesCode({ dataError, isFound, setCodeClass, setIsFull }) {
  const language = useContext(LanguageContext);
  const [otp, setOtp] = useState(new Array(8).fill(""));

  const handleOtp = (e, idx) => {
    setOtp([
      ...otp.map((data, index) => (index === idx ? e.target.value : data)),
    ]);
    if (e.target.value && e.target.nextSibling) {
      e.target.nextSibling.focus();
    }
    if (
      e.key === "Backspace" &&
      e.target.previousSibling &&
      e.target.value === ""
    ) {
      e.target.previousSibling.focus();
    }

    if (e.target.nextSibling === null && e.target.value) {
      setIsFull(true);
    } else {
      setIsFull(false);
    }
  };

  useEffect(() => {
    setCodeClass(otp);
  }, [otp]);

  return (
    <div
      className={isFound ? "password" : "error password"}
      data-error={dataError}
    >
      {otp.map((o, idx) => (
        <input
          className={/[\W_]/.test(o) ? "err" : ""}
          key={idx}
          type="text"
          maxLength={1}
          placeholder="_ "
          onChange={(e) => handleOtp(e, idx)}
          onKeyDown={(e) => handleOtp(e)}
        />
      ))}
    </div>
  );
}

export default BoxesCode;
