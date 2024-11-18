import React, { useContext, useEffect, useState } from "react";
import "./Courses.css";
import icon from "../../../../../images/logo.svg";

import { Link, Outlet, useLocation, useNavigate } from "react-router-dom";

import { clsx } from "clsx";
import { twMerge } from "tailwind-merge";
import { LanguageContext } from "../../../../../App";
import EnglishCourses from "./EnglishCourses";
import ArabicCourses from "./ArabicCourses";

export function cn(...inputs) {
  return twMerge(clsx(inputs));
}

function Courses() {
  const language = useContext(LanguageContext);
  const [closeOpenRightSide, setCloseOpenRightSide] = useState(false);
  const [move, setMove] = useState([
    "current learning",
    "completed",
    "archived",
  ]);
  const [subject, setSubject] = useState([
    {
      id: 1,
      icon: icon,
      subject: "arabic",
      description:
        "Arabic is a beautiful language, like a treasure chest filled with secrets! It's spoken by many people and is even the language of the Quran, a holy book.",
    },
    {
      id: 2,
      icon: icon,
      subject: "physics",
      description:
        "Physics is like being a superhero, figuring out how everything moves, from your bike to the stars – it's super cool!",
    },
    {
      id: 3,
      icon: icon,
      subject: "math",
      description:
        "Math is the language of the universe, helping us decode hidden patterns, conquer challenges, and navigate the world with logic and wonder! ",
    },
  ]);
  const subjectFill = {
    math: "bg-blue-100 text-blue-600",
    physics: "bg-red-100 text-red-600",
    arabic: "bg-yellow-100 text-yellow-600",
  };
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    if (location.pathname.includes("courses")) {
      navigate("current learning");
    }
  }, []);

  return (
    <div>
      {language === "english" ? (
        <EnglishCourses
          closeOpenRightSide={closeOpenRightSide}
          move={move}
          subject={subject}
          subjectFill={subjectFill}
          setMove={setMove}
          setCloseOpenRightSide={setCloseOpenRightSide}
          setSubject={setSubject}
          cn={cn}
        />
      ) : (
        <ArabicCourses />
      )}
    </div>
  );
}

export default Courses;
