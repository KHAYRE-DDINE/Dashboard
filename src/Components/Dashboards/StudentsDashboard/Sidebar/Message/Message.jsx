import React, { useContext } from "react";
import "./Message.css";
import { LanguageContext } from "../../../../../App";
import searchIcon from "../../../../../images/search.svg";
import avatar from "../../../../../images/avatar.svg";
import avatar9 from "../../../../../images/pngegg (9).svg";
import avatar23 from "../../../../../images/pngegg (23).svg";
import avatar22 from "../../../../../images/pngegg (22).svg";
import avatar19 from "../../../../../images/pngegg (19).svg";
import avatar18 from "../../../../../images/pngegg (18).svg";
import avatar16 from "../../../../../images/pngegg (16).svg";
import avatar14 from "../../../../../images/pngegg (14).svg";
import avatar12 from "../../../../../images/pngegg (12).svg";
import { FiSend } from "react-icons/fi";
import { AiTwotoneAudio } from "react-icons/ai";
import { PiPaperclipHorizontalDuotone } from "react-icons/pi";
import { IoCallOutline } from "react-icons/io5";
import { CiVideoOn } from "react-icons/ci";
import DropDownDots from "./DropDownDots";
import { motion } from "framer-motion";

function Message() {
  return (
    <div className="message-section flex">
      <div className="sideBar-msg bg-gray-50">
        <div className="title">
          <motion.h1
            initial={{ left: "30%", rotateY: 0 }}
            animate={{ left: "0%", rotateY: "360deg" }}
            transition={{ duration: 2, delay: 0.2 }}
            className="capitalize text-gray-700"
          >
            messages
          </motion.h1>
        </div>
        <div className="box-search">
          <div className="image">
            <img src={avatar} alt="avatar" />
          </div>
          <div className="search-box">
            <input
              type="search"
              className="filter !border-gray-300"
              placeholder="Searching something..."
            />
            <img src={searchIcon} className="" alt="searchIcon" />
          </div>
        </div>
        <div className="members">
          <div className="member flex items-center">
            <div className="image">
              <img src={avatar9} alt="avatar" />
            </div>
            <div className="info ">
              <div className="name">
                <h4 className="text-gray-700">khalid Al Walid</h4>
              </div>
              <div className="last-msg flex items-center">
                <span className="msg text-gray-600">
                  Good morning to you all!
                </span>
                <span className="date text-gray-400">20min</span>
              </div>
            </div>
          </div>
          <div className="member flex items-center">
            <div className="image">
              <img src={avatar22} alt="avatar" />
            </div>
            <div className="info ">
              <div className="name">
                <h4 className="text-gray-700">Amal Hamdalah</h4>
              </div>
              <div className="last-msg flex items-center">
                <span className="msg text-gray-600">
                  yes the document I sent you contains all{" "}
                </span>
                <span className="date text-gray-400">2min</span>
              </div>
            </div>
          </div>
          <div className="member flex items-center">
            <div className="image">
              <img src={avatar19} alt="avatar" />
            </div>
            <div className="info ">
              <div className="name">
                <h4 className="text-gray-700">Jamal Monim</h4>
              </div>
              <div className="last-msg flex items-center">
                <span className="msg text-gray-600">
                  I’ll mention this issue to Mr. Kamal and wait
                </span>
                <span className="date text-gray-400">1mo</span>
              </div>
            </div>
          </div>
          <div className="member flex items-center">
            <div className="image">
              <img src={avatar16} alt="avatar" />
            </div>
            <div className="info ">
              <div className="name">
                <h4 className="text-gray-700">Felecia Rower</h4>
              </div>
              <div className="last-msg flex items-center">
                <span className="msg text-gray-600">
                  I hope you have a great day. Good morning!
                </span>
                <span className="date text-gray-400">20min</span>
              </div>
            </div>
          </div>
          <div className="member flex items-center">
            <div className="image">
              <img src={avatar14} alt="avatar" />
            </div>
            <div className="info ">
              <div className="name">
                <h4 className="text-gray-700">Calvin Moore</h4>
              </div>
              <div className="last-msg flex items-center">
                <span className="msg text-gray-600">
                  If it takes long you can mail inbox user
                </span>
                <span className="date text-gray-400">1day</span>
              </div>
            </div>
          </div>
          <div className="member flex items-center">
            <div className="image">
              <img src={avatar18} alt="avatar" />
            </div>
            <div className="info ">
              <div className="name">
                <h4 className="text-gray-700">Natalie Maxwell</h4>
              </div>
              <div className="last-msg flex items-center">
                <span className="msg text-gray-600">UI/UX Designer</span>
                <span className="date text-gray-400">2h</span>
              </div>
            </div>
          </div>
          <div className="member flex items-center">
            <div className="image">
              <img src={avatar23} alt="avatar" />
            </div>
            <div className="info ">
              <div className="name">
                <h4 className="text-gray-700">Jess Cook</h4>
              </div>
              <div className="last-msg flex items-center">
                <span className="msg text-gray-600">
                  Refer friends. Get rewards.
                </span>
                <span className="date text-gray-400">20min</span>
              </div>
            </div>
          </div>
          <div className="member flex items-center">
            <div className="image">
              <img src={avatar12} alt="avatar" />
            </div>
            <div className="info ">
              <div className="name">
                <h4 className="text-gray-700">Stacy Garrison</h4>
              </div>
              <div className="last-msg flex items-center">
                <span className="msg text-gray-600">
                  I will purchase it for sure. 👍
                </span>
                <span className="date text-gray-400">30min</span>
              </div>
            </div>
          </div>
          <div className="member flex items-center">
            <div className="image">
              <img src={avatar18} alt="avatar" />
            </div>
            <div className="info ">
              <div className="name">
                <h4 className="text-gray-700">Mary Giles</h4>
              </div>
              <div className="last-msg flex items-center">
                <span className="msg text-gray-600">
                  I hope you have a great day. Good morning!
                </span>
                <span className="date text-gray-400">7h</span>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="rightSide-msg">
        <div className="top-of-chat flex justify-between items-center">
          <div className="person flex justify-center items-center gap-3">
            <div className="image">
              <img className="w-[40px] h-[40px]" src={avatar} alt="avatar" />
            </div>
            <div className="info">
              <h1 className="name">khayreddine aharrar</h1>
              <span className="role">front end developer</span>
            </div>
          </div>
          <div className="icons flex justify-between items-center">
            <div className="voice">
              <IoCallOutline />
            </div>
            <div className="video">
              <CiVideoOn />
            </div>
            <div className="search">
              <img
                className="cursor-pointer w-5 h-5"
                src={searchIcon}
                alt="search-icon"
              />
            </div>
            <div className="dots h-5">
              <DropDownDots />
            </div>
          </div>
        </div>
        <div className="messages flex flex-col gap-8">
          <div className="message owner flex-row-reverse flex gap-2">
            <img src={avatar} alt="avatar" />
            <span className="text-white bg-primary-100 mx-3">
              Man, that logarithms lesson was something else! I'm still trying
              to wrap my head around the whole concept.
            </span>
          </div>
          <div className="message owner flex-row-reverse flex gap-2">
            <img src={avatar} alt="avatar" />
            <span className="text-white bg-primary-100 mx-3">
              Man, that logarithms lesson was something else! I'm still trying
              to wrap my head around the whole concept.
            </span>
          </div>
          <div className="message owner flex-row-reverse flex gap-2">
            <img src={avatar} alt="avatar" />
            <span className="text-white bg-primary-100 mx-3">
              Man, that logarithms lesson was something else! I'm still trying
              to wrap my head around the whole concept.
            </span>
          </div>
          <div className="message owner flex-row-reverse flex gap-2">
            <img src={avatar} alt="avatar" />
            <span className="text-white bg-primary-100 mx-3">
              Man, that logarithms lesson was something else! I'm still trying
              to wrap my head around the whole concept.
            </span>
          </div>
          <div className="message owner flex-row-reverse flex gap-2">
            <img src={avatar} alt="avatar" />
            <span className="text-white bg-primary-100 mx-3">
              Man, that logarithms lesson was something else! I'm still trying
              to wrap my head around the whole concept.
            </span>
          </div>
          <div className="message host flex gap-2">
            <img src={avatar} alt="avatar" />
            <span className="text-black bg-gray-100 mx-3">
              Yeah, me too. I kind of get the basic idea of it being the inverse
              of exponents, but those properties and rules are killing me!
            </span>
          </div>
          <div className="message owner flex-row-reverse flex gap-2">
            <img src={avatar} alt="avatar" />
            <span className="text-white bg-primary-100 mx-3">
              Right? Like, the product rule, quotient rule, and power rule. I
              keep mixing them up!{" "}
            </span>
          </div>
          <div className="message host flex gap-2">
            <img src={avatar} alt="avatar" />
            <span className="text-black bg-grayD mx-3">
              I know! And don't even get me started on the change of base
              formula. I'm pretty sure my brain is about to explode.
            </span>
          </div>
          <div className="message host flex gap-2">
            <img src={avatar} alt="avatar" />
            <span className="text-black bg-grayD mx-3">
              I know! And don't even get me started on the change of base
              formula. I'm pretty sure my brain is about to explode.
            </span>
          </div>
          <div className="message host flex gap-2">
            <img src={avatar} alt="avatar" />
            <span className="text-black bg-grayD mx-3">
              I know! And don't even get me started on the change of base
              formula. I'm pretty sure my brain is about to explode.
            </span>
          </div>
          <div className="message host flex gap-2">
            <img src={avatar} alt="avatar" />
            <span className="text-black bg-grayD mx-3">
              I know! And don't even get me started on the change of base
              formula. I'm pretty sure my brain is about to explode.
            </span>
          </div>
        </div>
        <div className="input-msg">
          <input
            type="text"
            className="!border-grayD"
            placeholder="Type your message here"
          />
          <div className="buttons">
            <button className="microphone">
              <AiTwotoneAudio size={"22"} />
            </button>
            <button className="file">
              <PiPaperclipHorizontalDuotone size={"22"} />
            </button>
            <button className="send">
              send <FiSend />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Message;
