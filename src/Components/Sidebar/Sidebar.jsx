import React, { useContext, useEffect } from "react";
import "./Sidebar.css";
import { useNavigate } from "react-router-dom";
import { useLocation } from "react-router-dom";
import { LanguageContext } from "../../App";
import EnglishSide from "./EnglishSide";
import ArabicSide from "./ArabicSide";


function Sidebar({ list }) {
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
        <EnglishSide list={list} />
      ) : (
        <ArabicSide list={list} />
      )}
    </React.Fragment>
  );
}

export default Sidebar;
