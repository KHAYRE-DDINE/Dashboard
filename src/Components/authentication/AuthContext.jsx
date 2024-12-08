import axios from "../api/axios";
import { createContext, useContext, useState } from "react";
import { useNavigate } from "react-router-dom";

const AuthContext = createContext({});

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
<<<<<<< HEAD
  // const csrf = () => axios.get("/sanctum/csrf-cookie");
=======
  const csrf = () => axios.get("/sanctum/csrf-cookie");
>>>>>>> 274c5f0b1cc78a8943c599d9535d3f21de836533
  const navigate = useNavigate();

  const getUser = async () => {
    const { data } = axios.get("/api/user");
    setUser(data);
  };

  const login = async ({ ...data }) => {
<<<<<<< HEAD
    // await csrf();
=======
    await csrf();
>>>>>>> 274c5f0b1cc78a8943c599d9535d3f21de836533
    try {
      await axios.post("/login", data);
      getUser();
      navigate("/");
    } catch (e) {
      if (e.response.status === 422) {
        console.log(e);
      }
    }
  };

  const register = async ({ ...data }) => {
<<<<<<< HEAD
    // await csrf();
    console.log(data);
    try {
      await axios.post("/register", data);
      // getUser();
      // navigate("/");
      alert("Your register success");
    } catch (e) {
      alert("Your register failed");
      // if (e.response.status === 422) {
      //   console.log(e);
      // }
=======
    await csrf();
    try {
      await axios.post("/register/steps", data);
      getUser();
      navigate("/");
    } catch (e) {
      if (e.response.status === 422) {
        console.log(e);
      }
>>>>>>> 274c5f0b1cc78a8943c599d9535d3f21de836533
    }
  };

  return (
    <AuthContext.Provider value={{ user, getUser, login, register }}>
      {children}
    </AuthContext.Provider>
  );
};

export default function useAuthContext() {
  return useContext(AuthContext);
}
