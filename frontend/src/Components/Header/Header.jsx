import "./Header.css";
import React from "react";
import DropDownProfile from "./DropDown/DropDownProfile";
import DropDownNotification from "./DropDown/DropDownNotification";
import DropDownSetting from "./DropDown/DropDownSetting";
import searchIcon from "../../images/search.svg";
import logo from "../../images/logo2.svg";
import dottes from "../../images/dottesSquare.svg";
import { motion } from "framer-motion";
import { TbSun, TbMoon } from "react-icons/tb";
import useAuthContext from "../authentication/AuthContext";

function Header({ sidebarWidth, setSidebarWidth }) {
  const { theme, changeTheme } = useAuthContext();
  const isDark = theme === "dark";

  return (
    <header className="bg-white z-[9999] fixed w-[100%] flex items-center justify-between border-b-[1px] border-solid border-grayD dark:bg-[#151c2c] dark:border-[#1e293b]">
      <div className="logo p-4 flex items-center">
        <motion.button
          initial={{ scale: 0.8 }}
          animate={{ scale: 1 }}
          transition={{ duration: 1, bounce: 3, repeat: Infinity }}
          className="w-8 h-8 mr-1 hidden md:block"
          onClick={() => setSidebarWidth(sidebarWidth === 240 ? 60 : 240)}
        >
          <img src={dottes} alt="dottes" />
        </motion.button>
        <h2 className="w-[180px] uppercase text-gray-700 dark:text-gray-100 font-bold text-2xl flex">
          <img className="mr-2" src={logo} alt="logo" />
          Al Taalim
        </h2>
      </div>
      <nav className="relative flex items-center justify-end p-6 lg:px-8">
        <div className="hidden md:flex search-input relative ">
          <img src={searchIcon} alt="searchIcon" />
          <input
            type="search"
            name="search"
            className="!border-gray-300 dark:!border-[#1e293b] text-xs dark:bg-[#0b0f19] dark:text-white"
            placeholder="Search something..."
          />
        </div>
        <div className="hidden lg:flex items-center gap-2 ml-4">
          <button
            onClick={() => changeTheme(isDark ? "light" : "dark")}
            title={isDark ? "Switch to Light Mode" : "Switch to Dark Mode"}
            className="inline-flex items-center justify-center w-9 h-9 rounded-xl bg-white dark:bg-[#0b0f19] hover:bg-gray-50 dark:hover:bg-[#1e293b] border border-gray-200 dark:border-[#1e293b] transition-all"
          >
            {isDark ? (
              <TbSun size={18} className="text-amber-400" />
            ) : (
              <TbMoon size={18} className="text-indigo-600" />
            )}
          </button>
          <DropDownNotification />
          <DropDownSetting />
          <DropDownProfile />
        </div>
      </nav>
    </header>
  );
}

export default Header;
