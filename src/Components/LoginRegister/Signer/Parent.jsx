import React, { useContext, useState } from "react";
import { LanguageContext } from "../../../App";
import EnglishParent from "./EnglishParent";
import ArabicParent from "./ArabicParent";

function Parent() {
  const language = useContext(LanguageContext);
  const [withEmail, setWithEmail] = useState(false);
  return (
    <React.Fragment>
      {language === "english" ? (
        <EnglishParent withEmail={withEmail} setWithEmail={setWithEmail} />
      ) : (
        <ArabicParent withEmail={withEmail} setWithEmail={setWithEmail} />
      )}
    </React.Fragment>
  );
}

export default Parent;
