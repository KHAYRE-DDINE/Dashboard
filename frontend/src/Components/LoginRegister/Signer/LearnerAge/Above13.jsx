import React from "react";
import LoginMethod from "../../LoginMethod/LoginMethod";
import { Link } from "react-router-dom";

function Above13() {
  return (
    <div className="above">
      <div className="signup">
        <LoginMethod />
        <Link className="other" to="Steps">
          Sign up with email
        </Link>
      </div>
    </div>
  );
}

export default Above13;
