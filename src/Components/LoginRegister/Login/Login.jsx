import React, { useContext, useEffect, useState } from "react";
import "./Login.css";
import { LanguageContext } from "../../../App";
import useAuthContext from "../../authentication/AuthContext";
import EnglishLogin from "./EnglishLogin";
import ArabicLogin from "./ArabicLogin";
import { useLocation } from "react-router-dom";


function Login() {
  const language = useContext(LanguageContext);
  const location = useLocation();
  const [theWay, setTheWay] = useState("withPassword");
  const [isMatched, setIsMatched] = useState(true);
  const [codeClass, setCodeClass] = useState([]);
  const [isFull, setIsFull] = useState(false);
  const [getPassword, setGetPassword] = useState(false);
  const { login, isCorrect } = useAuthContext();

  const [info, setInfo] = useState({
    email: "khirdin@email.com",
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

  const handleLogin = (event) => {
    event.preventDefault();

    login(info);
  };

  useEffect(() => {
    setInfo({ ...info, password: codeClass.join("") });
  }, [codeClass]);

  return (
    <div
      className={`login ${
        location.pathname === "/Login" || location.pathname === "/login"
          ? "h-[113vh]"
          : ""
      }`}
    >
      {language === "english" ? (
        <EnglishLogin
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
