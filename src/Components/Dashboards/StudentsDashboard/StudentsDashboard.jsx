import React, {
  createContext,
  lazy,
  Suspense,
  useContext,
  useEffect,
} from "react";
import {
  Outlet,
  Route,
  Routes,
  useLocation,
  useNavigate,
} from "react-router-dom";
import "./StudentsDashboard.css";
import { LanguageContext } from "../../../App";
import useAuthContext from "../../authentication/AuthContext";
import Loading from "../../../lib/Loading";

const Charts = lazy(() => import("./Sidebar/Charts/Charts"));
const Settings = lazy(() => import("./Sidebar/Settings/Settings"));
const Help = lazy(() => import("./Sidebar/Help/Help"));
const Resources = lazy(() =>
  import("./Sidebar/Assignments/Resources/Resources")
);
const Learning = lazy(() => import("./Sidebar/Assignments/Learning/Learning"));
const About = lazy(() => import("./Sidebar/Assignments/About/About"));
const Completed = lazy(() => import("./Sidebar/Courses/Completed/Completed"));
const Archived = lazy(() => import("./Sidebar/Courses/Archived/Archived"));
const Current = lazy(() => import("./Sidebar/Courses/Current/Current"));
const Calender = lazy(() => import("./Sidebar/Calendar/Calendar"));
const Account = lazy(() => import("./Sidebar/Account/Account"));
const Message = lazy(() => import("./Sidebar/Message/Message"));
const Assignments = lazy(() => import("./Sidebar/Assignments/Assignments"));
const Library = lazy(() => import("./Sidebar/Library/Library"));
const Classes = lazy(() => import("./Sidebar/Classes/Classes"));
const Courses = lazy(() => import("./Sidebar/Courses/Courses"));
const Home = lazy(() => import("./Sidebar/Home/Home"));

export const userContext = createContext(null);

function StudentsDashboard() {
  const navigate = useNavigate();
  const location = useLocation();
  const { currentUser } = useAuthContext();

  useEffect(() => {
    if (location.pathname === "Education-Platform") {
      navigate("landing-page");
    }
  });

  return (
    <Suspense fallback={<Loading />}>
      <userContext.Provider value={currentUser}>
        <div className="student-dash pb-[10px]">
          <Routes>
            <Route index element={<Home />} />
            <Route path="home" element={<Home />} />
            <Route path="courses" element={<Courses />}>
              <Route path="current learning" element={<Current />} />
              <Route path="Archived" element={<Archived />} />
              <Route path="Completed" element={<Completed />} />
            </Route>
            <Route path="classes" element={<Classes />} />
            <Route path="charts" element={<Charts />} />
            <Route path="calendar" element={<Calender />} />
            <Route path="library" element={<Library />} />
            <Route path="message" element={<Message />} />
            <Route path="assignments" element={<Assignments />}>
              <Route path="about/:id" element={<About />} />
              <Route path="learnings/:id" element={<Learning />} />
              <Route path="resources/:id" element={<Resources />} />
            </Route>
            <Route path="account" element={<Account />} />
            <Route path="help" element={<Help />} />
            <Route path="settings" element={<Settings />} />
          </Routes>
          <Outlet />
        </div>
      </userContext.Provider>
    </Suspense>
  );
}
export default StudentsDashboard;
