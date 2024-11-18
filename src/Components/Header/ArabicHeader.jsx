import React from "react";
import { CiSearch } from "react-icons/ci";
import DropDownProfile from "./DropDown/DropDownProfile";
import DropDownNotification from "./DropDown/DropDownNotification";
import DropDownSetting from "./DropDown/DropDownSetting";
import DropDownAbout from "./DropDown/DropDownAbout";
import logo from "../../images/logo2.svg";

function ArabicHeader() {
  return (
    <header className="bg-white z-[9999] fixed w-[100%] flex flex-row-reverse items-center justify-between  border-b-[1px] border-solid border-grayD">
      <div className="logo p-4 flex flex-row-reverse">
        <button className="bg-primary-100 rounded-full w-8 h-8 ml-5"></button>
        <h2 className="w-[180px] uppercase text-primary font-bold text-2xl flex flex-row-reverse">
          <img className="ml-2" src={logo} alt="logo" />
          al rihla
        </h2>
      </div>
      <nav className="relative flex flex-row-reverse items-center justify-end p-6 lg:px-8">
        <div className="hidden md:flex md:flex-row-reverse search-input ml-6 relative">
          <CiSearch className="mr-2" />
          <input
            type="search"
            name="search"
            className="text-end"
            placeholder="Search something..."
          />
        </div>
        <div className="hidden lg:flex flex-row-reverse lg:gap-x-5">
          <button className="text-sm font-semibold leading-3 text-gray-900">
            <DropDownNotification />
          </button>
          <button className="text-sm font-semibold leading-3 text-gray-900">
            <DropDownAbout />
          </button>
          <button className="text-sm font-semibold leading-3 text-gray-900">
            <DropDownSetting />
          </button>
          <button className="text-sm font-semibold leading-3 text-gray-900">
            <DropDownProfile />
          </button>
        </div>
      </nav>
    </header>
  );
}

export default ArabicHeader;
