import React from "react";
import { NavLink, useLocation } from "react-router-dom";

function ArabicSide({ list }) {
  const location = useLocation();
  return (
    <div
      className={`sidebar py-7 invisible md:visible w-0 md:w-[270px] fixed h-screen border-l-[1px] border-solid border-grayD`}
    >
      <div className="list">
        <ul className="dash-links px-4">
          {list.map((l, id) => (
            <li
              className={
                location.pathname.includes(`/${l.listName}`)
                  ? `py-2 px-2 capitalize underline-none flex-row-reverse arabic bg-primary-01 rounded-sm border-r-[3px] border-solid border-primary-0 `
                  : "py-2 px-2 capitalize underline-none rounded-md flex-row-reverse arabic"
              }
              key={id}
            >
              <NavLink
                to={`dashboard/${l.listName}`}
                className={({ isActive, isPending }) =>
                  isActive
                    ? `text-primary-0 flex items-center`
                    : "flex items-center text-normalColor "
                }
              >
                الرئيسية <img src={l.listIcon} alt="icon" />
              </NavLink>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default ArabicSide;
