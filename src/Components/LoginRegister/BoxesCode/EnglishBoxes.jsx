import React from "react";

function EnglishBoxes({ isFound, dataError, otp, handleOtp }) {
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

export default EnglishBoxes;
