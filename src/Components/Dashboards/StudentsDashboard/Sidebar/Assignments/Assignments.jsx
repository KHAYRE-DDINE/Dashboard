import React, { useContext, useEffect, useState } from "react";
import "./Assignments.css";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { HiOutlineDotsHorizontal } from "react-icons/hi";
import { LanguageContext } from "../../../../../App";
import EnglishAssignment from "./EnglishAssignment";
import ArabicAssignment from "./ArabicAssignment";
import avatar from "../../../../../images/avatar.svg";

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
  const language = useContext(LanguageContext);

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
    <React.Fragment>
      {language === "english" ? (
        <EnglishAssignment
          data={data}
          move={move}
          open={open}
          sideWidth={sideWidth}
          location={location}
          id={id}
          goToTable={goToTable}
          backFromTable={backFromTable}
        />
      ) : (
        <ArabicAssignment
          data={data}
          move={move}
          open={open}
          sideWidth={sideWidth}
          location={location}
          id={id}
          goToTable={goToTable}
          backFromTable={backFromTable}
        />
      )}
    </React.Fragment>
  );
}

export default Assignments;
