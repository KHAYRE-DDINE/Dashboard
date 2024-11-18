import React from "react";
import LoginMethod from "../LoginMethod/LoginMethod";
import { Link } from "react-router-dom";
import BoxesCode from "../BoxesCode/BoxesCode";
import TermsPrivacy from "../TermsPrivacy/TermsPrivacy";

function EnglishLogin({
  checkPAssValidation,
  handleLogin,
  changeInputs,
  whileWriting,
  info,
  theWay,
  setTheWay,
  isMatched,
  getPassword,
  setCodeClass,
  setIsFull,
  isCorrect,
  setInfo,
}) {
  return (
    <div className="wrapper">
      <div className="form">
        <h1 className="title">Log in</h1>
        <LoginMethod theWay={theWay} setTheWay={setTheWay} setInfo={setInfo} />
        <Link className="other" to="#" onClick={() => changeInputs()}>
          {theWay === "email"
            ? "Continue with email"
            : "Continue one time with password"}
        </Link>
        <span className="or">or</span>
        {theWay === "email" ? (
          <form className="inputs" onSubmit={(e) => handleLogin(e)}>
            <fieldset
              className={!isMatched ? "email error" : "email"}
              data-error={
                "Please enter a valid email format like example@mail.com"
              }
            >
              <label htmlFor="email-or-username">
                Email or username
                <b>*</b>
              </label>
              <input
                onChange={(event) => whileWriting(event)}
                value={info.email}
                type="email"
                name="email"
                placeholder="example@mail.com"
              />
            </fieldset>
            {getPassword ? (
              <fieldset className="get">
                <BoxesCode
                  setCodeClass={setCodeClass}
                  setIsFull={setIsFull}
                  isFound={isCorrect}
                  dataError="Error message."
                />
                <input
                  type="submit"
                  value="Login"
                  className={info.email !== "" && isMatched ? "blue" : ""}
                  onClick={() => checkPAssValidation()}
                />
              </fieldset>
            ) : (
              <input
                type="submit"
                value="Get Password"
                className={info.email !== "" && isMatched ? "blue" : ""}
              />
            )}
          </form>
        ) : (
          <form className="inputs" onSubmit={(e) => handleLogin(e)}>
            <fieldset
              className={!isMatched ? "email error" : "email"}
              data-error={
                "Please enter a valid email format like example@mail.com"
              }
            >
              <label htmlFor="email-or-username">
                Email or username
                <b>*</b>
              </label>
              <input
                onChange={(event) => whileWriting(event)}
                value={info.email}
                type="email"
                name="email"
                placeholder="example@mail.com"
              />
            </fieldset>
            <fieldset className="password">
              <label htmlFor="password">
                Password
                <b>*</b>
                <Link to="/forgot-password">Forgot password?</Link>
              </label>
              <input
                onChange={(event) =>
                  setInfo({ ...info, password: event.target.password })
                }
                type="password"
                name="password"
                placeholder="●●●●●●●●"
              />
            </fieldset>
            <input
              className={
                info.email !== "" && info.password !== "" && isMatched
                  ? "blue"
                  : ""
              }
              disabled={
                info.email !== "" && info.password !== "" && isMatched
                  ? false
                  : true
              }
              type="submit"
              value="Log in"
            />
          </form>
        )}
        <p>
          Don't have an account yet?
          <Link to="/register"> Create an account</Link>
        </p>

        <TermsPrivacy info="By logging in" />
      </div>
    </div>
  );
}

export default EnglishLogin;
