import { createContext, useContext, useState, useEffect } from "react";
import { useNavigate } from "react-router";

export const AuthContext = createContext();

export function AuthProvider({ children }) {
  const navigate = useNavigate();
  const [token, setToken] = useState(localStorage.getItem("token"));
  const [role, setRole] = useState(localStorage.getItem("role"));
  const [name, setName] = useState(null);
  const [lastName, setLastName] = useState(null);
  const [username, setUsername] = useState(localStorage.getItem("username"));
  const [userId, setUserId] = useState(localStorage.getItem("userId"));

  const login = ({ data }) => {
    setToken(data.token);
    setRole(data.role);
    setName(data.name);
    setLastName(data.last_name);
    setUsername(data.username);
    setUserId(data.id);
    localStorage.setItem("token", data.token);
    localStorage.setItem("role", data.role);
    localStorage.setItem("username", data.username);
    localStorage.setItem("name", data.name);
    localStorage.setItem("lastName", data.last_name);
    localStorage.setItem("userId", data.id);
  };

  const logout = () => {
    setToken(null);
    setRole(null);
    setName(null);
    setLastName(null);
    setUsername(null);
    localStorage.clear();
    navigate("/login");
  };

  useEffect(() => {
    if (!token) navigate("/login");
  }, [token]);

  return (
    <AuthContext.Provider
      value={{ token, role, login, logout, name, lastName, username, userId }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}
