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
    return data; // return directly to avoid async state timing issues
  };

  const login = async ({ ...data }) => {
    try {
      const fetchedUsers = await getUser();

      const matchedUser = fetchedUsers && fetchedUsers.find((user) => user.email === data.email);

      if (!matchedUser) {
        setIsFound(false);
        toast.warning("Account not found", {
          position: "top-center",
          draggable: true,
        });
        return;
      }

      setIsFound(true);

      if (matchedUser.password !== data.password) {
        setIsPasswordCorrect(false);
        toast.error("Incorrect password", {
          position: "top-center",
          draggable: true,
        });
        return;
      }

      setIsPasswordCorrect(true);
      setIsSuccessed(true);
      setCurrentUser(matchedUser);
      localStorage.setItem("user", matchedUser.id);
      toast.success("Successful Login", {
        position: "top-center",
        draggable: true,
      });
      navigate("/dashboard");
    } catch (error) {
      console.error("Login error:", error?.message || error);
      toast.error("Could not reach the server. Make sure json-server is running on port 3001.", {
        position: "top-center",
      });
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
