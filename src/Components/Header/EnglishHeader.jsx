import React from "react";
import searchIcon from "../../images/search.svg";
import DropDownProfile from "./DropDown/DropDownProfile";
import DropDownNotification from "./DropDown/DropDownNotification";
import DropDownSetting from "./DropDown/DropDownSetting";
import DropDownAbout from "./DropDown/DropDownAbout";
import logo from "../../images/logo2.svg";
import dottes from "../../images/dottesSquare.svg";

function EnglishHeader() {
  return (
    <header className="bg-white z-[9999] fixed w-[100%] flex items-center justify-between  border-b-[1px] border-solid border-grayD">
      <div className="logo p-4 flex items-center">
        <button className=" w-8 h-8 mr-1">
          <img src={dottes} alt="dottes" />
        </button>
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
            <DropDownAbout />
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

export default EnglishHeader;
