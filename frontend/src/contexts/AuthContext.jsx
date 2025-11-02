import React from "react";
import { Navigate } from "react-router-dom";

const AuthContext = React.createContext({
  token: "",
  isAuth: false,
  login: (token) => {},
  logout: () => {},
});

export const AuthProvider = ({ children }) => {
  const [token, setToken] = React.useState(localStorage.getItem("token"));
  const [isAuth, setIsAuth] = React.useState(!!localStorage.getItem("token"));
  const login = (tkn) => {
    localStorage.setItem("token", tkn);
    setToken(tkn);
    setIsAuth(!!tkn);
  };
  const logout = () => {
    localStorage.removeItem("token");
    setToken("");
    setIsAuth(false);
  };
  return (
    <AuthContext.Provider value={{ token, isAuth, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => React.useContext(AuthContext);

export const Protected = ({ children }) => {
  const auth = useAuth();
  if (!auth.isAuth) {
    return <Navigate to={"/login"} />;
  }
  return children;
};
