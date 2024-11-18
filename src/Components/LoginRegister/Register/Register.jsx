import React, { useState, useContext, createContext } from "react";
import "./Register.css";

import { idPersonContext } from "../LoginRegister";
import { LanguageContext } from "../../../App";
import TermsPrivacy from "../TermsPrivacy/TermsPrivacy";
import EnglishRegister from "./EnglishRegister";
import ArabicRegister from "./ArabicRegister";

export const setEmailContext = createContext();
export const valueEmailContext = createContext();

function Register() {
  const language = useContext(LanguageContext);
  const idContext = useContext(idPersonContext);
  const [withEmail, setWithEmail] = useState(true);

  return (
    <setEmailContext.Provider value={setWithEmail}>
      <valueEmailContext.Provider value={withEmail}>
        {language === "english" ? (
          <EnglishRegister idContext={idContext} />
        ) : (
          <ArabicRegister idContext={idContext} />
        )}
      </valueEmailContext.Provider>
    </setEmailContext.Provider>
  );
}

export default Register;
