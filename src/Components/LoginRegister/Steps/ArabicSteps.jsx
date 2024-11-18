import React from "react";
import ValidationForm from "../ValidationForm/ValidationForm";
import TermsPrivacy from "../TermsPrivacy/TermsPrivacy";
import { useNavigate } from "react-router-dom";

function ArabicSteps({ error, handleValues, handleForm, setError,values }) {
  const navigate = useNavigate();
  return (
    <div className="wrapper ">
      <form
        action=""
        className="inputs form text-right"
        onSubmit={(e) => handleForm(e)}
      >
        <h1 className="title">تسجيل</h1>
        <fieldset
          style={{ direction: "rtl" }}
          className={error.email ? "email error" : "email"}
          data-error={
            "الرجاء إدخال تنسيق بريد إلكتروني صالح مثل example@email.com"
          }
        >
          <label htmlFor="email-or-username">البريد الإلكتروني</label>
          <input
            type="email"
            name="email"
            placeholder="example@mail.com"
            onChange={(ev) => handleValues(ev)}
            onBlur={() => setError(() => ValidationForm(values))}
          />
        </fieldset>
        <fieldset style={{ direction: "rtl" }} className="name">
          <fieldset style={{ direction: "rtl" }}>
            <label htmlFor="First name">الاسم العائلي</label>
            <input
              type="text"
              name="First name"
              placeholder="Ahmed"
              onChange={(ev) => handleValues(ev)}
            />
          </fieldset>
          <fieldset style={{ direction: "rtl" }}>
            <label htmlFor="Last name">الاسم الشخصي</label>
            <input
              type="text"
              name="Last name"
              placeholder="Mohamed"
              onChange={(ev) => handleValues(ev)}
            />
          </fieldset>
        </fieldset>
        <fieldset
          style={{ direction: "rtl" }}
          className={error.password ? "password error " : "password "}
          data-error={
            ". يجب أن تتكون كلمة المرور الخاصة بك من 8 أحرف على الأقل"
          }
        >
          <label htmlFor="password">كلمة المرور</label>
          <span>
            يجب أن تتكون كلمات المرور من 8 أحرف على الأقل ويجب أن تحتوي على مزيج
            من الأحرف والأرقام والأحرف الأخرى
          </span>
          <input
            type="password"
            name="password"
            placeholder="●●●●●●●●"
            onChange={(ev) => handleValues(ev)}
            onBlur={() => setError(() => ValidationForm(values))}
          />
        </fieldset>
        <fieldset style={{ direction: "rtl" }}>
          <button onClick={() => navigate(-1)}>الرجوع</button>
          <input
            type="submit"
            className={
              values["First name"] !== "" &&
              values["Last name"] !== "" &&
              values.email !== "" &&
              values.password !== "" &&
              Object.keys(error).length === 0
                ? "blue"
                : ""
            }
            value="تسجيل"
            disabled={
              values["First name"] !== "" &&
              values["Last name"] !== "" &&
              values.email !== "" &&
              values.password !== "" &&
              Object.keys(error).length === 0
                ? false
                : true
            }
          />
        </fieldset>
      </form>
      <TermsPrivacy />
    </div>
  );
}

export default ArabicSteps;
