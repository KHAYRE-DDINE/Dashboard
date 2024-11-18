import React from "react";
import { useParams } from "react-router-dom";
import avatar from "../../../../../../images/avatar.svg";

function EnglishAbout() {
  const { id } = useParams();

  return (
    <div className="right-about">
      <div className="description">
        <div className="title">
          <h3 className="text-gray-700">Description</h3>
        </div>
        <div className="brief">
          <p className="text-gray-400">
            Briefly describe what this assignment is about and what to expect,
            so you can provide students a common understanding.
          </p>
        </div>
      </div>
      <div className="comments">
        <h2 className="big-title text-gray-700">2 comments</h2>
        <div className="all-comments">
          <div className="comment flex items-start ">
            <div className="image w-8 h-8 relative">
              <img src={avatar} alt="avatar" className="absolute w-8 h-8" />
            </div>
            <div className="info ml-3 flex-col">
              <div className="content flex flex-col gap-[6px]">
                <span className="commenter-name capitalize text-gray-700 !flex !items-center gap-2">
                  Khalid Al Walid{" "}
                  <small className="text-gray-500 flex items-center gap-2">
                    2 hours ago
                  </small>{" "}
                </span>
                <p className="comment-text text-gray-500 ">
                  Hello teacher What units do we have to revise for this test?
                </p>
              </div>
              <div className="actions flex">
                <span className="text-gray-500">reply</span>
                <span className="text-gray-500 mx-1">•</span>
                <span className="text-gray-500">edit</span>
                <span className="text-gray-500 mx-1">•</span>
                <span className="text-gray-500">delete</span>
              </div>
            </div>
          </div>
        </div>
        <div className="type flex mt-3 mb-3">
          <div className="icon mr-[0.625rem] w-10 h-10">
            <img src={avatar} alt="avatar" />
          </div>
          <form className="input">
            <input
              type="text"
              className="!border-gray-300"
              placeholder="Add a comment..."
            />
          </form>
        </div>
      </div>
    </div>
  );
}

export default EnglishAbout;
