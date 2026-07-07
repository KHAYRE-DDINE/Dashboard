import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import "../Login/Login.css";
import "./ForgotPassword.css";
import TermsPrivacy from "../TermsPrivacy/TermsPrivacy";
import ResetPassword from "./ResetPassword/ResetPassword";

function ForgotPassword() {
  const [isMatched, setIsMatched] = useState(false);
  const [found, setFound] = useState(true);
  const location = useLocation();
  const [email, setEmail] = useState("");

  const navigate = useNavigate();

  const whileWriting = (event) => {
    const pattern = /^(.+)@(.+)\.([a-zA-Z]{2,})$/;
    setIsMatched(pattern.test(event.target.value));
    setEmail(event.target.value);
  };

  const handleFormTwo = async (e) => {
    e.preventDefault();
    navigate("password-reset");
    try {
      // let response = await axios.post("/forgot-password", { email });
    } catch (e) {
      if (e.response.status) {
        console.log(e.response.data.errors);
      }
    }

    if (email === "khirdin@gmail.com") {
      setFound(true);
    } else {
      setFound(false);
    }
  };

  return (
    <div className="login fgPassword">
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
    </div>
  );
}

export default ForgotPassword;
