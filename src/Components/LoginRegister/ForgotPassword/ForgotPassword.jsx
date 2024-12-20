import React, { useContext, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import "../Login/Login.css";
import "./ForgotPassword.css";
import { LanguageContext } from "../../../App";
import EnglishForgot from "./EnglishForgot";
import ArabicForgot from "./ArabicForgot";
import axios from "../../api/axios";

function ForgotPassword() {
  const language = useContext(LanguageContext);
  const [isMatched, setIsMatched] = useState(false);
  const [found, setFound] = useState(true);

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
      {language === "english" ? (
        <EnglishForgot
          handleFormTwo={handleFormTwo}
          whileWriting={whileWriting}
          found={found}
          isMatched={isMatched}
          email={email}
          setEmail={setEmail}
        />
      ) : (
        <ArabicForgot
          handleFormTwo={handleFormTwo}
          whileWriting={whileWriting}
          found={found}
          isMatched={isMatched}
          email={email}
          setEmail={setEmail}
        />
      )}
    </div>
  );
}

export default ForgotPassword;
