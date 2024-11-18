import React, { useContext, useState } from "react";
import "./Learning.css";
import ArabicLearning from "./ArabicLearning";
import EnglishLearning from "./EnglishLearning";
import { LanguageContext } from "../../../../../../App";

function Learning() {
  const language = useContext(LanguageContext);
  return (
    <div>
      {language === "english" ? <EnglishLearning /> : <ArabicLearning />}
    </div>
  );
}

export default Learning;
