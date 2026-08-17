import React, { useState } from "react";
import "./Steps.css";
import "../Login/Login.css";
import useAuthContext from "../../authentication/AuthContext";
import { useNavigate } from "react-router-dom";
import ValidationForm from "../ValidationForm/ValidationForm";
import TermsPrivacy from "../TermsPrivacy/TermsPrivacy";
import { FiLoader } from "react-icons/fi";

function Steps() {
  const [values, setValues] = useState({
    id: crypto.randomUUID(),
    email: "",
    "first name": "",
    "last name": "",
    password: "",
  });
  const [error, setError] = useState({});
  const { register, isLoading } = useAuthContext();

  function handleValues(event) {
    const newValues = { ...values, [event.target.name]: event.target.value };
    setValues(newValues);
  }

  const navigate = useNavigate();

  const handleForm = async (e) => {
    e.preventDefault();
    register(values);
  };

  return (
    <div className="steps login stepsToSignUp">
      <div className="wrapper ">
        <form action="" className="inputs form" onSubmit={(e) => handleForm(e)}>
          <h1 className="title">Sign up</h1>
          <fieldset
            className={error.email ? "email error" : "email"}
            data-error="Please enter a valid email format like example@mail.com"
          >
            <label htmlFor="email-or-username">Your email</label>
            <input
              type="email"
              name="email"
              placeholder="example@mail.com"
              onChange={(ev) => handleValues(ev)}
              onBlur={() => setError(() => ValidationForm(values))}
            />
          </fieldset>
          <fieldset className="name">
            <fieldset>
              <label htmlFor="first name">first name</label>
              <input
                type="text"
                name="first name"
                placeholder="Ahmed"
                onChange={(ev) => handleValues(ev)}
              />
            </fieldset>
            <fieldset>
              <label htmlFor="last name">last name</label>
              <input
                type="text"
                name="last name"
                placeholder="Mohamed"
                onChange={(ev) => handleValues(ev)}
              />
            </fieldset>
          </fieldset>
          <fieldset
            className={error.password ? "password error" : "password"}
            data-error="Your password must be at least 8 characters long."
          >
            <label htmlFor="password">Password</label>
            <span>
              Passwords should be at least 8 characters long and should contain
              a mixture of letters, numbers, and other characters.
            </span>
            <input
              type="password"
              name="password"
              placeholder="●●●●●●●●"
              onChange={(ev) => handleValues(ev)}
              onBlur={() => setError(() => ValidationForm(values))}
            />
          </fieldset>
          <fieldset className="flex items-center gap-3">
            <button type="button" onClick={() => navigate(-1)}>back</button>
            <button
              type="submit"
              disabled={
                isLoading ||
                !(
                  values["first name"] !== "" &&
                  values["last name"] !== "" &&
                  values.email !== "" &&
                  values.password !== "" &&
                  Object.keys(error).length === 0
                )
              }
              className={`flex items-center justify-center gap-2 py-3 px-6 rounded-xl font-bold transition-all ${
                values["first name"] !== "" &&
                values["last name"] !== "" &&
                values.email !== "" &&
                values.password !== "" &&
                Object.keys(error).length === 0
                  ? "blue bg-indigo-600 text-white cursor-pointer"
                  : "opacity-50 cursor-not-allowed"
              }`}
            >
              {isLoading ? (
                <>
                  <FiLoader className="animate-spin text-lg" />
                  <span>Creating account...</span>
                </>
              ) : (
                "Sign up"
              )}
            </button>
          </fieldset>
        </form>
        <TermsPrivacy info="By signing up" />
      </div>
    </div>
  );
}

export default Steps;
