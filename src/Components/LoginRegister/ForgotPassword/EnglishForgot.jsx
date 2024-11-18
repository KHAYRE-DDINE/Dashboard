import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import TermsPrivacy from "../TermsPrivacy/TermsPrivacy";
import ResetPassword from "./ResetPassword/ResetPassword";

function EnglishForgot({
  isMatched,
  handleFormTwo,
  whileWriting,
  email,
  found,
  setEmail,
}) {
  const location = useLocation();
  const navigate = useNavigate();
  return (
    <div className="form forgot">
      <h1 className="title text-left">Forgot Password</h1>
      {location.pathname.includes("reset") ? (
        <ResetPassword email={email} setEmail={setEmail} />
      ) : (
        <form
          action="#"
          className="writeYourEmail"
          method="get"
          onSubmit={(e) => handleFormTwo(e)}
        >
          <fieldset
            className={!found ? "error mb-3 email" : "email"}
            data-error={
              "Sorry, we can't find an Al Rihla Academy account connected to " +
              email
            }
          >
            <label htmlFor="resetPassword" className="form-label">
              Enter your email to reset your password:
            </label>

            <input
              className="form-control"
              type="email"
              id="resetPassword"
              placeholder="example@mail.com"
              onChange={(e) => whileWriting(e)}
              autoComplete="off"
            />
          </fieldset>

          <fieldset>
            <button onClick={() => navigate(-1)}>back</button>
            <input
              type="submit"
              className={isMatched ? "blue" : ""}
              value="Reset password"
              disabled={isMatched ? false : true}
            />
          </fieldset>
        </form>
      )}
      <TermsPrivacy info="By signing up" />
    </div>
  );
}

export default EnglishForgot;
