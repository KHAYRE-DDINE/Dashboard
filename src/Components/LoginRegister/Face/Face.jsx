import React, { useContext } from "react";
import "./Face.css";
import { LanguageContext } from "../../../App";
import EnglishFace from "./EnglishFace";
import ArabicFace from "./ArabicFace";

function Face() {
  const language = useContext(LanguageContext);

  return (
    <React.Fragment>
      {language === "english" ? <EnglishFace /> : <ArabicFace />}
    </React.Fragment>
  );
}

export default Face;
