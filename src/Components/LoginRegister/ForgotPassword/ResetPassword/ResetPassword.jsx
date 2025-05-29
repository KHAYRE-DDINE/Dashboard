import React, {  useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useParams, useSearchParams } from "react-router-dom";
import axios from "../../../api/axios";

const ResetPassword = ({ email, setEmail }) => {
  const [isMatched, setIsMatched] = useState(false);
  const [password, setPassword] = useState("");
  const [password_confirmation, setPasswordConfirmation] = useState("");
  const [searchParams] = useSearchParams("");
  const { token } = useParams("");
  const navigate = useNavigate();

  const whileWriting = (event) => {
    const pattern = /^(.+)@(.+)\.([a-zA-Z]{2,})$/;
    setIsMatched(pattern.test(event.target.value));
    setEmail(event.target.value);
  };

  useEffect(() => {
    setEmail(searchParams.get("email"));
  });

  const handleFormOne = async () => {
    try {
      let response = await axios.post("/forgot-password", {
        email,
        token,
        password,
        password_confirmation,
      });
    } catch (e) {
      if (e.response.status) {
        console.log(e.response.data.errors);
      }
    }
  };
  return (
    <div className="reset-password">
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
            placeholder="New password"
            onChange={(v) => setPassword(v.target.value)}
            value={password}
          />
          <input
            className="form-control"
            type="password"
            id="resetPassword"
            placeholder="Confirmation password"
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
    </div>
  );
};

export default ResetPassword;
