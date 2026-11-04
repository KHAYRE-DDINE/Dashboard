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
  const [isLoading, setIsLoading] = useState(false);
  const [theme, setTheme] = useState(() => localStorage.getItem("theme") || "light");
  const [isSuccessed, setIsSuccessed] = useState(undefined);
  const [status, setStatus] = useState();

  const navigate = useNavigate();

  const normalizeUser = (user) => {
    if (!user) return user;
    let parsedPrefs = user.preferences;
    if (typeof parsedPrefs === "string") {
      try {
        parsedPrefs = JSON.parse(parsedPrefs);
      } catch (e) {
        parsedPrefs = {};
      }
    }
    return {
      ...user,
      preferences: parsedPrefs || {},
      firstName: user.firstName || user["first name"] || "",
      lastName: user.lastName || user["last name"] || "",
      "first name": user.firstName || user["first name"] || "",
      "last name": user.lastName || user["last name"] || "",
    };
  };

  const applyTheme = (mode) => {
    const isDark =
      mode === "dark" ||
      (mode === "system" && window.matchMedia("(prefers-color-scheme: dark)").matches);

    if (isDark) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  };

  useEffect(() => {
    applyTheme(theme);
    localStorage.setItem("theme", theme);
  }, [theme]);

  const changeTheme = async (nextTheme) => {
    setTheme(nextTheme);
    localStorage.setItem("theme", nextTheme);
    applyTheme(nextTheme);

    const token = localStorage.getItem("token");
    const userId = currentUser?.id || localStorage.getItem("user");

    if (token || userId) {
      try {
        const payload = {
          preferences: {
            ...(currentUser?.preferences || {}),
            appearance: nextTheme,
          },
          isDarkMode: nextTheme === "dark"
        };
        await axios.patch("/users/me", payload);
        if (currentUser) {
          setCurrentUser((prev) => ({
            ...prev,
            preferences: {
              ...(prev?.preferences || {}),
              appearance: nextTheme,
            },
            isDarkMode: nextTheme === "dark"
          }));
        }
      } catch (err) {
        if (userId) {
          try {
            await axios.patch(`/users/${userId}`, {
              preferences: { appearance: nextTheme },
              isDarkMode: nextTheme === "dark"
            });
          } catch (e) {
            // Silently ignore preference sync failure
          }
        }
      }
    }
  };

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
    const token = localStorage.getItem("token");
    const userId = localStorage.getItem("user");

    if (!token && !userId) return;

    const hydrateCurrentUser = async () => {
      // 1. Try real JWT endpoint /users/me
      if (token) {
        try {
          const { data } = await axios.get("/users/me");
          const userObj = data?.data || data;
          if (isMounted && userObj) {
            const normalized = normalizeUser(userObj);
            setCurrentUser(normalized);
            if (normalized?.preferences?.appearance) {
              setTheme(normalized.preferences.appearance);
            }
            return;
          }
        } catch (err) {
          // Token might be invalid or expired
        }
      }

      // 2. Fallback to /users/{userId}
      if (userId) {
        try {
          const { data } = await axios.get(`/users/${userId}`);
          const userObj = data?.data || data;
          if (isMounted && userObj) {
            const normalized = normalizeUser(userObj);
            setCurrentUser(normalized);
            if (normalized?.preferences?.appearance) {
              setTheme(normalized.preferences.appearance);
            }
          }
        } catch (error) {
          localStorage.removeItem("user");
          localStorage.removeItem("token");
          if (isMounted) {
            setCurrentUser(undefined);
          }
        }
      }
    };

    hydrateCurrentUser();

    return () => {
      isMounted = false;
    };
  }, []);

  const getUser = async () => {
    try {
      const { data, status: s } = await axios.get("/users");
      const list = Array.isArray(data) ? data : (data?.data || []);
      setUsers(list);
      setStatus(s);
      return list;
    } catch {
      return [];
    }
  };

  const login = async ({ ...data }) => {
    setIsLoading(true);
    try {
      // 1. First attempt: Authenticate against Spring Boot JWT backend
      try {
        const res = await axios.post("/auth/login", {
          email: data.email?.trim(),
          password: data.password,
        });

        const authData = res.data?.data || res.data;
        const token = authData?.token || authData?.accessToken;
        const user = authData?.user;

        if (token && user) {
          const normalized = normalizeUser(user);
          localStorage.setItem("token", token);
          localStorage.setItem("user", normalized.id);
          setCurrentUser(normalized);
          setIsSuccessed(true);
          setIsFound(true);
          setIsPasswordCorrect(true);
          if (normalized?.preferences?.appearance) {
            setTheme(normalized.preferences.appearance);
          }
          toast.success("Welcome back to Al Taalim!", {
            position: "top-center",
            draggable: true,
          });
          navigate("/dashboard");
          return;
        }
      } catch (backendErr) {
        // If server responded with 401/403/400 (explicit credentials rejection), report it
        if (backendErr.response && backendErr.response.status === 401) {
          setIsPasswordCorrect(false);
          toast.error("Invalid email or password", {
            position: "top-center",
            draggable: true,
          });
          return;
        }
        if (backendErr.response && backendErr.response.status === 404) {
          setIsFound(false);
          toast.warning("Account not found with this email", {
            position: "top-center",
            draggable: true,
          });
          return;
        }
      }

      // 2. Secondary fallback: check existing users collection
      const fetchedUsers = await getUser();
      const targetEmail = data.email?.toLowerCase().trim();
      const matchedUser =
        fetchedUsers &&
        fetchedUsers.find(
          (user) => user.email?.toLowerCase().trim() === targetEmail
        );

      if (!matchedUser) {
        setIsFound(false);
        toast.warning("Account not found", {
          position: "top-center",
          draggable: true,
        });
        return;
      }

      setIsFound(true);

      if (matchedUser.password !== data.password && matchedUser.password_hash !== data.password) {
        setIsPasswordCorrect(false);
        toast.error("Incorrect password", {
          position: "top-center",
          draggable: true,
        });
        return;
      }

      setIsPasswordCorrect(true);
      setIsSuccessed(true);
      const normalized = normalizeUser(matchedUser);
      setCurrentUser(normalized);
      localStorage.setItem("user", normalized.id);
      toast.success("Successful Login", {
        position: "top-center",
        draggable: true,
      });
      navigate("/dashboard");
    } catch (error) {
      console.error("Login error:", error?.message || error);
      toast.error("Could not reach Al Taalim backend server.", {
        position: "top-center",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const register = async ({ ...data }) => {
    setIsLoading(true);
    try {
      // 1. First attempt: Spring Boot JWT Registration
      try {
        const res = await axios.post("/auth/register", {
          email: data.email?.trim(),
          password: data.password,
          firstName: data.firstName || data["first name"] || "Student",
          lastName: data.lastName || data["last name"] || "",
          phone: data.phone || "",
          role: data.role || "STUDENT",
        });

        const authData = res.data?.data || res.data;
        const token = authData?.token || authData?.accessToken;
        const user = authData?.user;

        if (token && user) {
          const normalized = normalizeUser(user);
          localStorage.setItem("token", token);
          localStorage.setItem("user", normalized.id);
          setCurrentUser(normalized);
          toast.success("Welcome to Al Taalim! Registration successful.", {
            position: "top-center",
          });
          navigate("/dashboard");
          return;
        }
      } catch (backendErr) {
        if (backendErr.response && backendErr.response.status === 409) {
          toast.warning("An account with this email already exists.");
          return;
        }
      }

      // 2. Secondary fallback
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
      const normalized = normalizeUser(createdUser);
      setCurrentUser(normalized);
      localStorage.setItem("user", normalized.id);
      navigate("/dashboard");
      toast.success("Registration successful");
    } catch (e) {
      toast.error("Registration failed. Please check your details and try again.");
    } finally {
      setIsLoading(false);
    }
  };

  const logout = async () => {
    setUsers(null);
    setCurrentUser(undefined);
    localStorage.removeItem("user");
    localStorage.removeItem("token");
    navigate("/login");
  };

  const updateCurrentUser = async (partialData) => {
    let updatedUser = null;
    const token = localStorage.getItem("token");

    if (token) {
      try {
        const res = await axios.patch("/users/me", partialData);
        const userData = res.data?.data || res.data;
        if (userData) {
          updatedUser = normalizeUser(userData);
        }
      } catch (err) {
        if (currentUser?.id) {
          try {
            const res = await axios.patch(`/users/${currentUser.id}`, partialData);
            const userData = res.data?.data || res.data;
            if (userData) {
              updatedUser = normalizeUser(userData);
            }
          } catch (e) {
            // fallback
          }
        }
      }
    } else if (currentUser?.id) {
      try {
        const res = await axios.patch(`/users/${currentUser.id}`, partialData);
        const userData = res.data?.data || res.data;
        if (userData) {
          updatedUser = normalizeUser(userData);
        }
      } catch (e) {
        // fallback
      }
    }

    if (!updatedUser) {
      updatedUser = normalizeUser({ ...(currentUser || {}), ...partialData });
    }

    setCurrentUser(updatedUser);
    if (updatedUser.id) {
      localStorage.setItem("user", updatedUser.id);
    }
    return updatedUser;
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
        isLoading,
        theme,
        changeTheme,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export default function useAuthContext() {
  return useContext(AuthContext);
}
