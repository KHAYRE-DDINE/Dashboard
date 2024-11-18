import React from "react";
import { useNavigate } from "react-router-dom";
import TermsPrivacy from "../../TermsPrivacy/TermsPrivacy";

function EnglishByUser({
  handleLearnerForm,
  error,
  handleValues,
  setError,
  ValidationForm,
  values,
}) {
  const navigate = useNavigate();

  return (
    <div className="wrapper ">
      <form className="inputs form" onSubmit={(e) => handleLearnerForm(e)}>
        <h1 className="title">Sign up</h1>
        <fieldset
          className={error.email ? "email error" : "email"}
          data-error={error.email}
        >
          <label htmlFor="email-or-username">
            Your parent or guardian's email
          </label>
          <span style={{ textAlign: "start" }}>
            We’re excited to get you started, but we need to notify your parent
            or guardian about your account.
          </span>
          <input
            type="email"
            name="email"
            placeholder="example@mail.com"
            onChange={(ev) => handleValues(ev)}
            onBlur={() => setError(() => ValidationForm(values))}
          />
        </fieldset>
        <fieldset
          className={error.username ? "username error" : "username"}
          data-error={error.username}
        >
          <label htmlFor="username">Username</label>
          <span style={{ textAlign: "start" }}>
            Use letters and numbers only. For safety, don't use your real name.
          </span>
          <input
            type="text"
            name="username"
            placeholder="spidy4581"
            onChange={(ev) => handleValues(ev)}
            onBlur={() => setError(() => ValidationForm(values))}
          />
        </fieldset>
        <fieldset
          className={error.password ? "password error" : "password"}
          data-error={error.password}
        >
          <label htmlFor="password">Password</label>
          <span style={{ textAlign: "start" }}>
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
              values.username !== "" &&
              values.email !== "" &&
              values.password !== "" &&
              Object.keys(error).length === 0
                ? "blue"
                : ""
            }
            disabled={
              values.username !== "" &&
              values.email !== "" &&
              values.password !== "" &&
              Object.keys(error).length === 0
                ? false
                : true
            }
            value="Sign up"
          />
        </fieldset>
      </form>
      <TermsPrivacy info="By signing up" />
    </div>
  );
}

export default EnglishByUser;
