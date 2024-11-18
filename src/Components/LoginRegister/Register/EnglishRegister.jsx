import React from "react";
import Learner from "../Signer/Learner";
import Teacher from "../Signer/Teacher";
import Parent from "../Signer/Parent";
import TermsPrivacy from "../TermsPrivacy/TermsPrivacy";

function EnglishRegister({ idContext }) {
  return (
    <div className="login Rg">
      <div className="wrapper">
        <div className="register english">
          <h1 className="title">Sign up</h1>
          {idContext === 0 ? (
            <Learner />
          ) : idContext === 1 ? (
            <Teacher />
          ) : idContext === 2 ? (
            <Parent />
          ) : (
            ""
          )}
          <TermsPrivacy info="By signing up" />
        </div>
      </div>
    </div>
  );
}

export default EnglishRegister;
