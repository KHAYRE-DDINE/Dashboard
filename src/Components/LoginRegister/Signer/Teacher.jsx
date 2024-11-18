import React, { useContext, useState } from "react";
import "../LoginMethod/LoginMethod.css";

import { LanguageContext } from "../../../App";
import EnglishTeacher from "./EnglishTeacher";
import ArabicTeacher from "./ArabicTeacher";

function Teacher() {
  const language = useContext(LanguageContext);
  const [withEmail, setWithEmail] = useState(false);
  return (
    <React.Fragment>
      {language === "english" ? (
        <EnglishTeacher withEmail={withEmail} setWithEmail={setWithEmail} />
      ) : (
        <ArabicTeacher withEmail={withEmail} setWithEmail={setWithEmail} />
      )}
    </React.Fragment>
  );
}

export default Teacher;
