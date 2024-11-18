import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import TermsPrivacy from "../TermsPrivacy/TermsPrivacy";
import ResetPassword from "./ResetPassword/ResetPassword";

function ArabicForgot({
  isMatched,
  handleFormTwo,
  whileWriting,
  email,
  found,
  setEmail,
}) {
  const location = useLocation();
  const navigate = useNavigate();
  return (
    <div className="form forgot text-right">
      <h1 className="title">نسيت كلمة السر</h1>
      {location.pathname.includes("reset") ? (
        <ResetPassword email={email} setEmail={setEmail} />
      ) : (
        <form
          action="#"
          className="writeYourEmail text-right"
          method="get"
          onSubmit={(e) => handleFormTwo(e)}
        >
          <fieldset
            className={!found ? "error mb-3 email" : "email"}
            data-error={`${email} عذرًا، لا يمكننا العثور على حساب أكاديمية الرحلة متصل بـ `}
          >
            <label htmlFor="resetPassword" className="form-label">
              : أدخل بريدك الإلكتروني لإعادة تعيين كلمة المرور
            </label>
            <input
              className="form-control"
              type="email"
              id="resetPassword"
              placeholder="example@mail.com"
              onChange={(e) => whileWriting(e)}
              autoComplete="off"
            />
          </fieldset>

          <fieldset className="!mt-0 !flex-row-reverse">
            <button onClick={() => navigate(-1)}>الرجوع</button>
            <input
              type="submit"
              className={isMatched ? "blue" : ""}
              value="إعادة تعيين كلمة المرور"
              disabled={isMatched ? false : true}
            />
          </fieldset>
        </form>
      )}
      <TermsPrivacy />
    </div>
  );
}

export default ArabicForgot;
