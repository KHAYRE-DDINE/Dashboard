import React from "react";
import { useNavigate } from "react-router-dom";
import BoxesCode from "../BoxesCode/BoxesCode";
import TermsPrivacy from "../TermsPrivacy/TermsPrivacy";

function EnglishClass({
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
      <form action="" className="inputs form" onSubmit={(e) => handleForm(e)}>
        <h1 className="title !pb-0">Join class</h1>
        {showDetails ? (
          <React.Fragment>
            <fieldset>
              <label htmlFor="Class-Code">You are joining:</label>
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
                Join class
              </button>
              <button
                style={{
                  backgroundColor: "#1865F220",
                  color: "var(--main-color)",
                  width: "367px",
                  height: "44px",
                }}
                className={isFound ? "blue" : ""}
                onClick={() => handleInputs()}
              >
                I'm in a different class
              </button>
            </fieldset>
          </React.Fragment>
        ) : (
          <React.Fragment>
            <fieldset>
              <label htmlFor="Class-Code">Class Code</label>
              <span style={{ textAlign: "start" }}>
                Enter the 8 characters class code you received from your teacher
                or parent.
              </span>
            </fieldset>
            <BoxesCode
              dataError="We couldn’t find a class with this code, please enter a valid code."
              isFound={isFound}
              setCodeClass={setCodeClass}
              setIsFull={setIsFull}
            />
            <fieldset>
              <button onClick={() => navigate(-1)}>back</button>
              <input
                type="submit"
                value="Continue"
                className={isFull ? "blue" : ""}
                disabled={isFull ? false : true}
              />
            </fieldset>
          </React.Fragment>
        )}
      </form>
      <TermsPrivacy info="By signing up" />
    </div>
  );
}

export default EnglishClass;
