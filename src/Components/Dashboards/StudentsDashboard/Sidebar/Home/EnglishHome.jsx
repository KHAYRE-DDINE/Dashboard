import React, { useEffect, useState } from "react";
import { CiBadgeDollar } from "react-icons/ci";
import mainLogo from "../../../../../images/logo2.svg";
import calender from "../../../../../images/calender.svg";
import search from "../../../../../images/search.svg";
import mark from "../../../../../images/inter.svg";
import { Label, Pie, PieChart } from "recharts";
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";

const chartData = [
  { browser: "chrome", visitors: 275, fill: "var(--color-chrome)" },
  { browser: "safari", visitors: 200, fill: "var(--color-safari)" },
  { browser: "firefox", visitors: 287, fill: "var(--color-firefox)" },
  { browser: "edge", visitors: 173, fill: "var(--color-edge)" },
  { browser: "other", visitors: 190, fill: "var(--color-other)" },
];

const chartConfig = {
  visitors: {
    label: "Visitors",
  },
  chrome: {
    label: "Chrome",
    color: "hsl(var(--chart-1))",
  },
  safari: {
    label: "Safari",
    color: "hsl(var(--chart-2))",
  },
  firefox: {
    label: "Firefox",
    color: "hsl(var(--chart-3))",
  },
  edge: {
    label: "Edge",
    color: "hsl(var(--chart-4))",
  },
  other: {
    label: "Other",
    color: "hsl(var(--chart-5))",
  },
};

function EnglishHome({ tests, courses, subject, subjectFill, cn }) {
  const [closeOpenRightSide, setCloseOpenRightSide] = useState(false);
  const [days, setDays] = useState([]);
  const [today, setToday] = useState("");

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

  const totalVisitors = React.useMemo(() => {
    return chartData.reduce((acc, curr) => acc + curr.visitors, 0);
  }, []);
  return (
    <div className="home flex flex-col xl:flex-row pl-2 lg:pl-6 gap-6 ">
      <section className="welcome xl:p-[72px]">
        <h1 className="capitalize text-gray-700 text-[28px] font-medium font-['Inter'] leading-loose ">
          welcome, khalid al walid
        </h1>
        <div className="tests ">
          <div className="head mb-5 flex justify-between">
            <h3 className="text-gray-700">Your tests</h3>
            <button className="text-primary-100 border-none">see all</button>
          </div>
          <div className="all-tests flex gap-[0.9rem] flex-wrap">
            {tests.map((t, id) => (
              <div
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
              </div>
            ))}
          </div>
        </div>
        <div className="subjects ">
          <div className="head mb-5 flex justify-between">
            <h3 className="text-gray-700">Your classes</h3>
            <button className="text-primary-100 border-none">see all</button>
          </div>
          <div className="flex items-center justify-center min-h-[260px]">
            <ChartContainer
              config={chartConfig}
              className="mx-auto aspect-square max-h-[250px]"
            >
              <PieChart>
                <ChartTooltip
                  cursor={false}
                  content={<ChartTooltipContent hideLabel />}
                />
                <Pie
                  data={chartData}
                  dataKey="visitors"
                  nameKey="browser"
                  innerRadius={60}
                  strokeWidth={5}
                >
                  <Label
                    content={({ viewBox }) => {
                      if (viewBox && "cx" in viewBox && "cy" in viewBox) {
                        return (
                          <text
                            x={viewBox.cx}
                            y={viewBox.cy}
                            textAnchor="middle"
                            dominantBaseline="middle"
                          >
                            <tspan
                              x={viewBox.cx}
                              y={viewBox.cy}
                              className="fill-foreground text-3xl font-bold"
                            >
                              {totalVisitors.toLocaleString()}
                            </tspan>
                            <tspan
                              x={viewBox.cx}
                              y={(viewBox.cy || 0) + 24}
                              className="fill-muted-foreground"
                            >
                              Visitors
                            </tspan>
                          </text>
                        );
                      }
                    }}
                  />
                </Pie>
              </PieChart>
            </ChartContainer>
          </div>
        </div>
        <div className="lessons">
          <div className="head flex justify-between items-center">
            <h3>Your lessons</h3>
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
              <div key={idx} className="course">
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
              </div>
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
