import React from "react";
import { Link } from "react-router-dom";
import Signer from "./Signer";
import Above from "./LearnerAge/Above13";
import Under from "./LearnerAge/Under13";
import Vector from "../../../images/Vector.svg";

function ArabicLearner({
  checkBirthValidation,
  error,
  monthOptionsAr,
  dayOptions,
  age,
  yearOptions,
  isValidate,
}) {
  return (
    <div className="learner">
      <Signer />
      <div className="birth ">
        <span>ما هو تاريخ ميلادك؟</span>
        <form action="" method="get" className="flex flex-row-reverse">
          <div className="select">
            <select
              name="day"
              className={error.day ? "error text-right" : "text-right"}
              onChange={(e) => checkBirthValidation(e)}
            >
              <option value="">اليوم</option>
              {dayOptions.map((m, idDay) => (
                <option name="day" key={idDay} value={idDay + 1}>
                  {idDay + 1}
                </option>
              ))}
            </select>
            <img src={Vector} className="left-3" alt="Vector" />
          </div>
          <div className="select">
            <select
              name="month"
              className={error.month ? "error text-right" : "text-right"}
              onChange={(e) => checkBirthValidation(e)}
            >
              <option value="">الشهر</option>
              {monthOptionsAr.map((month, idMonth) => (
                <option name="month" key={idMonth} value={idMonth + 1}>
                  {month}
                </option>
              ))}
            </select>
            <img src={Vector} className="left-3" alt="Vector" />
          </div>
          <div className="select">
            <select
              name="year"
              className={
                error.year || age < 5 ? "error text-right" : "text-right"
              }
              onChange={(e) => checkBirthValidation(e)}
            >
              <option value="">السنة</option>
              {yearOptions.map((year, idYear) => (
                <option name="year" key={idYear} value={year}>
                  {year}
                </option>
              ))}
            </select>
            <img src={Vector} className="left-3" alt="Vector" />
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
          <Link to="class-code">أدخل رمز الفصل</Link>
          <Link to="/login">هل لديك حساب؟</Link>
        </div>
      </div>
    </div>
  );
}

export default ArabicLearner;
