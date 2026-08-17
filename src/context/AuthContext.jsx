import { createContext, useContext, useState } from "react";

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [token, setToken] = useState(() => localStorage.getItem("adminToken"));

  function login(newToken) {
    localStorage.setItem("adminToken", newToken);
    setToken(newToken);
  }

  function logout() {
    localStorage.removeItem("adminToken");
    setToken(null);
  }

  const value = { token, isAuthenticated: !!token, login, logout };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  return useContext(AuthContext);
}
