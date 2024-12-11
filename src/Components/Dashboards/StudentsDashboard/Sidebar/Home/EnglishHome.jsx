import React, { useEffect, useState } from "react";
import { CiBadgeDollar } from "react-icons/ci";
import mainLogo from "../../../../../images/logo2.svg";
import calender from "../../../../../images/calender.svg";
import search from "../../../../../images/search.svg";
import mark from "../../../../../images/inter.svg";
import {
  Radar,
  RadarChart,
  PolarGrid,
  Legend,
  PolarAngleAxis,
  PolarRadiusAxis,
  Pie,
  PieChart,
  ResponsiveContainer,
  Cell,
} from "recharts";
import { motion } from "framer-motion";

function EnglishHome({ tests, courses, subject, subjectFill, cn }) {
  const [closeOpenRightSide, setCloseOpenRightSide] = useState(false);
  const [days, setDays] = useState([]);
  const [today, setToday] = useState("");
  const RADIAN = Math.PI / 180;
  const data1 = [
    { name: "Group A", value: 400 },
    { name: "Group B", value: 300 },
    { name: "Group C", value: 300 },
    { name: "Group D", value: 200 },
    { name: "Group E", value: 278 },
    { name: "Group F", value: 189 },
  ];
  const data2 = [
    {
      subject: "Math",
      A: 120,
      B: 110,
      fullMark: 150,
    },
    {
      subject: "Chinese",
      A: 98,
      B: 130,
      fullMark: 150,
    },
    {
      subject: "English",
      A: 86,
      B: 130,
      fullMark: 150,
    },
    {
      subject: "Geography",
      A: 99,
      B: 100,
      fullMark: 150,
    },
    {
      subject: "Physics",
      A: 85,
      B: 90,
      fullMark: 150,
    },
    {
      subject: "History",
      A: 65,
      B: 85,
      fullMark: 150,
    },
  ];
  useEffect(() => {
    const getFourDays = () => {
      const today = new Date();
      const daysArray = [];

      for (let i = 0; i < 5; i++) {
        const date = new Date(today);
        date.setDate(today.getDate() + i);
        const day = date.getDate();
        const month = date.toLocaleString("en-US", { month: "short" });
        daysArray.push(`${day} ${month}`);
      }

      setDays(daysArray);
    };

    const getTodayDate = () => {
      const day = new Date().getDate();
      const month = new Date().getMonth();
      const shortMonths = [
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
      setToday(day + " " + shortMonths[month]);
    };

    getTodayDate();
    getFourDays();
  }, []);

  const cx = 150;
  const cy = 200;
  const iR = 50;
  const oR = 100;
  const value = 50;

  const needle = (value, data, cx, cy, iR, oR, color) => {
    let total = 0;
    data.forEach((v) => {
      total += v.value;
    });
    const ang = 180.0 * (1 - value / total);
    const length = (iR + 2 * oR) / 3;
    const sin = Math.sin(-RADIAN * ang);
    const cos = Math.cos(-RADIAN * ang);
    const r = 5;
    const x0 = cx + 5;
    const y0 = cy + 5;
    const xba = x0 + r * sin;
    const yba = y0 - r * cos;
    const xbb = x0 - r * sin;
    const ybb = y0 + r * cos;
    const xp = x0 + length * cos;
    const yp = y0 + length * sin;

    return [
      <circle cx={x0} cy={y0} r={r} fill={color} stroke="none" />,
      <path
        d={`M${xba} ${yba}L${xbb} ${ybb} L${xp} ${yp} L${xba} ${yba}`}
        stroke="#none"
        fill={color}
      />,
    ];
  };
  return (
    <div className="home flex flex-col xl:flex-row pl-2 lg:pl-6 gap-6 ">
      <section className="welcome xl:p-[72px]">
        <motion.h1
          initial={{ left: "30%", rotateY: 0 }}
          animate={{ left: "0%", rotateY: "360deg" }}
          transition={{ duration: 2, delay: 0.2 }}
          className="capitalize text-gray-700 text-[28px] font-medium font-['Inter'] leading-loose "
        >
          welcome, Khirdin
        </motion.h1>
        <div className="tests ">
          <div className="head mb-5 flex justify-between">
            <h3 className="text-gray-700">Your tests</h3>
            <button className="text-primary-100 border-none">see all</button>
          </div>
          <div className="all-tests flex gap-[0.9rem] flex-wrap">
            {tests.map((t, id) => (
              <motion.div
                initial={{
                  opacity: 0,
                  translateX: id === 0 ? -50 : id === 2 ? 50 : "",
                  translateY: id === 1 ? -50 : "",
                }}
                animate={{ opacity: 1, translateX: 0, translateY: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                key={id}
                className="cover border-[1px] border-grayD border-solid "
              >
                <div className="test flex items-center w-[300px] ">
                  <div
                    className={cn(
                      `image-box h-[50px] mr-3`,
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
                      <span className="capitalize text-gray-700">
                        {t.subject}
                      </span>
                    </div>
                    <div className="student">
                      <h4 className="capitalize text-gray-600">{t.student}</h4>
                    </div>
                  </div>
                </div>
                <div className="date mt-2 flex items-center text-gray-600">
                  <div className="icon mr-2">
                    <img src={calender} alt="calender" />
                  </div>
                  <span>
                    {t.month}, {t.date}
                  </span>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
        <div className="subjects ">
          <div className="head mb-5 flex justify-between">
            <h3 className="text-gray-700">Your classes</h3>
            <button className="text-primary-100 border-none">see all</button>
          </div>
          <div className="flex items-center justify-center min-h-[260px]">
            <ResponsiveContainer width="100%" height="250px">
              <PieChart width={400} height={400}>
                <Pie
                  dataKey="value"
                  startAngle={180}
                  endAngle={0}
                  data={data1}
                  cx="50%"
                  cy="50%"
                  outerRadius={80}
                  fill="#8884d8"
                  label
                />
              </PieChart>
            </ResponsiveContainer>
            <ResponsiveContainer width="100%" height="250px">
              <RadarChart cx="50%" cy="50%" outerRadius="80%" data={data2}>
                <PolarGrid />
                <PolarAngleAxis dataKey="subject" />
                <PolarRadiusAxis angle={30} domain={[0, 150]} />
                <Radar
                  name="Mike"
                  dataKey="A"
                  stroke="#8884d8"
                  fill="#8884d8"
                  fillOpacity={0.6}
                />
                <Radar
                  name="Lily"
                  dataKey="B"
                  stroke="#82ca9d"
                  fill="#82ca9d"
                  fillOpacity={0.6}
                />
                <Legend />
              </RadarChart>
            </ResponsiveContainer>
          </div>
        </div>
        <div className="lessons">
          <div className="head flex justify-between items-center">
            <h3 className="text-gray-700"> Your lessons</h3>
            <div className="hidden md:flex search-input relative">
              <img src={search} alt="search" />
              <input
                type="search"
                name="search"
                className="!border-gray-300"
                placeholder="Placeholder"
              />
            </div>
          </div>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mt-3">
            {courses.map((c, idx) => (
              <motion.div
                initial={{
                  opacity: 0,
                  translateX: idx % 2 === 0 ? 60 : -60,
                }}
                whileInView={{
                  opacity: 1,
                  translateX: 0,
                }}
                transition={{ duration: 1.5, delay: idx * 0.2 }}
                key={idx}
                className="course"
              >
                <div className="top-section flex justify-between py-3 border-b-2 border-grayD border-b-solid">
                  <p className="my-auto text-normalColor">{c.title}</p>
                  {c.length > 5 && (
                    <button className="text-link">See all ({c.length})</button>
                  )}
                </div>
                <div className="all-lessons pb-4 pl-3">
                  {c.lessons.map((l, idx) => (
                    <div
                      key={idx}
                      className="lesson flex justify-start relative mt-6 cursor-pointer"
                    >
                      <span
                        className={cn(
                          `circle  after:bg-grayD`,
                          subjectFill[c.title]
                        )}
                      >
                        {l.id}
                      </span>
                      <p className="lesson-name my-auto ml-3 w-[100px] text-normalColor">
                        {l.name}
                        <span className="student-name !w-[100%] text-gray-600">
                          khalid al walid
                        </span>
                      </p>
                      {idx === 0 || c.lessons[idx - 1]?.completed ? (
                        <button className="bg-primary-100 text-white rounded-md py-1 px-3 absolute right-0">
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
              </motion.div>
            ))}
          </div>
        </div>
      </section>
      <section
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
        <div className="profile-info bg-white">
          <div className="details flex-wrap flex justify-between items-center">
            <div className="left !w-max flex items-center">
              <div className="photo">
                <img src={mainLogo} alt="avatar" />
              </div>
              <div className="name-class">
                <h5 className="name text-gray-700">khalid al walid</h5>
                <span className="class text-gray-600">7th grade</span>
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
          <div className="calender flex-wrap gap-1 flex justify-between items-center">
            {days.map((day, index) => (
              <span
                key={index}
                className={`date ${
                  today === day
                    ? "text-white bg-primary-100"
                    : "text-gray-700 bg-white"
                }`}
              >
                {day.split(" ")[0]} <br /> <b>{day.split(" ")[1]}</b>
              </span>
            ))}
          </div>
        </div>
        <div className="teachers">
          <div className="top-section flex justify-between mb-3">
            <p className="my-auto capitalize text-gray-700 ">notices</p>
          </div>
          <div className="all-notices flex flex-col gap-3">
            <div className="box flex items-start bg-white">
              <div className="image w-8 h-8 relative">
                <img src={mainLogo} alt="avatar" className="absolute w-8 h-8" />
              </div>
              <div className="info ml-3">
                <span className="subject-teacher capitalize text-gray-700 !flex !items-center gap-2">
                  Math{" "}
                  <small className="text-gray-600 flex items-center gap-2">
                    <p>●</p> 2 hours ago
                  </small>{" "}
                </span>
                <h5 className="unit capitalize text-gray-700">
                  unit1: linear equation
                </h5>
                <p className="notice text-gray-700 ">
                  {" "}
                  Iure placeat quasi similique tempore debitis doloremque atque
                  et provident adipisci{" "}
                </p>
              </div>
            </div>
            <div className="box flex items-start bg-white">
              <div className="image w-8 h-8 relative">
                <img src={mainLogo} alt="avatar" className="absolute w-8 h-8" />
              </div>
              <div className="info ml-3">
                <span className="subject-teacher capitalize text-gray-700 flex items-center gap-2">
                  Math{" "}
                  <small className="text-gray-600 flex items-center gap-2">
                    <p>●</p> 2 hours ago
                  </small>
                </span>
                <h5 className="unit capitalize">unit1: linear equation</h5>
                <p className="notice">
                  {" "}
                  Iure placeat quasi similique tempore debitis doloremque atque
                  et provident adipisci{" "}
                </p>
              </div>
            </div>
            <div className="box flex items-start bg-white">
              <div className="image w-8 h-8 relative">
                <img src={mainLogo} alt="avatar" className="absolute w-8 h-8" />
              </div>
              <div className="info ml-3">
                <span className="subject-teacher capitalize text-gray-700 flex items-center gap-2">
                  Math{" "}
                  <small className="text-gray-600 flex items-center gap-2">
                    <p>●</p> 2 hours ago
                  </small>
                </span>
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

export default EnglishHome;
