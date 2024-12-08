import React, { useContext, useEffect } from "react";
import "./Sidebar.css";
import { useNavigate } from "react-router-dom";
import { useLocation } from "react-router-dom";
import { LanguageContext } from "../../App";
import EnglishSide from "./EnglishSide";
import ArabicSide from "./ArabicSide";

<<<<<<< HEAD
function Sidebar({ list, sidebarWidth }) {
=======

function Sidebar({ list }) {
>>>>>>> 274c5f0b1cc78a8943c599d9535d3f21de836533
  const location = useLocation();
  const navigate = useNavigate();
  const language = useContext(LanguageContext);

  useEffect(() => {
    if (
      location.pathname === "/Dashboard" ||
      location.pathname === "/dashboard"
    ) {
      navigate("dashboard/home");
    }
  }, [location.pathname]);

  return (
    <React.Fragment>
      {language === "english" ? (
<<<<<<< HEAD
        <EnglishSide list={list} sidebarWidth={sidebarWidth} />
=======
        <EnglishSide list={list} />
>>>>>>> 274c5f0b1cc78a8943c599d9535d3f21de836533
      ) : (
        <ArabicSide list={list} />
      )}
    </React.Fragment>
  );
}

export default Sidebar;
