import React, { useContext, useState } from "react";
import { LanguageContext } from "../../../App";
import Signer from "./Signer";
import LoginMethod from "../LoginMethod/LoginMethod";
import { Link } from "react-router-dom";
import Steps from "../Steps/Steps";

function Parent() {
  const language = useContext(LanguageContext);
  const [withEmail, setWithEmail] = useState(false);
  return (
    <div className="parent">
      {!withEmail ? (
        <React.Fragment>
          <Signer />
          <LoginMethod />
          <Link to="Steps" className="other">
            Sign up with email
          </Link>
        </React.Fragment>
      ) : (
        <Steps setWithEmail={setWithEmail} />
      )}
    </div>
  );
}

export default Parent;
