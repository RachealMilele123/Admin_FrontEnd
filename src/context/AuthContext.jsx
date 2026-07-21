import { createContext, useContext, useState, useEffect } from "react";

// JWT Decode utility
const decodeJWT = (token) => {
  try {
    const base64Url = token.split(".")[1];
    const base64 = base64Url.replace(/-/g, "+").replace(/_/g, "/");
    const jsonPayload = decodeURIComponent(
      atob(base64)
        .split("")
        .map((c) => `%${`00${c.charCodeAt(0).toString(16)}`.slice(-2)}`)
        .join("")
    );
    return JSON.parse(jsonPayload);
  } catch (error) {
    console.error("Failed to decode JWT:", error);
    return null;
  }
};

// Auth Context
const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [admin, setAdmin] = useState(null);
  const [token, setToken] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  // Initialize auth state from localStorage
  useEffect(() => {
    const storedToken = localStorage.getItem("token");
    const storedAdmin = localStorage.getItem("admin");

    if (storedToken && storedAdmin) {
      // Verify token is not expired
      const decoded = decodeJWT(storedToken);
      
      if (decoded && decoded.exp) {
        const currentTime = Date.now() / 1000;
        
        if (decoded.exp > currentTime) {
          // Token is valid
          setToken(storedToken);
          setAdmin(JSON.parse(storedAdmin));
          setIsAuthenticated(true);
        } else {
          // Token expired, clear storage
          console.log("Token expired, clearing auth data");
          localStorage.removeItem("token");
          localStorage.removeItem("admin");
        }
      } else {
        // Invalid token format
        console.log("Invalid token format, clearing auth data");
        localStorage.removeItem("token");
        localStorage.removeItem("admin");
      }
    }
    
    setLoading(false);
  }, []);

  // Login function
  const login = (token, adminData) => {
    localStorage.setItem("token", token);
    localStorage.setItem("admin", JSON.stringify(adminData));
    setToken(token);
    setAdmin(adminData);
    setIsAuthenticated(true);
  };

  // Logout function
  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("admin");
    setToken(null);
    setAdmin(null);
    setIsAuthenticated(false);
  };

  // Check if user is authenticated
  const checkAuth = () => {
    const storedToken = localStorage.getItem("token");
    if (!storedToken) {
      return false;
    }
    
    const decoded = decodeJWT(storedToken);
    if (decoded && decoded.exp) {
      const currentTime = Date.now() / 1000;
      return decoded.exp > currentTime;
    }
    
    return false;
  };

  // Get admin ID from token
  const getAdminId = () => {
    if (!token) return null;
    const decoded = decodeJWT(token);
    return decoded?.id || decoded?.adminId || null;
  };

  const value = {
    admin,
    token,
    loading,
    isAuthenticated,
    login,
    logout,
    checkAuth,
    getAdminId,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

// Custom hook to use auth context
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};