import React, { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./ClassCode.css";
import "../Login/Login.css";
import "../Steps/Steps.css";
import BoxesCode from "../BoxesCode/BoxesCode";
import { LanguageContext } from "../../../App";
import TermsPrivacy from "../TermsPrivacy/TermsPrivacy";
import EnglishClass from "./EnglishClass";
import ArabicClass from "./ArabicClass";

function ClassCode() {
  const language = useContext(LanguageContext);
  const [isFound, setIsFound] = useState(true);
  const [showDetails, setShowDetails] = useState(false);
  const [codeClass, setCodeClass] = useState([]);
  const [isFull, setIsFull] = useState(false);
  const [code, setCode] = useState("12345678");

  const handleInputs = () => {
    setShowDetails(false);
    setIsFull(false);
    setIsFound(true);
  };

  const handleForm = (e) => {
    e.preventDefault();
    if (codeClass.join("") === code) {
      setShowDetails(true);
    } else {
      setIsFound(false);
    }
  };

  return (
    <div className="login steps classCode">
      {language === "english" ? (
        <EnglishClass
          isFound={isFound}
          setIsFound={setIsFound}
          setCodeClass={setCodeClass}
          codeClass={codeClass}
          setIsFull={setIsFull}
          isFull={isFull}
          handleForm={handleForm}
          showDetails={showDetails}
          handleInputs={handleInputs}
        />
      ) : (
        <ArabicClass
          isFound={isFound}
          setIsFound={setIsFound}
          setCodeClass={setCodeClass}
          codeClass={codeClass}
          setIsFull={setIsFull}
          isFull={isFull}
          handleForm={handleForm}
          showDetails={showDetails}
          handleInputs={handleInputs}
        />
      )}
    </div>
  );
}

export default ClassCode;
