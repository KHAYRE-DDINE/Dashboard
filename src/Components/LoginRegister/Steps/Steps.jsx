import React, { useState } from "react";
import "./Steps.css";
import "../Login/Login.css";
import useAuthContext from "../../authentication/AuthContext";
import { useNavigate } from "react-router-dom";
import ValidationForm from "../ValidationForm/ValidationForm";
import TermsPrivacy from "../TermsPrivacy/TermsPrivacy";

function Steps() {
  const [values, setValues] = useState({
    id: crypto.randomUUID(),
    email: "",
    "first name": "",
    "last name": "",
    password: "",
  });
  const [error, setError] = useState({});
  const { register } = useAuthContext();

  function handleValues(event) {
    const newValues = { ...values, [event.target.name]: event.target.value };
    setValues(newValues);
  }

  const navigate = useNavigate();

  const handleForm = async (e) => {
    e.preventDefault();
    register(values);
  };

  // const handleToken = (length) => {
  //   // const crypto = require("crypto");

  //   // // Generate a random 32-byte token and convert to hexadecimal string
  //   // const token = crypto.randomBytes(32).toString("hex");
  //   // console.log("Generated Token:", token);

  //   let token = "";
  //   const characters =
  //     "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  //   const charactersLength = characters.length;

  //   for (let i = 0; i < length; i++) {
  //     token += characters.charAt(Math.floor(Math.random() * charactersLength));
  //   }

  //   return setToken(token);
  // };

  // useEffect(() => {
  //   handleToken(16);
  // }, []);

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
          <fieldset>
            <button onClick={() => navigate(-1)}>back</button>
            <input
              type="submit"
              className={
                values["first name"] !== "" &&
                values["last name"] !== "" &&
                values.email !== "" &&
                values.password !== "" &&
                Object.keys(error).length === 0
                  ? "blue"
                  : ""
              }
              value="Sign up"
              disabled={
                values["first name"] !== "" &&
                values["last name"] !== "" &&
                values.email !== "" &&
                values.password !== "" &&
                Object.keys(error).length === 0
                  ? false
                  : true
              }
            />
          </fieldset>
        </form>
        <TermsPrivacy info="By signing up" />
      </div>
    </div>
  );
}

export default Steps;
