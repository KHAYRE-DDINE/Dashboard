import { useState, useContext } from "react";
import icon from "../../../../../../images/logo.svg";
import { LanguageContext } from "../../../../../../App";
import EnglishResources from "./EnglishResources";
import ArabicResources from "./ArabicResources";

import { clsx } from "clsx";
import { twMerge } from "tailwind-merge";
export function cn(...inputs) {
  return twMerge(clsx(inputs));
}

function Completed() {
  const [subject, setSubject] = useState([
    {
      id: 1,
      icon: icon,
      subject: "arabic",
      description: "lorem jhdy mant moujs  ",
    },
    {
      id: 2,
      icon: icon,
      subject: "arabic",
      description: "lorem jhdy mant moujs  ",
    },
    {
      id: 3,
      icon: icon,
      subject: "arabic",
      description: "lorem jhdy mant moujs  ",
    },
  ]);
  const language = useContext(LanguageContext);

  return (
    <>
      {language === "english" ? (
        <EnglishResources subject={subject} />
      ) : (
        <ArabicResources subject={subject} />
      )}
    </>
  );
}

export default Completed;
