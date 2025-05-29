import React, { createContext, useState } from 'react';
import './App.css';
import { BrowserRouter, Route, Routes, } from 'react-router-dom'
import Login from './Components/LoginRegister/Login/Login';
import ForgotPassword from './Components/LoginRegister/ForgotPassword/ForgotPassword';
import Steps from './Components/LoginRegister/Steps/Steps';
import ByUsername from './Components/LoginRegister/Signer/LearnerAge/ByUsername';
import ClassCode from './Components/LoginRegister/ClassCode/ClassCode';
import LoginRegister from './Components/LoginRegister/LoginRegister';
import Register from './Components/LoginRegister/Register/Register';
import StudentsDashboard from './Components/Dashboards/StudentsDashboard/StudentsDashboard'
import Dashboard from "./Components/Dashboards/Dashboards";
import ResetPassword from './Components/LoginRegister/ForgotPassword/ResetPassword/ResetPassword';
import ProtectRouteDash from './Components/authentication/ProtectRouteDash';
import ProtectRouteLog from './Components/authentication/ProtectRouteLog';

export const LanguageContext = createContext(0)
export const setLanguageContext = createContext(0)

function App() {
  const [platformLanguage, setPlatformLanguage] = useState("english")


  return (
    <div className="App">
      <LanguageContext.Provider value={platformLanguage}>
        <setLanguageContext.Provider value={setPlatformLanguage}>


          <Routes>
            <Route element={<ProtectRouteLog />}>
              <Route element={<Dashboard />}>
                <Route index element={<StudentsDashboard />} />
                <Route path="/dashboard/*" element={<StudentsDashboard />} />
              </Route>
            </Route>

            <Route element={<ProtectRouteDash />}>
              <Route element={< LoginRegister />}>
                <Route exact path="login" element={< Login />} />
                <Route path="forgot-password" element={< ForgotPassword />} >
                  <Route path="password-reset/:token" element={<ResetPassword />} />
                </Route>
                <Route path="register" element={< Register />} />
                <Route path="register/steps" element={< Steps />} />
                <Route path="register/register-by-username" element={< ByUsername />} />
                <Route path="register/class-code" element={< ClassCode />} />
              </Route>
            </Route>

          </Routes>
        </setLanguageContext.Provider>
      </LanguageContext.Provider>
    </div >
  );
}

export default App;
