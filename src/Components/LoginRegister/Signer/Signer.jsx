import React, { useContext, useState } from "react";
import { idPersonContext, setIdPersonContext } from "../LoginRegister";
import { LanguageContext } from "../../../App";
import EnglishSigner from "./EnglishSigner";
import ArabicSigner from "./ArabicSigner";
function Signer() {
  const language = useContext(LanguageContext);
  const [person, setPerson] = useState(["learner", "teacher", "parent"]);
  const [personAr, setPersonAr] = useState(["متعلم", "معلم", "ولي أمر"]);
  const idContext = useContext(idPersonContext);
  const setIdContext = useContext(setIdPersonContext);

  return (
    <div>
      {language === "english" ? (
        <EnglishSigner
          person={person}
          setIdContext={setIdContext}
          idContext={idContext}
        />
      ) : (
        <ArabicSigner
          personAr={personAr}
          setIdContext={setIdContext}
          idContext={idContext}
        />
      )}
    </div>
  );
}

export default Signer;
