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
    toast("Email: ahrarkhirdin@gmail.com | Password is : 123456 !");
  };

  useEffect(() => {
    firstNotify();
  }, []);

  return (
    <idPersonContext.Provider value={id}>
      <setIdPersonContext.Provider value={setId}>
        <div className="page min-h-screen bg-white dark:bg-[#0b0f19] text-gray-900 dark:text-white flex justify-center md:justify-between transition-colors duration-300">
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
