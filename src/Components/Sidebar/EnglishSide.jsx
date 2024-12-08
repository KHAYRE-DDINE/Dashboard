import React from "react";
import { NavLink, useLocation } from "react-router-dom";
<<<<<<< HEAD
import { TbHelp } from "react-icons/tb";
import { IoMdSettings } from "react-icons/io";
import { motion } from "framer-motion";
import { transition } from "@chakra-ui/react";

function EnglishSide({ list, sidebarWidth }) {
  const location = useLocation();
  return (
    <div
      className={`sidebar ${
        sidebarWidth === 60 ? "hide" : ""
      } py-8 px-3 invisible bg-white w-0 md:w-[240px] fixed h-screen border-r-[1px] border-solid border-grayD`}
=======
import settings from "../../images/settings.svg";
import help from "../../images/help.svg";

function EnglishSide({ list }) {
  const location = useLocation();
  return (
    <div
      className={`sidebar py-8 px-3 invisible bg-white w-0 md:w-[240px] fixed h-screen border-r-[1px] border-solid border-grayD`}
>>>>>>> 274c5f0b1cc78a8943c599d9535d3f21de836533
    >
      <div className="list flex flex-column">
        <ul className="dash-links ">
          {list.map((l, id) => (
<<<<<<< HEAD
            <motion.li
              initial={{ opacity: 0, translateX: -50, translateY: -50 }}
              animate={{ opacity: 1, translateX: 0, translateY: 0 }}
              transition={{ duration: 0.4, delay: id * 0.09 }}
=======
            <li
>>>>>>> 274c5f0b1cc78a8943c599d9535d3f21de836533
              className={
                location.pathname.includes(
                  `/${l.listName === "dashboard" ? `home` : `${l.listName}`}`
                )
<<<<<<< HEAD
                  ? `py-2 px-2 capitalize underline-none bg-blue-100 rounded-sm border-l-[3px] border-solid border-primary-100 ${
                      sidebarWidth === 60
                        ? "!overflow-hidden !w-[40px]"
                        : "!w-[216px]"
                    } `
                  : `py-2 px-2 capitalize underline-none rounded-md ${
                      sidebarWidth === 60
                        ? "!overflow-hidden !w-[40px]"
                        : "!w-[216px]"
                    } `
=======
                  ? `py-2 px-2 capitalize underline-none bg-blue-100 rounded-sm border-l-[3px] border-solid border-primary-100`
                  : "py-2 px-2 capitalize underline-none rounded-md"
>>>>>>> 274c5f0b1cc78a8943c599d9535d3f21de836533
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
<<<<<<< HEAD
                {l.listIcon}
                {l.listName}
              </NavLink>
            </motion.li>
          ))}
          <ul className="bottomSide">
            <motion.li
              initial={{ opacity: 0, translateX: -50, translateY: -50 }}
              animate={{ opacity: 1, translateX: 0, translateY: 0 }}
              transition={{ duration: 0.4, delay: 5 * 0.2 }}
              className={
                location.pathname.includes("help")
                  ? `py-2 px-2 capitalize underline-none bg-blue-100 rounded-sm border-l-[3px] border-solid border-primary-100 ${
                      sidebarWidth === 60
                        ? "!overflow-hidden !w-[40px]"
                        : "w-[216px]"
                    } `
                  : `py-2 px-2 capitalize underline-none rounded-md ${
                      sidebarWidth === 60
                        ? "!overflow-hidden !w-[40px]"
                        : "w-[216px]"
                    } `
=======
                <img
                  className={
                    location.pathname.includes(`/${l.listName}`)
                      ? "text-primary-100"
                      : "text-normalColor"
                  }
                  src={l.listIcon}
                  alt="icon"
                />{" "}
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
>>>>>>> 274c5f0b1cc78a8943c599d9535d3f21de836533
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
<<<<<<< HEAD
                <TbHelp
                  className={`${sidebarWidth === 60 ? "mr-3" : "mr-[5px]"}`}
                  size={"18px"}
                />
                help
              </NavLink>
            </motion.li>
            <motion.li
              initial={{ opacity: 0, translateX: -50, translateY: -50 }}
              animate={{ opacity: 1, translateX: 0, translateY: 0 }}
              transition={{ duration: 0.4, delay: 6 * 0.2 }}
              className={
                location.pathname.includes("settings")
                  ? `py-2 px-2 capitalize underline-none bg-blue-100 rounded-sm border-l-[3px] border-solid border-primary-100 ${
                      sidebarWidth === 60
                        ? "!overflow-hidden !w-[40px]"
                        : "w-[216px]"
                    } `
                  : `py-2 px-2 capitalize underline-none rounded-md ${
                      sidebarWidth === 60
                        ? "!overflow-hidden !w-[40px]"
                        : "w-[216px]"
                    } `
=======
                <img src={help} alt="help" />
                help
              </NavLink>
            </li>
            <li
              className={
                location.pathname.includes("settings")
                  ? `py-2 px-2 capitalize underline-none bg-blue-100 rounded-sm border-l-[3px] border-solid border-primary-100`
                  : "py-2 px-2 capitalize underline-none rounded-md"
>>>>>>> 274c5f0b1cc78a8943c599d9535d3f21de836533
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
<<<<<<< HEAD
                <IoMdSettings
                  className={`${sidebarWidth === 60 ? "mr-3" : "mr-[5px]"}`}
                  size={"18px"}
                />
                settings
              </NavLink>
            </motion.li>
=======
                <img src={settings} alt="settings" />
                settings
              </NavLink>
            </li>
>>>>>>> 274c5f0b1cc78a8943c599d9535d3f21de836533
          </ul>
        </ul>
      </div>
    </div>
  );
}

export default EnglishSide;
