import React, { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import { FiRefreshCw, FiCheckCircle } from "react-icons/fi";
import { toast } from "react-toastify";
import "./BoxesCode.css";

function BoxesCode({ dataError, isFound, setCodeClass, setIsFull }) {
  const codeLength = 8;
  const [otp, setOtp] = useState(new Array(codeLength).fill(""));
  const inputRefs = useRef([]);
  const [timer, setTimer] = useState(60);
  const [canResend, setCanResend] = useState(false);

  // Countdown timer for OTP resend
  useEffect(() => {
    let interval = null;
    if (timer > 0) {
      interval = setInterval(() => {
        setTimer((prev) => prev - 1);
      }, 1000);
    } else {
      setCanResend(true);
      if (interval) clearInterval(interval);
    }
    return () => {
      if (interval) clearInterval(interval);
    };
  }, [timer]);

  const handleChange = (e, index) => {
    const val = e.target.value;
    if (/[^a-zA-Z0-9]/.test(val)) return;

    const newOtp = [...otp];
    newOtp[index] = val.substring(val.length - 1);
    setOtp(newOtp);

    // Auto advance focus
    if (val && index < codeLength - 1) {
      inputRefs.current[index + 1]?.focus();
    }
  };

  const handleKeyDown = (e, index) => {
    if (e.key === "Backspace") {
      if (!otp[index] && index > 0) {
        inputRefs.current[index - 1]?.focus();
      }
    } else if (e.key === "ArrowLeft" && index > 0) {
      inputRefs.current[index - 1]?.focus();
    } else if (e.key === "ArrowRight" && index < codeLength - 1) {
      inputRefs.current[index + 1]?.focus();
    }
  };

  const handlePaste = (e) => {
    e.preventDefault();
    const pasteData = e.clipboardData.getData("text").trim().replace(/[^a-zA-Z0-9]/g, "");
    if (!pasteData) return;

    const newOtp = [...otp];
    for (let i = 0; i < Math.min(pasteData.length, codeLength); i++) {
      newOtp[i] = pasteData[i];
    }
    setOtp(newOtp);

    const nextFocusIndex = Math.min(pasteData.length, codeLength - 1);
    inputRefs.current[nextFocusIndex]?.focus();
  };

  const handleResend = () => {
    if (!canResend) return;
    setOtp(new Array(codeLength).fill(""));
    setTimer(60);
    setCanResend(false);
    toast.info("A new OTP verification code has been sent!");
    inputRefs.current[0]?.focus();
  };

  useEffect(() => {
    setCodeClass(otp);
    const filledCount = otp.filter((val) => val !== "").length;
    setIsFull(filledCount === codeLength);
  }, [otp, setCodeClass, setIsFull]);

  return (
    <div className="boxesCode w-full flex flex-col gap-3 my-4">
      <div className="flex justify-between items-center px-1 mb-1">
        <span className="text-xs font-semibold text-gray-600 dark:text-gray-300">
          Enter 8-digit verification code
        </span>
        {otp.every((v) => v !== "") && (
          <span className="flex items-center gap-1 text-xs text-emerald-500 font-bold">
            <FiCheckCircle size={13} /> Complete
          </span>
        )}
      </div>

      <div className={`password flex justify-between gap-1.5 ${!isFound ? "error" : ""}`}>
        {otp.map((digit, idx) => (
          <motion.input
            whileFocus={{ scale: 1.05 }}
            key={idx}
            ref={(el) => (inputRefs.current[idx] = el)}
            type="text"
            maxLength={1}
            value={digit}
            onChange={(e) => handleChange(e, idx)}
            onKeyDown={(e) => handleKeyDown(e, idx)}
            onPaste={handlePaste}
            className={`w-9 h-11 sm:w-11 sm:h-12 text-center text-lg font-bold rounded-xl border outline-none transition-all duration-200 shadow-sm ${
              !isFound
                ? "border-rose-400 bg-rose-50 text-rose-600 dark:bg-rose-950/40 dark:border-rose-800 dark:text-rose-400"
                : digit
                ? "border-indigo-500 bg-indigo-50/50 text-indigo-700 dark:bg-indigo-950/40 dark:border-indigo-500 dark:text-indigo-300 shadow-indigo-100 dark:shadow-none"
                : "border-gray-200 dark:border-[#1e293b] bg-gray-50 dark:bg-[#151c2c] text-gray-800 dark:text-white focus:border-indigo-500 focus:bg-white dark:focus:bg-[#151c2c] focus:ring-2 focus:ring-indigo-500/20"
            }`}
          />
        ))}
      </div>

      {!isFound && dataError && (
        <p className="text-xs text-rose-500 font-medium px-1 mt-1">{dataError}</p>
      )}

      <div className="flex items-center justify-between px-1 mt-2 text-xs">
        <span className="text-gray-500 dark:text-gray-400 font-medium">
          Didn't receive the code?
        </span>
        <button
          type="button"
          onClick={handleResend}
          disabled={!canResend}
          className={`flex items-center gap-1 font-semibold transition-colors ${
            canResend
              ? "text-indigo-600 dark:text-indigo-400 hover:underline cursor-pointer"
              : "text-gray-400 dark:text-gray-500 cursor-not-allowed"
          }`}
        >
          <FiRefreshCw size={12} className={!canResend ? "animate-spin" : ""} />
          {canResend ? "Resend Code" : `Resend in ${timer}s`}
        </button>
      </div>
    </div>
  );
}

export default BoxesCode;
