import React from "react";
import Signer from "./Signer";
import LoginMethod from "../LoginMethod/LoginMethod";
import { Link } from "react-router-dom";
import Steps from "../Steps/Steps";

function ArabicParent({ withEmail, setWithEmail }) {
  return (
    <div className="parent">
      {!withEmail ? (
        <React.Fragment>
          <Signer />
          <LoginMethod />
          <Link to="Steps" className="other">
            التسجيل بالبريد الإلكتروني
          </Link>
        </React.Fragment>
      ) : (
        <Steps setWithEmail={setWithEmail} />
      )}
    </div>
  );
}

export default ArabicParent;
