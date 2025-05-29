import axios from "../api/axios";
import { createContext, useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const AuthContext = createContext({});

export const AuthProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(undefined);
  const [users, setUsers] = useState(undefined);
  const [isFound, setIsFound] = useState(true);
  const [isPasswordCorrect, setIsPasswordCorrect] = useState(true);
  const [isSuccessed, setIsSuccessed] = useState(undefined);
  const [status, setStatus] = useState();
  const [token, setToken] = useState();

  // const csrf = () => axios.get("/sanctum/csrf-cookie");
  const navigate = useNavigate();

  const getUser = async () => {
    const { data, status } = await axios.get("/users");
    setUsers(data);
    setStatus(status);
  };

  const login = async ({ ...data }) => {
    // await csrf();
    try {
      await getUser();
      // eslint-disable-next-line array-callback-return
      users.map((user) => {
        if (user && user.email === data.email) {
          setIsFound(true);
          if (user.password === data.password) {
            setIsPasswordCorrect(true);
            setIsSuccessed(true);
            toast.success("Successful Login", {
              position: "top-center",
              draggable: true,
            });
            navigate("/dashboard");
            setCurrentUser(user);
            localStorage.setItem("user", user.id);
          } else {
            setIsPasswordCorrect(false);
          }
        } else {
          setIsFound(false);
          // eslint-disable-next-line no-lone-blocks
          {
            !isFound &&
              toast.warning("The account not found", {
                position: "top-center",
                draggable: true,
              });
          }
        }
      });
    } catch (error) {
      if (error.response && error.response.status === 431) {
        console.error("Request header too large:", error.response.data);
      }
    }
  };

  const register = async ({ ...data }) => {
    // await csrf();
    try {
      await axios.post("/users", data);
      getUser();
      localStorage.setItem("user", data.id);
      navigate("/dashboard");
      toast.success("Your register successed");
    } catch (e) {
      toast.error("Your register failed");
      if (e.response.status === 422) {
        console.log(e);
      }
    }
  };

  const logout = async () => {
    setUsers(null);
    localStorage.removeItem("user");
    navigate("/Login");
  };

  return (
    <AuthContext.Provider
      value={{
        currentUser,
        getUser,
        login,
        register,
        logout,
        isPasswordCorrect,
        isFound,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export default function useAuthContext() {
  return useContext(AuthContext);
}
