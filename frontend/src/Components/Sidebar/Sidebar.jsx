import React, { useEffect } from "react";
import { NavLink, useNavigate, useLocation } from "react-router-dom";
import { IoMdSettings } from "react-icons/io";
import { TbHelp } from "react-icons/tb";
import { motion } from "framer-motion";
import { clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs) {
  return twMerge(clsx(inputs));
}

function Sidebar({ list, sidebarWidth }) {
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    if (location.pathname === "/Dashboard" || location.pathname === "/dashboard") {
      navigate("dashboard/home");
    }
  }, [location.pathname, navigate]);

  const isCollapsed = sidebarWidth === 60;

  return (
    <div
      className={cn(
        "sidebar bg-white fixed h-[calc(100vh-56px)] top-[56px] border-r border-gray-100 shadow-sm transition-all duration-300 z-40 flex flex-col pt-4 pb-4 overflow-hidden",
        isCollapsed ? "w-[60px] items-center" : "w-[240px] px-3"
      )}
    >
      <div className="flex-1 flex flex-col gap-1 w-full mt-2 custom-scrollbar pb-10">
        {list.map((l, id) => {
          const path = `/${l.listName === "dashboard" ? `home` : `${l.listName}`}`;
          const isActive = location.pathname.includes(path);

          return (
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.3, delay: id * 0.05 }}
              key={id}
              className="w-[calc(100% - 10px)] mx-[5px]"
            >
              <NavLink
                to={`dashboard/${l.listName === "dashboard" ? "home" : l.listName}`}
                className={cn(
                  "flex items-center rounded-xl transition-all duration-200 group relative",
                  isCollapsed ? "justify-center p-3" : "px-4 py-3 gap-3",
                  isActive
                    ? "bg-indigo-600 text-white shadow-md shadow-indigo-200"
                    : "text-gray-500 hover:bg-gray-50 hover:text-indigo-600"
                )}
              >
                <div className={cn("text-xl transition-transform duration-200 w-4", !isActive && "group-hover:scale-110")}>
                  {l.listIcon}
                </div>
                
                {!isCollapsed && (
                  <span className={cn("font-semibold text-sm capitalize", isActive ? "text-white" : "text-gray-700 group-hover:text-indigo-600")}>
                    {l.listName === "dashboard" ? "Home" : l.listName}
                  </span>
                )}

                {/* Tooltip for collapsed state */}
                {isCollapsed && (
                  <div className="absolute left-full ml-4 px-2.5 py-1.5 bg-gray-900 text-white text-xs font-semibold rounded-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all z-50 whitespace-nowrap shadow-xl">
                    {l.listName === "dashboard" ? "Home" : l.listName}
                    <div className="absolute top-1/2 -translate-y-1/2 -left-1 w-2 h-2 bg-gray-900 rotate-45"></div>
                  </div>
                )}
              </NavLink>
            </motion.div>
          );
        })}
      </div>

      <div className="mt-auto flex flex-col gap-1 w-full pt-4 border-t border-gray-100 bg-white">
        {[
          { name: "help", icon: <TbHelp /> },
          { name: "settings", icon: <IoMdSettings /> }
        ].map((item, idx) => {
          const isActive = location.pathname.includes(item.name);
          return (
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.3, delay: 0.4 + (idx * 0.1) }}
              key={item.name}
              className="w-full"
            >
              <NavLink
                to={`dashboard/${item.name}`}
                className={cn(
                  "flex items-center rounded-xl transition-all duration-200 group relative",
                  isCollapsed ? "justify-center p-3" : "px-4 py-3 gap-3",
                  isActive
                    ? "bg-indigo-600 text-white shadow-md shadow-indigo-200"
                    : "text-gray-500 hover:bg-gray-50 hover:text-indigo-600"
                )}
              >
                <div className={cn("text-xl transition-transform duration-200", !isActive && "group-hover:scale-110")}>
                  {item.icon}
                </div>
                {!isCollapsed && (
                  <span className={cn("font-semibold text-sm capitalize", isActive ? "text-white" : "text-gray-700 group-hover:text-indigo-600")}>
                    {item.name}
                  </span>
                )}
                {isCollapsed && (
                  <div className="absolute left-full ml-4 px-2.5 py-1.5 bg-gray-900 text-white text-xs font-semibold rounded-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all z-50 whitespace-nowrap shadow-xl">
                    {item.name}
                    <div className="absolute top-1/2 -translate-y-1/2 -left-1 w-2 h-2 bg-gray-900 rotate-45"></div>
                  </div>
                )}
              </NavLink>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}

export default Sidebar;
