import React, { useContext } from "react";
import "./LoginMethod.css";

import { LanguageContext } from "../../../App";
import EnglishMethod from "./EnglishMethod";
import ArabicMethod from "./ArabicMethod";

function LoginMethod() {
  const language = useContext(LanguageContext);
  return (
    <React.Fragment>
      {language === "english" ? <EnglishMethod /> : <ArabicMethod />}
    </React.Fragment>
  );
}

export default LoginMethod;
