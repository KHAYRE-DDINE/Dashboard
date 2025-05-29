import React, { useContext, useRef, useState } from "react";
import "./Learning.css";
import arrowDown from "../../../../../../images/chevron-down-solid.svg";
import arrowUp from "../../../../../../images/chevron-up-solid.svg";
import avatar from "../../../../../../images/pngegg (18).png";
import avatar2 from "../../../../../../images/pngegg (12).png";
import avatar3 from "../../../../../../images/pngegg (14).png";
import { FiSend } from "react-icons/fi";

function Learning() {
  const [boxHeight, setBoxHeight] = useState(50);
  const [statusHeight, setStatusHeight] = useState(false);
  const idx = useRef(0);

  const changeHeight = (id) => {
    let height = boxHeight === 146 ? 50 : 146;
    idx.current = id;
    setStatusHeight(!statusHeight);
    setBoxHeight(height);
  };

  return (
    <div className="learning">
      <div className="comments ">
        <div className="type flex mt-6 mb-3">
          <div className="icon mr-[0.625rem] w-10 h-10">
            <img src={avatar} alt="avatar" />
          </div>
          <form className="input">
            <input
              type="text"
              className="!border-gray-300"
              placeholder="Add a comment..."
            />
            <button className="send" type="submit">
              add <FiSend />
            </button>
          </form>
        </div>
        <div className="latest-updates gap-3">
          <div className="text">
            <strong className="text-gray-700">Latest update</strong>
          </div>
          <div className="all-comments">
            <div
              className={`comment relative flex gap-4 h-[${
                idx.current === 0 && statusHeight ? boxHeight : ""
              }px] overflow-hidden`}
            >
              <div
                className="cursor-pointer arrow absolute right-[15px] top-[12px]"
                onClick={() => changeHeight(0)}
              >
                {statusHeight && idx.current === 0 ? (
                  <img className="w-[15px]" src={arrowUp} alt="arrow" />
                ) : (
                  <img className="w-[15px]" src={arrowDown} alt="arrow" />
                )}
              </div>
              <div className="avatar w-8">
                <img src={avatar} alt="avatar" />
              </div>
              <div className="info">
                <div className="title mb-5">
                  <h4 className="text-gray-700">mohamed</h4>
                </div>
                <span className="text-gray-500">
                  thanks a lot I found it useful
                  <br />
                  <a className="text-link !underline" href="#">
                    {avatar2}
                  </a>
                </span>
                <div className="commenter flex items-center">
                  <div className="avatar">
                    {" "}
                    <img src={avatar3} alt="avatar" />
                  </div>
                  <h5 className="name text-gray-500">mourad hajji</h5>
                  <span className="text-gray-500">10 h ago</span>
                </div>
              </div>
            </div>
            <div
              className={`comment relative flex gap-4 h-[${
                idx.current === 1 && statusHeight ? boxHeight : ""
              }px] overflow-hidden`}
            >
              <div
                className="cursor-pointer arrow absolute right-[15px] top-[12px]"
                onClick={() => changeHeight(1)}
              >
                {statusHeight && idx.current === 1 ? (
                  <img className="w-[15px]" src={arrowUp} alt="arrow" />
                ) : (
                  <img className="w-[15px]" src={arrowDown} alt="arrow" />
                )}
              </div>
              <div className="avatar w-8">
                <img src={avatar} alt="avatar" />
              </div>
              <div className="info">
                <div className="title mb-5">
                  <h4 className="text-gray-700">khayreddine</h4>
                </div>
                <span className="text-gray-500">
                  I just figured out you can use it like this
                  <br />
                  <a className="text-link !underline" href="#">
                    {avatar2}
                  </a>
                </span>
                <div className="commenter flex items-center">
                  <div className="avatar">
                    {" "}
                    <img src={avatar3} alt="avatar" />
                  </div>
                  <h5 className="name text-gray-500">jamal monim</h5>
                  <span className="text-gray-500">2 min ago</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Learning;
