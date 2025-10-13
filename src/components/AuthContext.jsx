import { createContext, useContext, useState } from "react";
import { useNavigate } from "react-router";

export const AuthContext = createContext();

export function AuthProvider({ children }) {
  const navigate = useNavigate();
  const [token, setToken] = useState(localStorage.getItem("token"));
  const [role, setRole] = useState(localStorage.getItem("role"));
  const [name, setName] = useState(null);
  const [lastName, setLastName] = useState(null);
  const [username, setUsername] = useState(null);

  const login = ({ data }) => {
    setToken(data.token);
    setRole(data.role);
    setName(data.name);
    setLastName(data.last_name);
    setUsername(data.username);
    localStorage.setItem("token", data.token);
    localStorage.setItem("role", data.role);
    localStorage.setItem("username", data.username);
    localStorage.setItem("name", data.name);
    localStorage.setItem("lastName", data.last_name);
  };

  const logout = () => {
    setToken(null);
    setRole(null);
    setName(null);
    setLastName(null);
    setUsername(null);
    localStorage.removeItem("token");
    localStorage.removeItem("role");
    localStorage.removeItem("username");
    localStorage.removeItem("name");
    localStorage.removeItem("lastName");
    navigate("/login");
  };

  return (
    <AuthContext.Provider
      value={{ token, role, login, logout, name, lastName, username }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}
