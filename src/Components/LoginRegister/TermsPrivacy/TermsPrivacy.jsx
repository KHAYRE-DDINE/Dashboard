import React, { useContext } from "react";
import { Link, useLocation } from "react-router-dom";
import { LanguageContext } from "../../../App";

function TermsPrivacy({ info }) {
  const language = useContext(LanguageContext);
  const location = useLocation();
  return (
    <React.Fragment>
      {language === "english" ? (
        <div className="privacy">
          <p
            className={`terms ${
              location.pathname.includes("register")
                ? "!left-auto !translate-x-0"
                : ""
            }`}
          >
            {info} to Al Rihla Academy, you agree to our
            <Link to="/Terms" className="text-link">
              {" "}
              Terms of use
            </Link>
             and
            <Link to="/Privacy" className="text-link">
              {" "}
              Privacy Policy
            </Link>
            .
          </p>
        </div>
      ) : (
        <div>
          <p
            className={`terms ${
              location.pathname.includes("register")
                ? "!left-auto !translate-x-0"
                : ""
            }`}
          >
            من خلال التسجيل في أكاديمية الرحلة، فإنك توافق على
            <Link to="/Terms" className="text-link">
              {" "}
              شروط الاستخدام{" "}
            </Link>
            و
            <Link to="/Privacy" className="text-link">
              {" "}
              سياسة الخصوصية{" "}
            </Link>
            الخاصة بنا.
          </p>
        </div>
      )}
    </React.Fragment>
  );
}

export default TermsPrivacy;
