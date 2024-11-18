import React from "react";
import { CiBadgeDollar, CiSearch } from "react-icons/ci";
import mainLogo from "../../../../../images/logo2.svg";
import calender from "../../../../../images/calender.svg";


function ArabicHome({ tests, courses, subject, subjectFill, today, cn }) {
  return (
    <div className="home flex flex-col xl:flex-row-reverse pr-6 gap-6 ">
      <section className="welcome ">
        <h1 className="capitalize text-3xl my-6">welcome, khalid al walid</h1>
        <div className="tests mb-[40px]">
          <div className="head mb-4 flex flex-row-reverse justify-between">
            <h3>Your tests</h3>
            <button className="text-primary-100 border-none">see all</button>
          </div>
          <div className="all-tests flex flex-row-reverse gap-[0.9rem] flex-wrap">
            {tests.map((t, id) => (
              <div
                key={id}
                className="cover border-[1px] border-grayD border-solid rounded-md p-2"
              >
                <div className="test flex flex-row-reverse items-center w-[300px] ">
                  <div
                    className={cn(
                      `image-box h-[50px] ml-3`,
                      subjectFill[t.subject]
                    )}
                  >
                    <img
                      src={mainLogo}
                      alt="logo"
                      className="w-[100%] h-[100%]"
                    />
                  </div>
                  <div className="info ">
                    <div className="subject-student">
                      <span className="capitalize">{t.subject}</span>
                    </div>
                    <div className="student">
                      <h4 className="capitalize text-sm opacity-75">
                        {t.student}
                      </h4>
                    </div>
                  </div>
                </div>
                <div className="date mt-2 flex flex-row-reverse items-center">
                  <div className="icon ml-2">
                    <img src={calender} alt="calender" />
                  </div>
                  <span>
                    {t.month}, {t.date}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
        <div className="subjects mb-[40px]">
          <div className="head mb-4 flex flex-row-reverse justify-between">
            <h3>Your subjects</h3>
            <button className="text-primary-100 border-none">see all</button>
          </div>
          <div className="all-subjects flex gap-[0.9rem] flex-wrap">
            {subject.map((l, id) => (
              <div
                key={id}
                className="subject rounded-md border-[1px] border-grayD border-solid p-2 w-[200px] h-[200px]"
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
                <div className="info mt-3">
                  <div className="subject-student">
                    <span className="capitalize">{l.subject}</span>
                  </div>
                  <div className="student">
                    <h4 className="capitalize text-sm opacity-75">
                      {l.student}
                    </h4>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
        <div className="lessons">
          <div className="head flex flex-row-reverse justify-between">
            <h3>Your lessons</h3>
            <div className="hidden md:flex search-input relative">
              <CiSearch />
              <input
                type="search"
                name="search"
                className=""
                placeholder="Placeholder"
              />
            </div>
          </div>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mt-3">
            {courses.map((c, idx) => (
              <div key={idx} className="course">
                <div className="top-section flex flex-row-reverse justify-between py-3 border-b-2 border-grayD border-b-solid">
                  <p className="my-auto text-normalColor">{c.title}</p>
                  {c.length > 5 && (
                    <button className="text-link">see all ({c.length})</button>
                  )}
                </div>
                <div className="lessons pb-4 pl-3">
                  {c.lessons.map((l, idx) => (
                    <div
                      key={idx}
                      className="lesson flex flex-row-reverse justify-start relative mt-6"
                    >
                      <span
                        className={cn(
                          `circle  after:bg-grayD`,
                          subjectFill[c.title]
                        )}
                      >
                        {l.id}
                      </span>
                      <p className="lesson-name my-auto mr-3 text-normalColor">
                        {l.name}
                      </p>
                      {idx === 0 || c.lessons[idx - 1]?.completed ? (
                        <button className="bg-primary-100 text-white rounded-md py-1 px-3 absolute left-0">
                          {l.status !== "finished" &&
                          c.type === "not programming"
                            ? "continue"
                            : l.status !== "finished" &&
                              c.type === "programming"
                            ? "start"
                            : ""}
                        </button>
                      ) : (
                        ""
                      )}
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
      <section className="right-side !border-grayD border-r-[1px] !border-l-[0px] py-5">
        <div className="profile-info rounded-xl border-2 border-grayD border-solid px-3 py-2">
          <div className="details flex-wrap flex flex-row-reverse justify-between items-center">
            <div className="left !w-max flex flex-row-reverse items-center">
              <div className="photo">
                <img src={mainLogo} alt="avatar" />
              </div>
              <div className="name-class !ml-[0px] mr-3">
                <h5 className="name">khalid al walid</h5>
                <span className="class">7th grade</span>
              </div>
            </div>
            <div className="badges flex items-center justify-between flex-wrap">
              <span className="badge-item flex justify-center items-center">
                <CiBadgeDollar />
              </span>
              <span className="badge-item flex justify-center items-center">
                <CiBadgeDollar />
              </span>
              <span className="badge-item flex justify-center items-center">
                <CiBadgeDollar />
              </span>
              <span className="badge-item flex justify-center items-center">
                <CiBadgeDollar />
              </span>
              <span className="badge-item flex justify-center items-center">
                <CiBadgeDollar />
              </span>
            </div>
          </div>
          <div className="calender flex-wrap gap-1 flex flex-row-reverse justify-between items-center pt-4">
            <span
              className={`date rounded-mds border-2 border-solid border-gray-300${
                today ? "text-white bg-primary-100" : "text-black bg-white"
              }`}
            >
              04 <br /> <b>may</b>
            </span>
            <span
              className={`date rounded-mds border-2 border-solid border-gray-300${
                today ? "text-white bg-primary-100" : "text-black bg-white"
              }`}
            >
              04 <br /> <b>may</b>
            </span>
            <span
              className={`date rounded-mds border-2 border-solid border-gray-300${
                today ? "text-white bg-primary-100" : "text-black bg-white"
              }`}
            >
              04 <br /> <b>may</b>
            </span>
            <span
              className={`date rounded-mds border-2 border-solid border-gray-300${
                today ? "text-white bg-primary-100" : "text-black bg-white"
              }`}
            >
              04 <br /> <b>may</b>
            </span>
            <span
              className={`date rounded-mds border-2 border-solid border-gray-300${
                today ? "text-white bg-primary" : "text-black bg-white"
              }`}
            >
              04 <br /> <b>may</b>
            </span>
          </div>
        </div>
        <div className="teachers">
          <div className="top-section flex flex-row-reverse justify-between  pt-3 pb-2">
            <p className="my-auto capitalize font-bold ">notices</p>
          </div>
          <div className="all-notices ">
            <div className="box flex flex-row-reverse items-start border-2 border-b-solid rounded-xl border-b-gray-300">
              <div className="image w-8 h-8 relative">
                <img src={mainLogo} alt="avatar" className="absolute w-8 h-8" />
              </div>
              <div className="info mr-3">
                <span className="subject capitalize">Math</span>
                <h5 className="unit capitalize">unit1: linear equation</h5>
                <p className="notice">
                  {" "}
                  Iure placeat quasi similique tempore debitis doloremque atque
                  et provident adipisci{" "}
                </p>
              </div>
            </div>
            <div className="box  flex flex-row-reverse items-start border-2 border-b-solid rounded-xl border-b-gray-300">
              <div className="image w-8 h-8 relative">
                <img src={mainLogo} alt="avatar" className="absolute w-8 h-8" />
              </div>
              <div className="info mr-3">
                <span className="subject capitalize">Math</span>
                <h5 className="unit capitalize">unit1: linear equation</h5>
                <p className="notice">
                  {" "}
                  Iure placeat quasi similique tempore debitis doloremque atque
                  et provident adipisci{" "}
                </p>
              </div>
            </div>
            <div className="box  flex flex-row-reverse items-start border-2 border-b-solid rounded-xl border-b-gray-300">
              <div className="image w-8 h-8 relative">
                <img src={mainLogo} alt="avatar" className="absolute w-8 h-8" />
              </div>
              <div className="info mr-3">
                <span className="subject capitalize">Math</span>
                <h5 className="unit capitalize">unit1: linear equation</h5>
                <p className="notice">
                  {" "}
                  Iure placeat quasi similique tempore debitis doloremque atque
                  et provident adipisci{" "}
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

export default ArabicHome;
