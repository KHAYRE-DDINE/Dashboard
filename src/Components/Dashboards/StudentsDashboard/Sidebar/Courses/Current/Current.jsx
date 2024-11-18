import React, { useState } from "react";
import mainLogo from "../../../../../../images/logo2.svg";
import icon from "../../../../../../images/logo.svg";
import { clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs) {
  return twMerge(clsx(inputs));
}
function Current() {
  const [isCompleted, setIsCompleted] = useState(false);
  const [subject, setSubject] = useState([
    {
      id: 1,
      icon: icon,
      subject: "arabic",
      description: "lorem jhdy mant moujs mdauchaijcsmk kashck mihi khi ",
    },
    {
      id: 2,
      icon: icon,
      subject: "arabic",
      description: "lorem jhdy mant moujs mdauchaijcsmk kashck mihi khi ",
    },
    {
      id: 3,
      icon: icon,
      subject: "arabic",
      description: "lorem jhdy mant moujs mdauchaijcsmk kashck mihi khi ",
    },
    {
      id: 4,
      icon: icon,
      subject: "physics",
      description: "lorem jhdy mant moujs mdauchaijcsmk kashck mihi khi ",
    },
    {
      id: 5,
      icon: icon,
      subject: "math",
      description: "lorem jhdy mant moujs mdauchaijcsmk kashck mihi khi ",
    },
  ]);
  const subjectFill = {
    math: "bg-blue-100 text-blue-600",
    physics: "bg-red-100 text-red-600",
    arabic: "bg-yellow-100 text-yellow-600",
  };
  return (
    <React.Fragment>
      <div className=" my-10">
        <div className="all-subjects flex gap-[0.9rem] flex-wrap">
          {subject.map((l, id) => (
            <div
              key={id}
              className="subject rounded-lg border-[1px] border-gray-100 border-solid bg-white"
            >
              <div
                className={cn(
                  `image-box h-[127px] flex justify-center items-center`,
                  subjectFill[l.subject]
                )}
              >
                <img src={mainLogo} alt="logo" className="w-[50px] h-[50px]" />
              </div>
              <div className="info ">
                <div>
                  <div className="subject-student">
                    <span className="capitalize text-gray-700">
                      {l.subject}
                    </span>
                  </div>
                  <div className="description">
                    <h4 className="capitalize text-gray-700">
                      {l.description}
                    </h4>
                  </div>
                </div>
                <div className="buttons">
                  <button className="continue text-primary-100 bg-primary-600">
                    continue
                  </button>
                  <button className="assignment bg-colorGray-100 text-colorGray-600">
                    assignments
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </React.Fragment>
  );
}

export default Current;
