import React from "react";
import { useNavigate } from "react-router-dom";
import TermsPrivacy from "../../TermsPrivacy/TermsPrivacy";

function ArabicByUser({
  handleLearnerForm,
  error,
  handleValues,
  setError,
  ValidationForm,
  values,
}) {
  const navigate = useNavigate();

  return (
    <div className="wrapper ">
      <form
        className="inputs form text-right"
        onSubmit={(e) => handleLearnerForm(e)}
      >
        <h1 className="title">تسجيل</h1>
        <fieldset
          style={{ direction: "rtl" }}
          className={error.email ? "email error" : "email"}
          data-error="الرجاء إدخال تنسيق بريد إلكتروني صالح مثل example@email.com"
        >
          <label htmlFor="email-or-username">
            البريد الإلكتروني لولي الأمر
          </label>
          <span className="text-right">
            نحن متحمسون للبدء، ولكننا بحاجة إلى إخطار والديك أو ولي أمرك بشأن
            حسابك
          </span>
          <input
            type="email"
            name="email"
            placeholder="example@mail.com"
            onChange={(ev) => handleValues(ev)}
            onBlur={() => setError(() => ValidationForm(values))}
          />
        </fieldset>
        <fieldset
          style={{ direction: "rtl" }}
          className={error.username ? "username error" : "username"}
          data-error={"قصير جدا."}
        >
          <label htmlFor="username">اسم المستخدم</label>
          <span className="text-right">
            استخدم الحروف والأرقام فقط. من أجل سلامتك، لا تستخدم اسمك الحقيقي
          </span>
          <input
            type="text"
            name="username"
            placeholder="spidy4581"
            onChange={(ev) => handleValues(ev)}
            onBlur={() => setError(() => ValidationForm(values))}
          />
        </fieldset>
        <fieldset
          style={{ direction: "rtl" }}
          className={
            error.password ? "password error text-right" : "password text-right"
          }
          data-error={"يجب أن تتكون كلمة المرور الخاصة بك من 8 أحرف على الأقل"}
        >
          <label htmlFor="password">كلمة المرور</label>
          <span className="text-right">
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
              values.username !== "" &&
              values.email !== "" &&
              values.password !== "" &&
              Object.keys(error).length === 0
                ? "blue"
                : ""
            }
            disabled={
              values.username !== "" &&
              values.email !== "" &&
              values.password !== "" &&
              Object.keys(error).length === 0
                ? false
                : true
            }
            value="التسجيل"
          />
        </fieldset>
      </form>
      <TermsPrivacy />
    </div>
  );
}

export default ArabicByUser;
