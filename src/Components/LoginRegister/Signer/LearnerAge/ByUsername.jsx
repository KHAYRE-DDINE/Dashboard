import React, { useContext, useState } from "react";
import "../Signer.css";
import ValidationForm from "../../ValidationForm/ValidationForm";
import { LanguageContext } from "../../../../App";
import useAuthContext from "../../../authentication/AuthContext";
import EnglishByUser from "./EnglishByUser";
import ArabicByUser from "./ArabicByUser";

function ByUsername() {
  const language = useContext(LanguageContext);
  const [values, setValues] = useState({
    email: "",
    username: "",
    password: "",
  });
  const [error, setError] = useState({});
  const { register } = useAuthContext();

  function handleValues(event) {
    const newValues = { ...values, [event.target.name]: event.target.value };
    setValues(newValues);
  }

  const handleLearnerForm = async (e) => {
    e.preventDefault();
    // register(values);
  };

  return (
    <div className="steps login byusername ">
      {language === "english" ? (
        <EnglishByUser
          handleLearnerForm={handleLearnerForm}
          error={error}
          handleValues={handleValues}
          setError={setError}
          ValidationForm={ValidationForm}
          values={values}
        />
      ) : (
        <ArabicByUser
          handleLearnerForm={handleLearnerForm}
          error={error}
          handleValues={handleValues}
          setError={setError}
          ValidationForm={ValidationForm}
          values={values}
        />
      )}
    </div>
  );
}

export default ByUsername;
