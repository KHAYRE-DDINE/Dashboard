import React, { useContext } from "react";
import LoginMethod from "../../LoginMethod/LoginMethod";
import { Link } from "react-router-dom";
import { LanguageContext } from "../../../../App";
function Above13() {
  const language = useContext(LanguageContext);
  return (
    <div className="above">
      {language === "english" ? (
        <div className="signup">
          <LoginMethod />
          <Link className="other" to="Steps">
            Sign up with email
          </Link>
        </div>
      ) : (
        <div className="signup">
          <LoginMethod />
          <Link className="other" to="Steps">
            التسجيل بالبريد الإلكتروني
          </Link>
        </div>
      )}
    </div>
  );
}

export default Above13;
