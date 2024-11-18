import React, { useContext, useState } from "react";
import { LanguageContext } from "../../../../App";
import { useNavigate } from "react-router-dom";
import EnglishReset from "./EnglishReset";
import ArabicReset from "./ArabicReset";

const ResetPassword = ({ email, setEmail }) => {
  const language = useContext(LanguageContext);
  const [isMatched, setIsMatched] = useState(false);
  const [password, setPassword] = useState("");

  const whileWriting = (event) => {
    const pattern = /^(.+)@(.+)\.([a-zA-Z]{2,})$/;
    setIsMatched(pattern.test(event.target.value));
    setEmail(event.target.value);
  };

  const handleFormOne = () => {};
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
