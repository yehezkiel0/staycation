import React, { useState, useEffect, useCallback, useContext } from "react";
import { authAPI } from "services/api";

const AuthContext = React.createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const login = async (credentials) => {
    setLoading(true);
    setError(null);
    try {
      const data = await authAPI.login(credentials);
      // Store user info in localStorage for quick access
      // Token is in httpOnly cookie, so we don't store it
      localStorage.setItem("user", JSON.stringify(data.user));
      setUser(data.user);

      return data;
    } catch (err) {
      setError(err.message);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const register = async (userData) => {
    setLoading(true);
    setError(null);
    try {
      const data = await authAPI.register(userData);
      // Store user info after registration
      if (data.user) {
        localStorage.setItem("user", JSON.stringify(data.user));
        setUser(data.user);
      }
      return data;
    } catch (err) {
      setError(err.message);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const logout = async () => {
    try {
      // Call logout API to clear httpOnly cookie
      await authAPI.logout();
    } catch (err) {
      console.error("Logout API error:", err);
    } finally {
      // Clear local storage and state regardless
      localStorage.removeItem("user");
      setUser(null);
    }
  };

  const fetchProfile = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await authAPI.getProfile();
      setUser(data.user);
      localStorage.setItem("user", JSON.stringify(data.user));
      return data;
    } catch (err) {
      setError(err.message);
      if (
        err.message.includes("unauthorized") ||
        err.message.includes("token")
      ) {
        localStorage.removeItem("user");
        setUser(null);
      }
      throw err;
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    const initAuth = async () => {
      const storedUser = localStorage.getItem("user");
      if (storedUser) {
        try {
          const parsedUser = JSON.parse(storedUser);
          setUser(parsedUser);
          // Verify session with backend
          try {
            await fetchProfile();
          } catch (err) {
            // If verification fails, clear user
            localStorage.removeItem("user");
            setUser(null);
          }
        } catch (e) {
          console.error(e);
          localStorage.removeItem("user");
          setUser(null);
        }
      }
      setLoading(false);
    };
    initAuth();
  }, [fetchProfile]);

  return (
    <AuthContext.Provider
      value={{
        user,
        loading,
        error,
        login,
        register,
        logout,
        fetchProfile,
        isAuthenticated: !!user,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
