import React, { useState, createContext } from "react";
import "./Login/Login.css";
import Face from "./Face/Face";
import { Outlet } from "react-router-dom";

export const idPersonContext = createContext(null);
export const setIdPersonContext = createContext(null);

function LoginRegister() {
  const [id, setId] = useState(0);

  return (
    <idPersonContext.Provider value={id}>
      <setIdPersonContext.Provider value={setId}>
        <div className="page flex justify-center md:justify-between ">
          <div className="outlet">
            <Outlet />
          </div>
          <Face />
        </div>
      </setIdPersonContext.Provider>
    </idPersonContext.Provider>
  );
}

export default LoginRegister;
