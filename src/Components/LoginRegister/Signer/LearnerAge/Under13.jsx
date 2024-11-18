import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { LanguageContext } from "../../../../App";
function Under13() {
  const language = useContext(LanguageContext);
  return (
    <div className="under">
      {language === "english" ? (
        <Link className="other" to="register-by-username">
          Sign up with email
        </Link>
      ) : (
        <Link className="other" to="register-by-username">
          التسجيل باختيار اسم مستخدم
        </Link>
      )}
    </div>
  );
}

export default Under13;
