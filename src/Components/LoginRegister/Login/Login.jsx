import React, { useContext, useEffect, useState } from "react";
import "./Login.css";
import { LanguageContext } from "../../../App";
import useAuthContext from "../../authentication/AuthContext";
import EnglishLogin from "./EnglishLogin";
import ArabicLogin from "./ArabicLogin";

function Login() {
  const language = useContext(LanguageContext);
  const [theWay, setTheWay] = useState("withPassword");
  const [isMatched, setIsMatched] = useState(true);
  const [isCorrect, setIsCorrect] = useState(true);
  const [codeClass, setCodeClass] = useState([]);
  const [isFull, setIsFull] = useState(false);
  const [getPassword, setGetPassword] = useState(false);
  const { login } = useAuthContext();

  const [info, setInfo] = useState({
    email: "",
    password: "",
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

  const handleLogin = async (event) => {
    event.preventDefault();

    // login(info);

    if (info.email === "khirdin@gmail.com") {
      setGetPassword(true);
    } else {
      setGetPassword(false);
    }
  };
  const checkPAssValidation = () => {
    if (info.password === "12345678") {
      setIsCorrect(true);
      alert("Password is correct");
    } else {
      alert("Password is incorrect");
      setIsCorrect(false);
    }
  };
  useEffect(() => {
    setInfo({ ...info, password: codeClass.join("") });
  }, [codeClass]);

  return (
    <div className="login">
      {language === "english" ? (
        <EnglishLogin
          checkPAssValidation={checkPAssValidation}
          handleLogin={handleLogin}
          changeInputs={changeInputs}
          whileWriting={whileWriting}
          info={info}
          theWay={theWay}
          setTheWay={setTheWay}
          isMatched={isMatched}
          getPassword={getPassword}
          setCodeClass={setCodeClass}
          setIsFull={setIsFull}
          isCorrect={isCorrect}
          setInfo={setInfo}
        />
      ) : (
        <ArabicLogin />
      )}
    </div>
  );
}

export default Login;
