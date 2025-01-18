import React, { useContext, useEffect, useState } from "react";
import "./Steps.css";
import "../Login/Login.css";
import { LanguageContext } from "../../../App";
import useAuthContext from "../../authentication/AuthContext";
import EnglishSteps from "./EnglishSteps";
import ArabicSteps from "./ArabicSteps";

function Steps() {
  const language = useContext(LanguageContext);
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
      {language === "english" ? (
        <EnglishSteps
          error={error}
          handleForm={handleForm}
          handleValues={handleValues}
          setError={setError}
          values={values}
        />
      ) : (
        <ArabicSteps
          error={error}
          handleForm={handleForm}
          handleValues={handleValues}
          setError={setError}
          values={values}
        />
      )}
    </div>
  );
}

export default Steps;
