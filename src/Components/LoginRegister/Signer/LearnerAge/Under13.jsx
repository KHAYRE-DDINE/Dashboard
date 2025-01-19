import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { LanguageContext } from "../../../../App";
function Under13() {
  return (
    <div className="under">
      <Link className="other" to="register-by-username">
        Sign up with email
      </Link>
    </div>
  );
}

export default Under13;
