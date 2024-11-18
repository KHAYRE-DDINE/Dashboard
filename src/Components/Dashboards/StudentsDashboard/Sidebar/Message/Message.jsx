import React, { useContext } from "react";
import "./Message.css";
import { LanguageContext } from "../../../../../App";
import EnglishMessage from "./EnglishMessage";
import ArabicMessage from "./ArabicMessage";

function Message() {
  const language = useContext(LanguageContext);
  return (
    <div>{language === "english" ? <EnglishMessage /> : <ArabicMessage />}</div>
  );
}

export default Message;
