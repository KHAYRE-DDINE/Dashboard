import React, { useState } from "react";
import "./Account.css";
import { clsx } from "clsx";
import { twMerge } from "tailwind-merge";
import avatar from "../../../../../images/avatar.svg";
import avatar2 from "../../../../../images/avatar.svg";
import avatar3 from "../../../../../images/avatar.svg";
import avatar4 from "../../../../../images/avatar.svg";
import { LuBadgeCent } from "react-icons/lu";
import { LuBadgeEuro } from "react-icons/lu";
import { RiPoliceBadgeLine } from "react-icons/ri";
import { SlBadge } from "react-icons/sl";
import { LuBadgeDollarSign } from "react-icons/lu";

export function cn(...inputs) {
  return twMerge(clsx(inputs));
}
function Account() {
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
      gender: "male",
    },
    {
      student: "Khalid Al Walid",
      subject: "mathematics",
      image: avatar2,
      gender: "male",
    },
    {
      student: "Khalid Al Walid",
      subject: "mathematics",
      image: avatar3,
      gender: "male",
    },
    {
      student: "Khalid Al Walid",
      subject: "mathematics",
      image: avatar4,
      gender: "female",
    },
  ]);

  const subjectFill = {
    math: "bg-blue-100 text-blue-600",
    physics: "bg-red-100 text-red-600",
    arabic: "bg-yellow-100 text-yellow-600",
  };

  return (
    <div className="account md:!w-[75%] mx-5 md:mx-6 md:pl-6">
      <div className="background absolute w-[100%]"></div>
      <div className="header-side grid grid-cols-2 items-center">
        <div className="person min-w-[200px]">
          <div className="image rounded-full">
            <img src={avatar} alt="avatar" />
          </div>
          <div className="name">
            <h1 className="text-gray-700">khalid Al walid</h1>
          </div>
        </div>
        <div className="badges h-[75px] flex flex-row flex-wrap justify-center items-center gap-2 ">
          <span className="w-3 h-3 ">
            <LuBadgeCent size={30} />
          </span>
          <span className="w-3 h-3 ">
            <LuBadgeEuro size={30} />
          </span>
          <span className="w-3 h-3 ">
            <RiPoliceBadgeLine size={30} />
          </span>
          <span className="w-3 h-3 ">
            <SlBadge size={30} />
          </span>
          <span className="w-3 h-3 ">
            <LuBadgeDollarSign size={30} />
          </span>
        </div>
      </div>
      <div className="statistics">
        <div className="top-title">
          <h3 className="text-gray-700">statistic</h3>
          <span className="text-gray-500">
            other will only see what they can access{" "}
          </span>
        </div>
        <div className="details grid grid-cols-2 md:flex">
          <div className="box joined">
            <span className="text-gray-600">
              Date joined <br /> <b className="text-gray-700">3 months ago</b>
            </span>
          </div>
          <div className="box joined">
            <span className="text-gray-600">
              classes
              <br /> <b className="text-gray-700">3</b>
            </span>
          </div>
          <div className="box joined">
            <span className="text-gray-600">
              completed lessons <br /> <b className="text-gray-700">3</b>
            </span>
          </div>
          <div className="box joined">
            <span className="text-gray-600">
              completed assignments <br /> <b className="text-gray-700">3</b>
            </span>
          </div>
          <div className="box joined">
            <span className="text-gray-600">
              videos watched <br /> <b className="text-gray-700">3</b>
            </span>
          </div>
          <div className="box joined">
            <span className="text-gray-600">
              study hours <br /> <b className="text-gray-600">3</b>
            </span>
          </div>
          <div className="box joined">
            <span className="text-gray-600">
              average score <br /> <b className="text-gray-600">B+</b>
            </span>
          </div>
        </div>
      </div>
      <div className="recent-lessons">
        <div className="top-title flex justify-between items-center">
          <div>
            <h3 className="text-gray-700">Recent lessons</h3>
            <span className="text-gray-500">
              other will only see what they can access{" "}
            </span>
          </div>
          <span className="text-link cursor-pointer">View all</span>
        </div>
        <div className="lessons">
          <div className="grid grid-cols-1 gap-3">
            {courses.map((c, idx) => (
              <div key={idx} className="course">
                <div key={idx} className="lesson flex justify-start relative">
                  <span
                    className={cn(`circle   rounded-md`, subjectFill[c.title])}
                  >
                    {c.icon}
                  </span>
                  <div className="info">
                    <p className="lesson-name my-auto text-gray-700">
                      {c.unit}
                    </p>
                    <span className="student-name text-gray-600">
                      {c.student}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
      <div className="colleagues">
        <div className="top-title flex justify-between items-center">
          <h3 className="text-gray-700">colleagues</h3>
        </div>
        <div className="all-colleagues">
          <div className="grid grid-cols-1 gap-3">
            {colleagues.map((c, idx) => (
              <div key={idx} className="colleague flex justify-start relative">
                <div className="image">
                  <img src={c.image} alt="" />
                </div>
                <div className="info">
                  <p className="colleague-name my-auto text-gray-700">
                    {c.student}
                  </p>
                  <span className="text-gray-600">
                    {c.gender === "male" ? "Mr" : "Mrs"}.
                    {c.student.split(" ")[0]} - {c.subject}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Account;
