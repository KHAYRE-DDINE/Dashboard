import "./Header.css";
import React from "react";
import DropDownProfile from "./DropDown/DropDownProfile";
import DropDownNotification from "./DropDown/DropDownNotification";
import DropDownSetting from "./DropDown/DropDownSetting";
import searchIcon from "../../images/search.svg";
import logo from "../../images/logo2.svg";
import dottes from "../../images/dottesSquare.svg";
import { motion } from "framer-motion";

function Header({ sidebarWidth, setSidebarWidth }) {
  // const changeLanguage = (e) => {
  //   setLanguage(e.target.value);
  // };
  //  <div className="box-lang flex items-center justify-around relative text-sm font-semibold leading-6 text-gray-900 capitalize">
  //    <div className="language-icon absolute left-0">
  //      <TbWorld />
  //    </div>
  //    <select
  //      name="language"
  //      onChange={(e) => changeLanguage(e)}
  //      className="capitalize outline-none text-normalColor"
  //    >
  //      <option value="english">english</option>
  //      <option value="arabic">arabic</option>
  //    </select>
  //    <ChevronDownIcon className="-mr-1 h-5 w-5 text-gray-400 absolute right-0" />
  //  </div>;
  return (
    <header className="bg-white z-[9999] fixed w-[100%] flex items-center justify-between  border-b-[1px] border-solid border-grayD">
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
        <h2 className="w-[180px] uppercase text-gray-700 font-bold text-2xl flex">
          <img className="mr-2" src={logo} alt="logo" />
          al rihla
        </h2>
      </div>
      <nav className="relative flex items-center justify-end p-6 lg:px-8">
        <div className="hidden md:flex search-input relative ">
          <img src={searchIcon} alt="searchIcon" />
          <input
            type="search"
            name="search"
            className="!border-gray-300 text-xs"
            placeholder="Search something..."
          />
        </div>
        <div className="hidden lg:flex gap-0">
          <button className="w-[44px] h-[56px] px-3 leading-[50%]">
            <DropDownNotification />
          </button>
          <button className="w-[44px] h-[56px] px-3 leading-[50%]">
            <DropDownSetting />
          </button>
          <button className="w-[56px] h-[56px] px-3 leading-[50%]">
            <DropDownProfile />
          </button>
        </div>
      </nav>
    </header>
  );
}

export default Header;
