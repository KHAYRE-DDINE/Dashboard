import React, { useContext, useState, useEffect } from "react";

import { LanguageContext } from "../../../App";
import EnglishLearner from "./EnglishLearner";
import ArabicLearner from "./ArabicLearner";

function Learner() {
  const language = useContext(LanguageContext);
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
      {language === "english" ? (
        <EnglishLearner
          error={error}
          checkBirthValidation={checkBirthValidation}
          monthOptions={monthOptions}
          dayOptions={dayOptions}
          age={age}
          yearOptions={yearOptions}
          isValidate={isValidate}
        />
      ) : (
        <ArabicLearner
          error={error}
          checkBirthValidation={checkBirthValidation}
          monthOptionsAr={monthOptionsAr}
          dayOptions={dayOptions}
          age={age}
          yearOptions={yearOptions}
          isValidate={isValidate}
        />
      )}
    </React.Fragment>
  );
}

export default Learner;
