import React, { useContext, createContext } from "react";
import "./Register.css";
import { idPersonContext } from "../LoginRegister";
import TermsPrivacy from "../TermsPrivacy/TermsPrivacy";
import Learner from "../Signer/Learner";
import Teacher from "../Signer/Teacher";
import Parent from "../Signer/Parent";

export const setEmailContext = createContext();
export const valueEmailContext = createContext();

function Register() {
  const idContext = useContext(idPersonContext);

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

export default Register;
