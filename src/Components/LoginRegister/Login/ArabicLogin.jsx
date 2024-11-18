import React from "react";
import { Link } from "react-router-dom";
import LoginMethod from "../LoginMethod/LoginMethod";
import BoxesCode from "../BoxesCode/BoxesCode";
import TermsPrivacy from "../TermsPrivacy/TermsPrivacy";

function ArabicLogin({
  checkPAssValidation,
  handleLogin,
  changeInputs,
  whileWriting,
  info,
  theWay,
  setTheWay,
  isMatched,
  getPassword,
  setCodeClass,
  setIsFull,
  isCorrect,
  setInfo,
}) {
  return (
    <div className="wrapper">
      <div className="form">
        <h1 className="title text-right">تسجيل الدخول</h1>
        <LoginMethod theWay={theWay} setTheWay={setTheWay} info={info} />
        <Link className="other" to="#" onClick={() => changeInputs()}>
          {theWay === "email"
            ? "التسجيل بدون كلمة السر"
            : "التسجيل بالبريد الإلكتروني"}
        </Link>
        <span className="or">or</span>
        {theWay === "email" ? (
          <form className="inputs text-right" onSubmit={(e) => handleLogin(e)}>
            <fieldset
              className={!isMatched ? "email error " : "email"}
              data-error={
                " example@mail.com الرجاء إدخال تنسيق بريد إلكتروني صالح مثل"
              }
            >
              <label htmlFor="email-or-username">
                البريد الإلكتروني أو إسم المستخدم
                <b>*</b>
              </label>
              <input
                onChange={(event) => whileWriting(event)}
                value={info.email}
                type="email"
                name="email"
                placeholder="example@mail.com"
                disabled={!getPassword ? false : true}
              />
            </fieldset>
            {getPassword ? (
              <fieldset className="get">
                <BoxesCode
                  setCodeClass={setCodeClass}
                  setIsFull={setIsFull}
                  isFound={isCorrect}
                  dataError="Error message."
                />
                <input
                  type="submit"
                  value="تسجيل الدخول"
                  className={info.email !== "" && isMatched ? "blue" : ""}
                  disabled={info.email !== "" && isMatched ? false : true}
                  onClick={() => checkPAssValidation()}
                />
              </fieldset>
            ) : (
              <input
                type="submit"
                value="احصل على كلمة مرور"
                className={info.email !== "" && isMatched ? "blue" : ""}
                disabled={info.email !== "" && isMatched ? false : true}
              />
            )}
          </form>
        ) : (
          <form className="inputs text-right">
            <fieldset
              style={{ direction: "rtl" }}
              className={!isMatched ? "email error" : "email"}
              data-error={
                "الرجاء إدخال تنسيق بريد إلكتروني صالح مثل example@mail.com."
              }
            >
              <label htmlFor="email-or-username">
                البريد الإلكتروني أو إسم المستخدم
                <b>*</b>
              </label>
              <input
                onChange={(event) => whileWriting(event)}
                value={info.email}
                type="email"
                name="email"
                placeholder="example@mail.com"
              />
            </fieldset>
            <fieldset className="password" style={{ direction: "rtl" }}>
              <label htmlFor="password">
                كلمة المرور
                <b>*</b>
                <Link
                  to="/forgot-password"
                  style={{ left: 0, right: "initial" }}
                >
                  نسيت كلمة المرور؟
                </Link>
              </label>
              <input
                onChange={(event) =>
                  setInfo({ ...info, password: event.target.password })
                }
                type="password"
                name="password"
                placeholder="●●●●●●●●"
              />
            </fieldset>
            <input
              className={
                info.email !== "" && info.password !== "" && isMatched
                  ? "blue"
                  : ""
              }
              type="submit"
              value="تسجيل الدخول"
              disabled={
                info.email !== "" && info.password !== "" && isMatched
                  ? false
                  : true
              }
            />
          </form>
        )}
        <p className="text-right">
          لا تملك حسابا بعد؟
          <Link to="/register"> إنشاء حساب</Link>
        </p>

        <TermsPrivacy />
      </div>
    </div>
  );
}

export default ArabicLogin;
