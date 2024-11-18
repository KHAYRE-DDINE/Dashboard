import React from "react";
import avatar from "../../../../../images/avatar.svg";

function EnglishAccount({ courses, colleagues, subjectFill, cn }) {
  return (
    <div className="account pl-6">
      <div className="background absolute w-[100%]"></div>
      <div className="header-side flex justify-between">
        <div className="person">
          <div className="image rounded-full">
            <img src={avatar} alt="avatar" />
          </div>
          <div className="name">
            <h1 className="text-gray-700">khalid Al walid</h1>
          </div>
        </div>
        <div className="badges flex justify-center items-center">
          <span className="w-3 h-3 rounded-full bg-yellow-500"></span>
          <span className="w-3 h-3 rounded-full bg-yellow-500"></span>
          <span className="w-3 h-3 rounded-full bg-yellow-500"></span>
          <span className="w-3 h-3 rounded-full bg-yellow-500"></span>
          <span className="w-3 h-3 rounded-full bg-yellow-500"></span>
        </div>
      </div>
      <div className="statistics">
        <div className="top-title">
          <h3 className="text-gray-700">statistic</h3>
          <span className="text-gray-500">
            other will only see what they can access{" "}
          </span>
        </div>
        <div className="details">
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

export default EnglishAccount;
