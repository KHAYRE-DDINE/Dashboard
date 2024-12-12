import React, { useState } from "react";
import arrowDown from "../../../../../../images/down.svg";
import arrowUp from "../../../../../../images/chevron-up-solid.svg";
import avatar from "../../../../../../images/pngegg (18).png";
import avatar2 from "../../../../../../images/pngegg (12).png";
import avatar3 from "../../../../../../images/pngegg (14).png";
import { FiSend } from "react-icons/fi";

function EnglishAbout() {
  const [boxHeight, setBoxHeight] = useState(50);
  const [statusHeight, setStatusHeight] = useState(false);

  const changeHeight = () => {
    console.log("func work");
    let height = boxHeight === 146 ? 50 : 146;
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
              className={`comment relative flex gap-4 h-[${boxHeight}px] overflow-hidden`}
            >
              <div
                className="cursor-pointer arrow absolute right-[15px] top-[12px]"
                onClick={() => changeHeight()}
              >
                {statusHeight ? (
                  <img className="w-[15px]" src={arrowDown} alt="arrow" />
                ) : (
                  <img className="w-[15px]" src={arrowUp} alt="arrow" />
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

export default EnglishAbout;
