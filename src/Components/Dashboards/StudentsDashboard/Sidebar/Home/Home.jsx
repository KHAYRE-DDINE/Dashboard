import "./Home.css";
import icon from "../../../../../images/logo.svg";

import React, { useContext, useState } from "react";
import { LanguageContext } from "../../../../../App";

import { clsx } from "clsx";
import { twMerge } from "tailwind-merge";
import EnglishHome from "./EnglishHome";
import ArabicHome from "./ArabicHome";

export function cn(...inputs) {
  return twMerge(clsx(inputs));
}

function Home() {
  const [subject, setSubject] = useState([
    {
      id: 1,
      icon: icon,
      subject: "arabic",
      student: "khalid al walid",
    },
    {
      id: 2,
      icon: icon,
      subject: "physics",
      student: "khalid al walid",
    },
    {
      id: 3,
      icon: icon,
      subject: "math",
      student: "khalid al walid",
    },
  ]);
  const [tests, setTests] = useState([
    {
      id: 1,
      icon: icon,
      subject: "math",
      student: "khalid al walid",
      day: "thursday",
      month: "july",
      date: `20 / july / 2016`,
    },
    {
      id: 2,
      icon: icon,
      subject: "physics",
      student: "khalid al walid",
      day: "thursday",
      month: "july",
      date: `20 / july / 2016`,
    },
    {
      id: 3,
      icon: icon,
      subject: "arabic",
      student: "khalid al walid",
      day: "thursday",
      month: "july",
      date: `20 / july / 2016`,
    },
  ]);
  const [courses, setCourses] = useState([
    {
<<<<<<< HEAD
      title: "Algebra 101 - Mathematics 7th Grade",
=======
      title: "math",
>>>>>>> 274c5f0b1cc78a8943c599d9535d3f21de836533
      type: "not programming",
      length: "12",
      color: "#4cc0da",
      lessons: [
        {
<<<<<<< HEAD
          id: "2(x+3)",
          name: "Unit 1: Linear equations and inequalities",
=======
          id: "2x",
          name: "Algebra",
>>>>>>> 274c5f0b1cc78a8943c599d9535d3f21de836533
          completed: true,
          status: "progress",
        },
        {
<<<<<<< HEAD
          id: "2(x+3)",
          name: "Unit 1: Linear equations and inequalities",
=======
          id: "2x",
          name: "Algebra",
>>>>>>> 274c5f0b1cc78a8943c599d9535d3f21de836533
          completed: false,
          status: "progress",
        },
        {
<<<<<<< HEAD
          id: "2(x+3)",
          name: "Unit 1: Linear equations and inequalities",
=======
          id: "2x",
          name: "Algebra",
>>>>>>> 274c5f0b1cc78a8943c599d9535d3f21de836533
          completed: false,
          status: "progress",
        },
        {
<<<<<<< HEAD
          id: "2(x+3)",
          name: "Unit 1: Linear equations and inequalities",
=======
          id: "2x",
          name: "Algebra",
>>>>>>> 274c5f0b1cc78a8943c599d9535d3f21de836533
          completed: false,
          status: "progress",
        },
      ],
    },
    {
<<<<<<< HEAD
      title: "JavaScript - Computer programming 7th Grade",
=======
      title: "arabic",
>>>>>>> 274c5f0b1cc78a8943c599d9535d3f21de836533
      type: "programming",
      length: "12",
      color: "#f2e214",
      lessons: [
        {
<<<<<<< HEAD
          id: "2(x+3)",
          name: "Unit 1: Intro to JS: Drawing & Animation",
=======
          id: "2x",
          name: "Algebra",
>>>>>>> 274c5f0b1cc78a8943c599d9535d3f21de836533
          completed: false,
          status: "progress",
        },
        {
<<<<<<< HEAD
          id: "2(x+3)",
          name: "Unit 1: Intro to JS: Drawing & Animation",
=======
          id: "2x",
          name: "Algebra",
>>>>>>> 274c5f0b1cc78a8943c599d9535d3f21de836533
          completed: false,
          status: "progress",
        },
        {
<<<<<<< HEAD
          id: "2(x+3)",
          name: "Unit 1: Intro to JS: Drawing & Animation",
=======
          id: "2x",
          name: "Algebra",
>>>>>>> 274c5f0b1cc78a8943c599d9535d3f21de836533
          completed: false,
          status: "progress",
        },
        {
<<<<<<< HEAD
          id: "2(x+3)",
          name: "Unit 1: Intro to JS: Drawing & Animation",
=======
          id: "2x",
          name: "Algebra",
>>>>>>> 274c5f0b1cc78a8943c599d9535d3f21de836533
          completed: false,
          status: "progress",
        },
      ],
    },
    {
<<<<<<< HEAD
      title: "Arabic",
=======
      title: "physics",
>>>>>>> 274c5f0b1cc78a8943c599d9535d3f21de836533
      type: "not programming",
      length: "12",
      color: "#ff8128",
      lessons: [
        {
<<<<<<< HEAD
          id: "ض",
          name: "Unit 1: همزة القطع و همزة الوصل",
=======
          id: "2x",
          name: "Algebra",
>>>>>>> 274c5f0b1cc78a8943c599d9535d3f21de836533
          completed: false,
          status: "completed",
        },
        {
<<<<<<< HEAD
          id: "ض",
          name: "Unit 1: همزة القطع و همزة الوصل",
=======
          id: "2x",
          name: "Algebra",
>>>>>>> 274c5f0b1cc78a8943c599d9535d3f21de836533
          completed: false,
          status: "progress",
        },
        {
<<<<<<< HEAD
          id: "ض",
          name: "Unit 1: همزة القطع و همزة الوصل",
=======
          id: "2x",
          name: "Algebra",
>>>>>>> 274c5f0b1cc78a8943c599d9535d3f21de836533
          completed: false,
          status: "progress",
        },
        {
<<<<<<< HEAD
          id: "ض",
          name: "Unit 1: همزة القطع و همزة الوصل",
          completed: false,
          status: "progress",
        },
      ],
    },
    {
      title: "Language C - C++ - C#",
      type: "not programming",
      length: "12",
      color: "#ff8128",
      lessons: [
        {
          id: "F=ma",
          name: "Unit 1 : For Loop ",
          completed: false,
          status: "completed",
        },
        {
          id: "F=ma",
          name: "Unit 2 : Pointer",
          completed: false,
          status: "progress",
        },
        {
          id: "F=ma",
          name: "Unit 2 : Pointer",
          completed: false,
          status: "progress",
        },
        {
          id: "F=ma",
          name: "Unit 2 : Pointer",
=======
          id: "2x",
          name: "Algebra",
>>>>>>> 274c5f0b1cc78a8943c599d9535d3f21de836533
          completed: false,
          status: "progress",
        },
      ],
    },
  ]);
  const subjectFill = {
<<<<<<< HEAD
    "Algebra 101 - Mathematics 7th Grade": "bg-blue-100 text-blue-600",
    "JavaScript - Computer programming 7th Grade": "bg-red-100 text-red-600",
    Arabic: "bg-yellow-100 text-yellow-600",
    "Language C - C++ - C#": "bg-purple-100 text-yellow-600",
=======
    math: "bg-blue-100 text-blue-600",
    physics: "bg-red-100 text-red-600",
    arabic: "bg-yellow-100 text-yellow-600",
>>>>>>> 274c5f0b1cc78a8943c599d9535d3f21de836533
  };

  const language = useContext(LanguageContext);

  return (
    <div>
      {language === "english" ? (
        <EnglishHome
          subject={subject}
          tests={tests}
          courses={courses}
          subjectFill={subjectFill}
          cn={cn}
        />
      ) : (
        <ArabicHome
          subject={subject}
          tests={tests}
          courses={courses}
          subjectFill={subjectFill}
          cn={cn}
        />
      )}
    </div>
  );
}

export default Home;
