import React from "react";
import ValidationForm from "../ValidationForm/ValidationForm";
import TermsPrivacy from "../TermsPrivacy/TermsPrivacy";
import { useNavigate } from "react-router-dom";

function EnglishSteps({ error, handleValues, handleForm, setError, values }) {
  const navigate = useNavigate();

  return (
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
          {/* <label htmlFor="first name">first name</label>
            <input
              type="text"
              name="first name"
 >   */}
          <label htmlFor="First name">First name</label>
          <input
            type="text"
            name="First name"
            placeholder="Ahmed"
            onChange={(ev) => handleValues(ev)}
          />
        </fieldset>
        <fieldset>
          <label htmlFor="last name">last name</label>
          <input type="text" name="last name" />
        </fieldset>
        {/* <fieldset>
            <label htmlFor="Last name">Last name</label>
            <input
              type="text"
              name="Last name"
 
              placeholder="Mohamed"
              onChange={(ev) => handleValues(ev)}
            />
          </fieldset> */}
        <fieldset
          className={error.password ? "password error" : "password"}
          data-error="Your password must be at least 8 characters long."
        >
          <label htmlFor="password">Password</label>
          <span>
            Passwords should be at least 8 characters long and should contain a
            mixture of letters, numbers, and other characters.
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
              values["First name"] !== "" &&
              values["Last name"] !== "" &&
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
              values["First name"] !== "" &&
              values["Last name"] !== "" &&
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
  );
}

export default EnglishSteps;
