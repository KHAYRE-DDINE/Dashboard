import React from "react";
import { NavLink, useLocation } from "react-router-dom";
import settings from "../../images/settings.svg";
import help from "../../images/help.svg";
import { TbHelp } from "react-icons/tb";
import { IoMdSettings } from "react-icons/io";

function EnglishSide({ list }) {
  const location = useLocation();
  return (
    <div
      className={`sidebar py-8 px-3 invisible bg-white w-0 md:w-[240px] fixed h-screen border-r-[1px] border-solid border-grayD`}
    >
      <div className="list flex flex-column">
        <ul className="dash-links ">
          {list.map((l, id) => (
            <li
              className={
                location.pathname.includes(
                  `/${l.listName === "dashboard" ? `home` : `${l.listName}`}`
                )
                  ? `py-2 px-2 capitalize underline-none bg-blue-100 rounded-sm border-l-[3px] border-solid border-primary-100`
                  : "py-2 px-2 capitalize underline-none rounded-md"
              }
              key={id}
            >
              <NavLink
                to={
                  l.listName === "dashboard"
                    ? `dashboard/home`
                    : `dashboard/${l.listName}`
                }
                className={({ isActive, isPending }) =>
                  isActive
                    ? ` text-primary-100 flex items-center`
                    : "flex items-center text-normalColor "
                }
              >
                {l.listIcon}
                {l.listName}
              </NavLink>
            </li>
          ))}
          <ul className="bottomSide">
            <li
              className={
                location.pathname.includes("help")
                  ? `py-2 px-2 capitalize underline-none bg-blue-100 rounded-sm border-l-[3px] border-solid border-primary-100`
                  : "py-2 px-2 capitalize underline-none rounded-md"
              }
            >
              <NavLink
                to="dashboard/help"
                className={({ isActive, isPending }) =>
                  isActive
                    ? `text-primary-100 flex items-center`
                    : "flex items-center text-normalColor"
                }
              >
                <TbHelp className="mr-[5px]" size={"18px"} />
                help
              </NavLink>
            </li>
            <li
              className={
                location.pathname.includes("settings")
                  ? `py-2 px-2 capitalize underline-none bg-blue-100 rounded-sm border-l-[3px] border-solid border-primary-100`
                  : "py-2 px-2 capitalize underline-none rounded-md"
              }
            >
              <NavLink
                to="dashboard/settings"
                className={({ isActive, isPending }) =>
                  isActive
                    ? ` text-primary-100 flex items-center`
                    : "flex items-center text-normalColor "
                }
              >
                <IoMdSettings className="mr-[5px]" size={"18px"} />
                settings
              </NavLink>
            </li>
          </ul>
        </ul>
      </div>
    </div>
  );
}

export default EnglishSide;
