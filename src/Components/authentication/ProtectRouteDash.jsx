import { Navigate, Outlet } from "react-router-dom";

export default function ProtectRouteDash() {
  const user = localStorage.getItem("user");

  return user ? <Navigate to="/" /> : <Outlet />;
}
