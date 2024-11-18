import "./Header.css";
import React, { useContext } from "react";
import { LanguageContext, setLanguageContext } from "../../App";
import EnglishHeader from "./EnglishHeader";
import ArabicHeader from "./ArabicHeader";

function Header() {
  const setLanguage = useContext(setLanguageContext);
  const Language = useContext(LanguageContext);

  // const changeLanguage = (e) => {
  //   setLanguage(e.target.value);
  // };
  //  <div className="box-lang flex items-center justify-around relative text-sm font-semibold leading-6 text-gray-900 capitalize">
  //    <div className="language-icon absolute left-0">
  //      <TbWorld />
  //    </div>
  //    <select
  //      name="language"
  //      onChange={(e) => changeLanguage(e)}
  //      className="capitalize outline-none text-normalColor"
  //    >
  //      <option value="english">english</option>
  //      <option value="arabic">arabic</option>
  //    </select>
  //    <ChevronDownIcon className="-mr-1 h-5 w-5 text-gray-400 absolute right-0" />
  //  </div>;
  return (
    <React.Fragment>
      {Language === "english" ? <EnglishHeader /> : <ArabicHeader />}
    </React.Fragment>
  );
}

export default Header;
