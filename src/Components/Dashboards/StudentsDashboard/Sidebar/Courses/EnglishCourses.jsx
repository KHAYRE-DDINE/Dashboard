import React from "react";
import enrolling from "../../../../../images/enrolling.svg";
import config from "../../../../../images/config.svg";
import mainLogo from "../../../../../images/logo2.svg";
import mark from "../../../../../images/inter.svg";
import { Link, Outlet, useLocation } from "react-router-dom";

function EnglishCourses({
  closeOpenRightSide,
  move,
  subject,
  subjectFill,
  setCloseOpenRightSide,
  cn,
}) {
  const location = useLocation();
  return (
    <div className="courses flex ">
      <div className="left-side">
        <h1 className="capitalize text-gray-700 text-[28px] font-medium font-['Inter'] leading-loose ">
          courses
        </h1>
        <div className="w-full">
          <div className="top-section ">
            <div className="move  border-slate-200 flex items-center">
              <Link className={"active capitalize after:bg-link text-link"}>
                recent courses
              </Link>
            </div>
          </div>
          <div className="recent-courses flex justify-start items-center flex-wrap gap-4 mt-8">
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
                  <img
                    src={mainLogo}
                    alt="logo"
                    className="w-[50px] h-[50px]"
                  />
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
        <div className="sections">
          <div className="top-section mb-7">
            <div className="move after:bg-grayD flex items-center">
              {move.map((e, idx) => (
                <Link
                  key={idx}
                  to={e}
                  className={
                    location.pathname.includes(e.substring(0, 6))
                      ? "text-primary-100 active mr-3 capitalize after:bg-primary-100"
                      : "text-normalColor mr-3 capitalize "
                  }
                >
                  {e}
                </Link>
              ))}
            </div>
          </div>
          <Outlet subject={subject} subjectFill={subjectFill} cn={cn} />
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

export default EnglishCourses;
