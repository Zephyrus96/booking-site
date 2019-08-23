import React, { useState, createContext } from "react";
import { useCookies } from "react-cookie";

export const AuthContext = createContext();

export const AuthProvider = props => {
  const [cookies] = useCookies(["jwtCookie"]);
  const [token, setToken] = useState(cookies.jwtCookie);
  const [userID, setUserID] = useState(null);

  const contextValue = {
    token,
    setToken,
    userID,
    setUserID
  };

  return (
    <AuthContext.Provider value={contextValue}>
      {props.children}
    </AuthContext.Provider>
  );
};
