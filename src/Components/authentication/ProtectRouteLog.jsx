import { Outlet, useNavigate } from "react-router-dom";

export default function ProtectRouteLog() {
  const user = true;
  const navigate = useNavigate();
  console.log(user);
  return user ? <Outlet /> : navigate("/Login");
}
