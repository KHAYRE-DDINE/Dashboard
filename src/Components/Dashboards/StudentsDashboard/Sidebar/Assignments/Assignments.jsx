import "./Assignments.css";
import React, { useEffect, useState } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { HiOutlineDotsHorizontal } from "react-icons/hi";
import avatar from "../../../../../images/avatar.svg";
import close from "../../../../../images/close.svg";
import DataTable from "./DataTable/DataTable";
import enrolling from "../../../../../images/enrolling.svg";
import config from "../../../../../images/config.svg";
import { Link, Outlet } from "react-router-dom";
import mainLogo from "../../../../../images/logo2.svg";
import mark from "../../../../../images/inter.svg";
import { motion } from "framer-motion";

function Assignments() {
  const [columns, setColumns] = useState([]);
  const data = [
    {
      id: 1,
      assignment: "mathematic",
      status: "pending",
      date: "20 aug",
      teacher: avatar,
      updates: "23:10",
      icon: <HiOutlineDotsHorizontal />,
    },
    {
      id: 2,
      assignment: "Arabic",
      status: "pending",
      date: "20 aug",
      teacher: avatar,
      updates: "23:10",
      icon: <HiOutlineDotsHorizontal />,
    },
    {
      id: 3,
      assignment: "programming",
      status: "pending",
      date: "20 aug",
      teacher: avatar,
      updates: "23:10",
      icon: <HiOutlineDotsHorizontal />,
    },
  ];
  const [move, setMove] = useState(["about", "resources", "learnings"]);
  const [pending, setPending] = useState(true);
  const [open, setOpen] = useState(false);
  const [sideWidth, setSideWidth] = useState(632);
  const location = useLocation();
  const navigate = useNavigate();
  const { id } = useParams();
  const [closeOpenRightSide, setCloseOpenRightSide] = useState(false);

  const customStyles = {
    rows: {
      style: {
        display: "flex",
        padding: " 0.875rem var(--spacing-0rem, 0rem)",
        alignItems: "center",
        justifyContent: "space-between",
        gap: "0.5rem",
      },
    },
    headCells: {
      style: {
        textTransform: "capitalize",
        color: "#4B5563",
        textAlign: "center",
        fontFamily: "Inter",
        fontSize: "0.875rem",
        fontStyle: "normal",
        fontWeight: "500",
        lineHeight: "1.25rem" /* 142.857% */,
        display: "flex",
        padding: "0.375rem  0.25rem 0.375rem 0.25rem",
        alignItems: "flex-start",
        marginRight: "0.5rem",
      },
    },
    cells: {
      style: {
        paddingLeft: "8px", // override the cell padding for data cells
        paddingRight: "8px",
        justifyContent: "space-between",
        fontFamily: "Inter",
        fontSize: "14px",
        fontWeight: "500",
        lineHeight: "20px",
        textTransform: "capitalize",
        color: "#4B5563",
      },
    },
  };

  const goToTable = (id) => {
    navigate(move[0] + "/" + id);
    setOpen(true);
  };

  const backFromTable = () => {
    console.log("success");
    navigate("");
    setOpen(false);
  };

  useEffect(() => {
    const timeout = setTimeout(() => {
      setColumns([
        {
          name: "assignment",
          selector: (row) => row.assignment,
          width: "250px",
        },
        {
          name: "status",
          selector: (row) => row.status,
          width: "7.75rem",
          style: {
            width: "max-content",
            display: "flex",
            padding: " 0.25rem 0.375rem",
            alignItems: "center",
            gap: "0.375rem",
            color: "#4B5563",
            fontFamily: "Inter",
            fontSize: "0.6875rem",
            fontStyle: "normal",
            fontWeight: "500",
            lineHeight: "1rem",
            borderRadius: "0.25rem",
            background: "#F3F4F6",
          },
        },
        {
          name: "date",
          selector: (row) => row.date,

          width: "7.75rem",
          style: {
            width: "max-content",
            display: "flex",
            padding: " 0.25rem 0.375rem",
            alignItems: "center",
            gap: "0.375rem",
            color: "#4B5563",
            fontFamily: "Inter",
            fontSize: "0.6875rem",
            fontStyle: "normal",
            fontWeight: "500",
            lineHeight: "1rem",
            borderRadius: "0.25rem",
            background: "#F3F4F6",
          },
        },
        {
          name: "teacher",
          selector: (row) => row.teacher,
          width: "4rem",
        },
        {
          name: "updates",
          selector: (row) => row.updates,
          width: "6.25rem",
        },
        {
          name: "",
          selector: (row) => row.icon,
          width: "2rem",
        },
      ]);
      setPending(false);
    }, 1000);
    return () => clearTimeout(timeout);
  }, []);

  return (
    <div className="Assignments flex">
      <div
        className="left"
        style={{ width: open && `calc(100% - ${sideWidth}px )` }}
      >
        <motion.h1
          initial={{ left: "30%", rotateY: 0 }}
          animate={{ left: "0%", rotateY: "360deg" }}
          transition={{ duration: 2, delay: 0.2 }}
          className="capitalize text-gray-700 text-[28px] font-medium font-['Inter'] leading-loose "
        >
          Assignments
        </motion.h1>
        <div className="assignment-table">
          <DataTable
            goToTable={goToTable}
            data={data}
            closeOpenRightSide={closeOpenRightSide}
          />
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
          <img src={mark} alt="mark" />
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
      <div className={`show-table w-[632px] ${open && "!right-0"} bg-gray-50`}>
        <div className="close">
          <img src={close} alt="close" onClick={() => backFromTable()} />
        </div>
        <div className="unit">
          <span className="capitalize text-gray-500">unit 2</span>
          <h2 className="capitalize text-gray-700">unit test</h2>
        </div>
        <div className="move after:bg-slate-200 flex items-center">
          {move.map((e, idx) => (
            <Link
              key={idx}
              to={e + "/" + id}
              className={
                location.pathname.includes(e)
                  ? "text-[#1865F2] active mr-3 capitalize after:bg-[#1865F2]"
                  : "text-gray-600 mr-3 capitalize "
              }
            >
              {e}
            </Link>
          ))}
        </div>
        <div className="w-[100%] mt-[-26px]">
          <Outlet />
        </div>
      </div>
    </div>
  );
}

export default Assignments;
