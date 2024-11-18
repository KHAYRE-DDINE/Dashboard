import React from "react";
import { useNavigate } from "react-router-dom";

function ArabicReset({
  handleFormOne,
  whileWriting,
  isMatched,
  password,
  setPassword,
  email,
}) {
  const navigate = useNavigate();
  return (
    <form
      action="#"
      className="retrievePassword"
      onSubmit={(e) => handleFormOne(e)}
    >
      <fieldset className={" mb-3 email"}>
        <label htmlFor="resetPassword" className="form-label">
          الريدك الإلكتروني
        </label>
        <input
          className="form-control"
          type="email"
          value={email}
          placeholder="example@mail.com"
          onChange={(e) => whileWriting(e)}
        />
      </fieldset>
      <fieldset className={" mb-3 password"}>
        <label htmlFor="resetPassword" className="form-label">
          كلمة المرور الجديدة
        </label>
        <br />
        <span className="text-right">
          يجب أن تتكون كلمات المرور من 8 أحرف على الأقل ويجب أن تحتوي على مزيج
          من الأحرف والأرقام والأحرف الأخرى.
        </span>
        <input
          className="form-control"
          type="password"
          id="resetPassword"
          placeholder="●●●●●●●●"
          onChange={(v) => setPassword(v.target.value)}
          value={password}
        />
      </fieldset>
      <fieldset className="flex flex-row-reverse">
        <button onClick={() => navigate(-1)}>الرجوع</button>
        <input
          type="submit"
          className={isMatched && password.length >= 8 ? "blue" : ""}
          value="إعادة تعيين كلمة المرور"
          disabled={isMatched && password.length >= 8 ? false : true}
        />
      </fieldset>
    </form>
  );
}

export default ArabicReset;
