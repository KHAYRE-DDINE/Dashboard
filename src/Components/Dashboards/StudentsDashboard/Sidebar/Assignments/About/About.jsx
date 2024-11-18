import React, { useContext } from "react";
import "./About.css";
import ArabicAbout from "./ArabicAbout";
import EnglishAbout from "./EnglishAbout";
import { LanguageContext } from "../../../../../../App";

function Archived() {
  const language = useContext(LanguageContext);

  return (
    <div>{language === "english" ? <EnglishAbout /> : <ArabicAbout />}</div>
  );
}

export default Archived;
