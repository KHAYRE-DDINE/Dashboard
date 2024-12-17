import React, { useContext, useEffect, useState } from "react";
import { LanguageContext } from "../../../../App";
import { useNavigate } from "react-router-dom";
import EnglishReset from "./EnglishReset";
import ArabicReset from "./ArabicReset";
import { useParams, useSearchParams } from "react-router-dom";
import axios from "../../../api/axios";

const ResetPassword = ({ email, setEmail }) => {
  const language = useContext(LanguageContext);
  const [isMatched, setIsMatched] = useState(false);
  const [password, setPassword] = useState("");
  const [password_confirmation, setPasswordConfirmation] = useState("");
  const [searchParams] = useSearchParams("");
  const { token } = useParams("");

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
      {language === "english" ? (
        <EnglishReset
          handleFormOne={handleFormOne}
          whileWriting={whileWriting}
          isMatched={isMatched}
          password={password}
          setPassword={setPassword}
          email={email}
        />
      ) : (
        <ArabicReset
          handleFormOne={handleFormOne}
          whileWriting={whileWriting}
          isMatched={isMatched}
          password={password}
          setPassword={setPassword}
          email={email}
        />
      )}
    </div>
  );
};

export default ResetPassword;
