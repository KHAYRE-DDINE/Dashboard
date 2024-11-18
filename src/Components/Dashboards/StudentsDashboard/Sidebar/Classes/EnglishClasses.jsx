import React, { useState } from "react";
import enrolling from "../../../../../images/enrolling.svg";
import config from "../../../../../images/config.svg";
import mainLogo from "../../../../../images/logo2.svg";
import { Link } from "react-router-dom";
import mark from "../../../../../images/inter.svg";
function EnglishClasses({ subject, subjectFill, cn }) {
  const [closeOpenRightSide, setCloseOpenRightSide] = useState(false);
  return (
    <div className="classes flex">
      <div className="left">
        {" "}
        <h1 className="capitalize text-gray-700 text-[28px] font-medium font-['Inter'] leading-loose ">
          classes
        </h1>
        <div className="subjects mb-[40px]">
          <div className="all-subjects flex gap-[0.6rem] flex-wrap">
            {subject.map((l, id) => (
              <div
                key={id}
                className="subject cursor-pointer rounded-md border-[1px] border-grayD border-solid"
              >
                <div
                  className={cn(
                    `image-box h-[127px] bg-primary-1001 flex justify-center items-center`,
                    subjectFill[l.subject]
                  )}
                >
                  <img
                    src={mainLogo}
                    alt="logo"
                    className="w-[50px] h-[50px]"
                  />
                </div>
                <div className="info ">
                  <div className="subject-student">
                    <span className="capitalize text-gray-700">
                      {l.subject}
                    </span>
                  </div>
                  <div className="student">
                    <h4 className="capitalize text-gray-600">{l.student}</h4>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
      <div
        className={`right-side bg-gray-50 !border-gray-200 py-5 ${
          closeOpenRightSide ? "open" : ""
        }`}
      >
        <span
          className="right-side-button cursor-pointer xl:hidden"
          onClick={() => setCloseOpenRightSide(!closeOpenRightSide)}
        >
          <img
            onClick={() => setCloseOpenRightSide(!closeOpenRightSide)}
            src={mark}
            alt="mark"
          />
        </span>
        <div className="subject right-box rounded-lg border-[1px] border-grayD border-solid bg-white my-[15px] min-h-[230px]">
          <div
            className={`image-box h-[127px] mb-4 flex justify-center items-center bg-purple-200`}
          >
            <img src={mainLogo} alt="logo" className="w-[50px] h-[50px]" />
          </div>
          <div class="h-[152px] p-4 flex-col justify-between items-start gap-4 inline-flex">
            <div class="self-stretch h-[68px] flex-col justify-center items-start gap-2 flex">
              <div class="text-gray-700 text-base font-medium font-['Inter'] leading-tight">
                Build right features, the right way
              </div>
              <div class="self-stretch text-gray-700 text-sm font-normal font-['Inter'] leading-tight">
                Prioritize your ideas then easily move them into delivery,
                without losing any details on the way.
              </div>
            </div>
            <div class="w-[230px] my-[10px] justify-start items-center gap-2 inline-flex">
              <div class="px-3 py-2 w-[100%] bg-gray-100 rounded-md justify-center items-center gap-1.5 flex">
                <div class="text-gray-600 text-[0.83rem] font-medium font-['Inter'] leading-tight cursor-pointer">
                  Try is now
                </div>
              </div>
              <div class="px-3 py-2 w-[100%] rounded-md justify-center items-center gap-1.5 flex">
                <div class="text-gray-600 text-sm font-medium font-['Inter'] leading-tight cursor-pointer">
                  Learn more
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="upcoming right-box rounded-lg shadow h-[285.24px] flex-col justify-start items-start inline-flex bg-white my-[15px] ">
          <div class="h-11 w-[100%] px-3 py-3 border-b border-gray-200 justify-between items-center inline-flex">
            <div class="text-gray-700 text-base font-medium font-['Inter'] leading-tight">
              Upcoming Classes
            </div>
            <div class="text-blue-600 text-sm font-medium font-['Inter'] leading-none">
              View all
            </div>
          </div>
          <div className="content self-stretch h-[217.24px] px-4 py-5 pb-1  flex-col justify-start items-center flex">
            <div className="image mt-3">
              <img
                src={enrolling}
                alt="enrolling"
                className="w-[100px] h-[65.20px]"
              />
            </div>
            <div class="h-10 pt-5 flex-col justify-start items-center inline-flex">
              <h2 class="text-gray-700 text-base font-medium font-['Inter'] leading-tight">
                Start Enrolling Classes
              </h2>
            </div>
            <div class="h-[52px] pt-3 flex-col justify-start items-center inline-flex">
              <p class="self-stretch text-center text-gray-700 text-sm font-normal font-['Inter'] leading-tight">
                Make sure that you never miss a class and are always notified
                ahead of time.
              </p>
            </div>
            <div className="h-9 pt-4 relative">
              <Link
                to="more"
                className="text-center after:content-[''] after:absolute after:bottom-[-2px] after:h-[2px] after:w-[100%] after:left-0 after:bg-blue-600 text-blue-600 text-sm font-normal font-['Inter'] underline leading-tight"
              >
                Read more
              </Link>
            </div>
          </div>
        </div>
        <div className="alerts right-box rounded-lg shadow h-[285.24px] flex-col justify-start items-start inline-flex bg-white my-[15px] ">
          <div class="h-11 w-[100%] px-3 py-3 border-b border-gray-200 justify-between items-center inline-flex">
            <div class="text-gray-700 text-base font-medium font-['Inter'] leading-tight">
              Alerts
            </div>
            <div class="text-blue-600 text-sm font-medium font-['Inter'] leading-none">
              View all
            </div>
          </div>
          <div className="content self-stretch h-[217.24px] px-4 py-5 pb-1  flex-col justify-start items-center flex">
            <div className="image mt-3">
              <img
                src={config}
                alt="config"
                className="w-[100px] h-[65.20px]"
              />
            </div>
            <div class="h-10 pt-5 flex-col justify-start items-center inline-flex">
              <h2 class="text-gray-700 text-base font-medium font-['Inter'] leading-tight">
                Configure your alerts
              </h2>
            </div>
            <div class="h-[52px] pt-3 flex-col justify-start items-center inline-flex">
              <p class="self-stretch text-center text-gray-700 text-sm font-normal font-['Inter'] leading-tight">
                Be notified of important events in your class or school to
                ensure you never miss a thing.
              </p>
            </div>
            <div className="h-9 pt-4 relative">
              <Link
                to="more"
                className="text-center after:content-[''] after:absolute after:bottom-[-2px] after:h-[2px] after:w-[100%] after:left-0 after:bg-blue-600 text-blue-600 text-sm font-normal font-['Inter'] underline leading-tight"
              >
                Read more
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default EnglishClasses;
