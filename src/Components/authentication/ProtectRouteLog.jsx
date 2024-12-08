import { Outlet, useNavigate } from "react-router-dom";

export default function ProtectRouteLog() {
<<<<<<< HEAD
  const user = true;
  const navigate = useNavigate();
  console.log(user);
=======
  const user = "ahmed";
  const navigate = useNavigate();

>>>>>>> 274c5f0b1cc78a8943c599d9535d3f21de836533
  return user ? <Outlet /> : navigate("/Login");
}
