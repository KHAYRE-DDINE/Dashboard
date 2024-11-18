import React from "react";
import { Link } from "react-router-dom";
import LoginMethod from "../LoginMethod/LoginMethod";
import Steps from "../Steps/Steps";
import Signer from "./Signer";

function ArabicTeacher({ withEmail, setWithEmail }) {
  return (
    <div className="teacher">
      {!withEmail ? (
        <React.Fragment>
          <Signer />
          <LoginMethod />
          <Link className="other" to="steps">
            التسجيل بالبريد الإلكتروني
          </Link>
        </React.Fragment>
      ) : (
        <Steps setWithEmail={setWithEmail} />
      )}
    </div>
  );
}

export default ArabicTeacher;
