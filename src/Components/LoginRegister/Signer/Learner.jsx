import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Signer from "./Signer";
import Above from "./LearnerAge/Above13";
import Under from "./LearnerAge/Under13";
import Vector from "../../../images/Vector.svg";

function Learner() {
  const monthOptions = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];
  const monthOptionsAr = [
    "يناير",
    "فبراير",
    "مارس",
    "أبريل",
    "مايو",
    "يونيو",
    "يوليو",
    "أغسطس",
    "سبتمبر",
    "أكتوبر",
    "نوفمبر",
    "ديسمبر",
  ];
  const dayOptions = [...new Array(31)].fill("");
  const [yearOptions, setYearOptions] = useState([]);
  const [isValidate, setIsValidate] = useState(false);
  const [birthDate, setBirthDate] = useState({});
  const [error, setError] = useState({ day: false, month: false, year: false });
  const [age, setAge] = useState();

  useEffect(() => {
    const yearNow = new Date().getFullYear();
    const yearArray = [];
    for (let year = yearNow - 100; year <= yearNow; year++) {
      yearArray.push(year);
    }
    setYearOptions(yearArray);

    if (
      !error.day &&
      !error.month &&
      !error.year &&
      birthDate.day !== "" &&
      birthDate.month !== "" &&
      birthDate.year !== ""
    ) {
      setIsValidate(true);
    } else {
      setIsValidate(false);
    }
    calculateAge();

    console.log(age, isValidate, birthDate);
  }, [birthDate]);

  const checkBirthValidation = (e) => {
    const newBirthDate = { ...birthDate, [e.target.name]: e.target.value };
    setBirthDate(newBirthDate);
    if (e.target.value === "") {
      setError({ ...error, [e.target.name]: true });
    }
  };

  const calculateAge = () => {
    const yearNow = new Date().getFullYear();
    const dayNow = new Date().getDate();
    const monthNow = new Date().getMonth() + 1;
    const year = yearNow - birthDate.year;
    const dayToYear = (dayNow - birthDate.day) * 0.002737907;
    const monthToYear = (monthNow - birthDate.month) * 0.083333333;
    setAge(year + dayToYear + monthToYear);
  };

  return (
    <React.Fragment>
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
    </React.Fragment>
  );
}

export default Learner;
