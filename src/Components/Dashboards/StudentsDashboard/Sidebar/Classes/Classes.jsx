import React, { useContext, useState } from "react";
import "./Classes.css";
import icon from "../../../../../images/logo.svg";
import EnglishClasses from "./EnglishClasses";
import ArabicClasses from "./ArabicClasses";
import { LanguageContext } from "../../../../../App";
import { clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs) {
  return twMerge(clsx(inputs));
}

function Classes() {
  const language = useContext(LanguageContext);
  const [subject, setSubject] = useState([
    {
      id: 1,
      icon: icon,
      subject: "arabic",
      student: "khalid al walid",
    },
    {
      id: 2,
      icon: icon,
      subject: "physics",
      student: "khalid al walid",
    },
    {
      id: 3,
      icon: icon,
      subject: "math",
      student: "khalid al walid",
    },
    {
      id: 4,
      icon: icon,
      subject: "physics",
      student: "khalid al walid",
    },
    {
      id: 5,
      icon: icon,
      subject: "arabic",
      student: "khalid al walid",
    },
    {
      id: 6,
      icon: icon,
      subject: "physics",
      student: "khalid al walid",
    },
    {
      id: 7,
      icon: icon,
      subject: "math",
      student: "khalid al walid",
    },
  ]);
  const subjectFill = {
    math: "bg-blue-100 text-blue-600",
    physics: "bg-red-100 text-red-600",
    arabic: "bg-yellow-100 text-yellow-600",
  };

  return (
    <div>
      {language === "english" ? (
        <EnglishClasses subject={subject} subjectFill={subjectFill} cn={cn} />
      ) : (
        <ArabicClasses subject={subject} subjectFill={subjectFill} cn={cn} />
      )}
    </div>
  );
}

export default Classes;
