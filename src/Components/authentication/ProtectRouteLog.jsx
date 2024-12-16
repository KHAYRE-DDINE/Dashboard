import { Outlet, useNavigate } from "react-router-dom";

export default function ProtectRouteLog({ user }) {
  const navigate = useNavigate();

  return user ? <Outlet /> : navigate("/Login");
}
