import { Navigate, Outlet } from "react-router-dom";

export default function ProtectRouteLog() {
  const user = localStorage.getItem("user");

  return user ? <Outlet /> : <Navigate to="/Login" />;
}
