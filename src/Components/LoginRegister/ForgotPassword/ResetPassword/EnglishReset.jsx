import React from "react";
import { useNavigate } from "react-router-dom";

function EnglishReset({
  handleFormOne,
  whileWriting,
  isMatched,
  password,
  setPassword,
  email,
}) {
  const navigate = useNavigate();

  return (
    <form
      action="#"
      className="retrievePassword"
      onSubmit={(e) => handleFormOne(e)}
    >
      <fieldset className={" mb-3 email"}>
        <label htmlFor="resetPassword" className="form-label">
          Email
        </label>
        <input
          className="form-control"
          type="email"
          value={email}
          placeholder="example@mail.com"
          onChange={(e) => whileWriting(e)}
        />
      </fieldset>
      <fieldset className={" mb-3 password"}>
        <label htmlFor="resetPassword" className="form-label">
          New Password
        </label>
        <input
          className="form-control"
          type="password"
          id="resetPassword"
          placeholder="●●●●●●●●"
          onChange={(v) => setPassword(v.target.value)}
          value={password}
        />
      </fieldset>
      <fieldset>
        <button onClick={() => navigate(-1)}>back</button>
        <input
          type="submit"
          className={isMatched && password.length >= 8 ? "blue" : ""}
          value="Reset password"
          disabled={isMatched && password.length >= 8 ? false : true}
        />
      </fieldset>
    </form>
  );
}

export default EnglishReset;
