import React, { useContext, useState } from "react";
import "./Account.css";
import EnglishAccount from "./EnglishAccount";
import ArabicAccount from "./ArabicAccount";
import { clsx } from "clsx";
import { twMerge } from "tailwind-merge";
import { LanguageContext } from "../../../../../App";

import avatar from "../../../../../images/avatar.svg";
import avatar2 from "../../../../../images/avatar.svg";
import avatar3 from "../../../../../images/avatar.svg";
import avatar4 from "../../../../../images/avatar.svg";

export function cn(...inputs) {
  return twMerge(clsx(inputs));
}
function Account() {
  const language = useContext(LanguageContext);
  const [courses, setCourses] = useState([
    {
      icon: "2(x+1)",
      unit: "unit 1 : algebre",
      student: "Khalid Al Walid",
      title: "arabic",
    },
    {
      icon: "2(x+1)",
      unit: "unit 1 : algebre",
      student: "Khalid Al Walid",
      title: "physics",
    },
    {
      icon: "2(x+1)",
      unit: "unit 1 : algebre",
      student: "Khalid Al Walid",
      title: "math",
    },
  ]);
  const [colleagues, setColleagues] = useState([
    {
      student: "Khalid Al Walid",
      subject: "mathematics",

      image: avatar,

      image:
        "http://localhost:3000/static/media/avatar.d705bf7c01407cc24f7dc874c15976f2.svg",

      gender: "male",
    },
    {
      student: "Khalid Al Walid",
      subject: "mathematics",

      image: avatar2,

      image:
        "http://localhost:3000/static/media/avatar.d705bf7c01407cc24f7dc874c15976f2.svg",

      gender: "male",
    },
    {
      student: "Khalid Al Walid",
      subject: "mathematics",

      image: avatar3,

      image:
        "http://localhost:3000/static/media/avatar.d705bf7c01407cc24f7dc874c15976f2.svg",

      gender: "male",
    },
    {
      student: "Khalid Al Walid",
      subject: "mathematics",

      image: avatar4,

      image:
        "http://localhost:3000/static/media/avatar.d705bf7c01407cc24f7dc874c15976f2.svg",

      gender: "female",
    },
  ]);

  const subjectFill = {
    math: "bg-blue-100 text-blue-600",
    physics: "bg-red-100 text-red-600",
    arabic: "bg-yellow-100 text-yellow-600",
  };

  return (
    <div>
      {language === "english" ? (
        <EnglishAccount
          courses={courses}
          colleagues={colleagues}
          subjectFill={subjectFill}
          cn={cn}
        />
      ) : (
        <ArabicAccount
          courses={courses}
          colleagues={colleagues}
          subjectFill={subjectFill}
          cn={cn}
        />
      )}
    </div>
  );
}

export default Account;
