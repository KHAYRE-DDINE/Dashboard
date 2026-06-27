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

  const defaultPreferences = {
    notifications: {
      newCourse: true,
      assignmentDue: true,
      messageReceived: true,
      weeklyDigest: false,
      promotions: false,
      systemUpdates: true,
    },
    appearance: "light",
    privacy: {
      profileVisible: true,
      showProgress: false,
      allowMessages: true,
    },
    courses: {
      downloadedCertificates: [],
      restoredArchivedCourses: [],
    },
  };

  useEffect(() => {
    let isMounted = true;

    const userId = localStorage.getItem("user");
    if (!userId) return;

    const hydrateCurrentUser = async () => {
      try {
        const { data } = await axios.get(`/users/${userId}`);
        if (isMounted) {
          setCurrentUser(data);
        }
      } catch (error) {
        localStorage.removeItem("user");
        if (isMounted) {
          setCurrentUser(undefined);
        }
      }
    };

    hydrateCurrentUser();

    return () => {
      isMounted = false;
    };
  }, []);

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
      const payload = {
        ...data,
        id: data.id || crypto.randomUUID(),
        firstName: data.firstName || data["first name"] || "",
        lastName: data.lastName || data["last name"] || "",
        preferences: {
          ...defaultPreferences,
          ...(data.preferences || {}),
          courses: {
            ...defaultPreferences.courses,
            ...(data.preferences?.courses || {}),
          },
        },
      };

      const { data: createdUser } = await axios.post("/users", payload);

      await getUser();
      setCurrentUser(createdUser);
      localStorage.setItem("user", createdUser.id);
      navigate("/dashboard");
      toast.success("Registration successful");
    } catch (e) {
      toast.error("Registration failed");
      if (e?.response?.status === 422) {
        console.log(e);
      }
    }
  };

  const logout = async () => {
    setUsers(null);
    setCurrentUser(undefined);
    localStorage.removeItem("user");
    navigate("/login");
  };

  const updateCurrentUser = async (partialData) => {
    if (!currentUser?.id) {
      throw new Error("No current user session found.");
    }

    const { data } = await axios.patch(`/users/${currentUser.id}`, partialData);
    setCurrentUser(data);
    return data;
  };

  const updateUserPreferences = async (nextPreferences) => {
    const currentPreferences = currentUser?.preferences || defaultPreferences;
    const mergedPreferences = {
      ...currentPreferences,
      ...nextPreferences,
      courses: {
        ...(currentPreferences.courses || defaultPreferences.courses),
        ...(nextPreferences?.courses || {}),
      },
    };

    return updateCurrentUser({ preferences: mergedPreferences });
  };

  return (
    <AuthContext.Provider
      value={{
        currentUser,
        getUser,
        login,
        register,
        logout,
        updateCurrentUser,
        updateUserPreferences,
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
