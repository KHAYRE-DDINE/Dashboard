import React from "react";
import { Link } from "react-router-dom";
import LoginMethod from "../LoginMethod/LoginMethod";
import Steps from "../Steps/Steps";
import Signer from "./Signer";

function EnglishTeacher({ withEmail, setWithEmail }) {
  return (
    <div className="teacher">
      {!withEmail ? (
        <React.Fragment>
          <Signer />
          <LoginMethod />
          <Link className="other" to="steps">
            Sign up with email
          </Link>
        </React.Fragment>
      ) : (
        <Steps setWithEmail={setWithEmail} />
      )}
    </div>
  );
}

export default EnglishTeacher;
