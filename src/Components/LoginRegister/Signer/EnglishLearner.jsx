import React from "react";
import { Link } from "react-router-dom";
import Signer from "./Signer";
import Above from "./LearnerAge/Above13";
import Under from "./LearnerAge/Under13";
import Vector from "../../../images/Vector.svg";

function EnglishLearner({
  checkBirthValidation,
  error,
  monthOptions,
  dayOptions,
  age,
  yearOptions,
  isValidate,
}) {
  return (
    <div className="learner">
      <Signer />
      <div className="birth ">
        <span>What is your date of birth?</span>
        <form action="" method="get">
          <div className="select">
            <select
              name="month"
              className={error.month ? "error" : ""}
              onChange={(e) => checkBirthValidation(e)}
            >
              <option value="">month</option>

              {monthOptions.map((month, idMonth) => (
                <option name="month" key={idMonth} value={idMonth}>
                  {month}
                </option>
              ))}
            </select>{" "}
            <img src={Vector} alt="Vector" />
          </div>
          <div className="select">
            <select
              name="day"
              className={error.day ? "error" : ""}
              onChange={(e) => checkBirthValidation(e)}
            >
              <option value="">day</option>
              {dayOptions.map((m, idDay) => (
                <option name="day" key={idDay} value={idDay + 1}>
                  {idDay + 1}
                </option>
              ))}
            </select>
            <img src={Vector} alt="Vector" />
          </div>
          <div className="select">
            <select
              name="year"
              className={error.year || age < 5 ? "error" : ""}
              onChange={(e) => checkBirthValidation(e)}
            >
              <option value="">year</option>
              {yearOptions.map((year, idYear) => (
                <option name="year" key={idYear} value={year}>
                  {year}
                </option>
              ))}
            </select>{" "}
            <img src={Vector} alt="Vector" />
          </div>
        </form>
        {isValidate && age >= 13 ? (
          <Above />
        ) : isValidate && age < 13 && age > 5 ? (
          <Under />
        ) : (
          ""
        )}
        <div className="links">
          <Link to="class-code">Enter a class code</Link>
          <Link to="/login">Already have an account?</Link>
        </div>
      </div>
    </div>
  );
}

export default EnglishLearner;
