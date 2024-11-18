import React from "react";

function ArabicBoxes({ isFound, dataError, otp, handleOtp }) {
  return (
    <div
      className={isFound ? "password" : "error password"}
      data-error={dataError}
      style={{ direction: "ltr" }}
    >
      {otp.map((o, idx) => (
        <input
          className={/\W/.test(o) ? "err" : ""}
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

export default ArabicBoxes;
