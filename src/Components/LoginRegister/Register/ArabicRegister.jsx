import React from "react";
import Learner from "../Signer/Learner";
import Teacher from "../Signer/Teacher";
import Parent from "../Signer/Parent";
import TermsPrivacy from "../TermsPrivacy/TermsPrivacy";

function ArabicRegister({ idContext }) {
  return (
    <div className="login Rg">
      <div className="wrapper">
        <div className="register text-right">
          <h1 className="title">تسجيل</h1>
          {idContext === 0 ? (
            <Learner />
          ) : idContext === 1 ? (
            <Teacher />
          ) : idContext === 2 ? (
            <Parent />
          ) : (
            ""
          )}

          <TermsPrivacy />
        </div>
      </div>
    </div>
  );
}

export default ArabicRegister;
