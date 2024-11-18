import React from "react";
import BoxesCode from "../BoxesCode/BoxesCode";
import { useNavigate } from "react-router-dom";
import TermsPrivacy from "../TermsPrivacy/TermsPrivacy";

function ArabicClass({
  handleForm,
  setCodeClass,
  codeClass,
  isFound,
  isFull,
  setIsFull,
  setIsFound,
  showDetails,
  handleInputs,
}) {
  const navigate = useNavigate();
  return (
    <div className="wrapper">
      <form
        action=""
        className="inputs form text-right"
        onSubmit={(e) => handleForm(e)}
      >
        <h1 className="title !pb-0">انضم إلى الفصل</h1>
        {showDetails ? (
          <React.Fragment>
            <fieldset>
              <label htmlFor="Class-Code">: ستنضم إلى</label>
              <h1 className="name" style={{ textAlign: "center" }}>
                Mr. Kamal - Math
              </h1>
            </fieldset>
            <fieldset style={{ flexDirection: "column", paddingTop: "0" }}>
              <button
                style={{
                  backgroundColor: "var(--main-color)",
                  color: "white",
                  width: "367px",
                  height: "44px",
                }}
              >
                انضم إلى الفصل
              </button>
              <button
                style={{
                  backgroundColor: "#1865F220",
                  color: "var(--main-color)",
                  width: "367px",
                  height: "44px",
                }}
                onClick={() => handleInputs()}
              >
                أنا في فصل دراسي مختلف
              </button>
            </fieldset>
          </React.Fragment>
        ) : (
          <React.Fragment>
            <fieldset>
              <label htmlFor="class-Code">رمز الفصل</label>
              <span className="text-right">
                أدخل رمز الفصل المكون من 8 أحرف الذي تلقيته من معلمك أو أحد
                والديك.
              </span>
            </fieldset>
            <BoxesCode
              dataError="لم نتمكن من العثور على فصل دراسي بهذا الرمز، يرجى إدخال رمز صالح"
              isFound={isFound}
              setIsFound={setIsFound}
              setCodeClass={setCodeClass}
              codeClass={codeClass}
              setIsFull={setIsFull}
            />
            <fieldset className="!flex-row-reverse">
              <button onClick={() => navigate(-1)}>الرجوع</button>
              <input
                type="submit"
                value="إستمر"
                className={isFull ? "blue" : ""}
              />
            </fieldset>
          </React.Fragment>
        )}
      </form>
      <TermsPrivacy />
    </div>
  );
}

export default ArabicClass;
