import React, { useState, createContext, useEffect } from "react";
import "./Login/Login.css";
import Face from "./Face/Face";
import { Outlet } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export const idPersonContext = createContext(null);
export const setIdPersonContext = createContext(null);

function LoginRegister() {
  const [id, setId] = useState(0);

  const firstNotify = () => {
    toast("Password is : 123456789 !");
  };

  const secondNotify = () => {
    toast("Dashboard still under development");
  };

  useEffect(() => {
    firstNotify();
    secondNotify();
  }, []);

  return (
    <idPersonContext.Provider value={id}>
      <setIdPersonContext.Provider value={setId}>
        <div className="page flex justify-center md:justify-between ">
          <div className="outlet">
            <Outlet />
          </div>
          <Face />
          <ToastContainer />
        </div>
      </setIdPersonContext.Provider>
    </idPersonContext.Provider>
  );
}

export default LoginRegister;
