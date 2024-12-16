import { Outlet, useNavigate } from "react-router-dom";

export default function ProtectRouteDash({ user }) {
  const navigate = useNavigate();

  return user ? navigate("dashboard") : <Outlet />;
}
