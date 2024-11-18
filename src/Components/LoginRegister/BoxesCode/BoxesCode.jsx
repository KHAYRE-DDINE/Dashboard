import React, { useContext, useEffect, useState } from "react";
import "./BoxesCode.css";
import { LanguageContext } from "../../../App";
import EnglishBoxes from "./EnglishBoxes";
import ArabicBoxes from "./ArabicBoxes";

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
    <div className="boxesCode">
      {language === "english" ? (
        <EnglishBoxes
          handleOtp={handleOtp}
          dataError={dataError}
          isFound={isFound}
          otp={otp}
        />
      ) : (
        <ArabicBoxes
          handleOtp={handleOtp}
          dataError={dataError}
          isFound={isFound}
          otp={otp}
        />
      )}
    </div>
  );
}

export default BoxesCode;
