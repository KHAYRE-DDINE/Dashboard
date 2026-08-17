import React, { useEffect, useRef, useState } from "react";
import "./Login.css";
import useAuthContext from "../../authentication/AuthContext";
import { Link, useLocation } from "react-router-dom";
import TermsPrivacy from "../TermsPrivacy/TermsPrivacy";
import BoxesCode from "../BoxesCode/BoxesCode";
import LoginMethod from "../LoginMethod/LoginMethod";
import { FiLoader } from "react-icons/fi";

function Login() {
  const location = useLocation();
  const [theWay, setTheWay] = useState("withPassword");
  const [isMatched, setIsMatched] = useState(true);
  const [codeClass, setCodeClass] = useState([]);
  const [isFull, setIsFull] = useState(false);
  const [getPassword, setGetPassword] = useState(false);
  const { login, isFound, isPasswordCorrect, isLoading } = useAuthContext();
  const refInp = useRef();

  const [info, setInfo] = useState({
    email: "ahrarkhirdin@gmail.com",
  });

  const whileWriting = (event) => {
    const pattern = /^(.+)@(.+)\.([a-zA-Z]{2,})$/;
    setInfo({ ...info, [event.target.name]: event.target.value });
    setIsMatched(pattern.test(event.target.value));
  };

  const changeInputs = () => {
    setInfo({ ...info, email: "", password: "" });
    setTheWay(theWay === "email" ? "withPassword" : "email");
    setGetPassword(theWay === "email" && isMatched ? !getPassword : "");
  };

  const handleLogin = (event) => {
    event.preventDefault();

    login(info);
  };

  useEffect(() => {
    setInfo({ ...info, password: codeClass.join("") });
  }, [codeClass]);

  return (
    <div
      className={`login ${
        location.pathname === "/Login" || location.pathname === "/login"
          ? "h-[113vh]"
          : ""
      }`}
    >
      <div
        className={`login ${
          location.pathname === "/Login" || location.pathname === "/login"
            ? "h-[113vh]"
            : ""
        }`}
      >
        <div className="wrapper">
          <div className="form">
            <h1 className="title">Log in</h1>
            <LoginMethod
              theWay={theWay}
              setTheWay={setTheWay}
              setInfo={setInfo}
            />
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
                      isFound={isFound}
                      dataError="Error message."
                    />
                    <button
                      type="submit"
                      disabled={isLoading || info.email === "" || !isMatched}
                      className={`flex items-center justify-center gap-2 w-full py-3 rounded-xl font-bold transition-all ${
                        info.email !== "" && isMatched ? "blue bg-indigo-600 text-white" : ""
                      }`}
                    >
                      {isLoading ? (
                        <>
                          <FiLoader className="animate-spin text-lg" />
                          <span>Logging in...</span>
                        </>
                      ) : (
                        "Login"
                      )}
                    </button>
                  </fieldset>
                ) : (
                  <button
                    type="submit"
                    disabled={isLoading || info.email === "" || !isMatched}
                    className={`flex items-center justify-center gap-2 w-full py-3 rounded-xl font-bold transition-all ${
                      info.email !== "" && isMatched ? "blue bg-indigo-600 text-white" : ""
                    }`}
                  >
                    {isLoading ? (
                      <>
                        <FiLoader className="animate-spin text-lg" />
                        <span>Verifying...</span>
                      </>
                    ) : (
                      "Get Password"
                    )}
                  </button>
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
                    ref={refInp}
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
                      setInfo({ ...info, password: event.target.value })
                    }
                    type="password"
                    name="password"
                    ref={refInp}
                    value={info.password}
                    placeholder="●●●●●●●●"
                  />
                  {!isPasswordCorrect && (
                    <p className="text-required !mt-[-9px]">
                      Password is not correct
                    </p>
                  )}
                </fieldset>
                <button
                  type="submit"
                  disabled={
                    isLoading ||
                    !(info.email !== "" && info.password !== "" && isMatched)
                  }
                  className={`flex items-center justify-center gap-2 w-full py-3 rounded-xl font-bold transition-all ${
                    info.email !== "" && info.password !== "" && isMatched
                      ? "blue bg-indigo-600 text-white cursor-pointer"
                      : "opacity-50 cursor-not-allowed"
                  }`}
                >
                  {isLoading ? (
                    <>
                      <FiLoader className="animate-spin text-lg" />
                      <span>Logging in...</span>
                    </>
                  ) : (
                    "Log in"
                  )}
                </button>
              </form>
            )}
            <p>
              Don't have an account yet?
              <Link to="/register"> Create an account</Link>
            </p>

            <TermsPrivacy info="By logging in" />
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;
