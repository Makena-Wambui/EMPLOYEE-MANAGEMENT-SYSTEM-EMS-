import React, { createContext, useContext, useState } from "react";

const userContext = createContext();

const authContext = ({ children }) => {
  const [user, setUser] = useState(null); // user state

  // This function will be called when the user logs in
  const login = () => {
    setUser(user); // Set the user state to the user object
  };

  // This function will be called when the user logs out
  const logout = () => {
    setUser(null); // Set the user state to null
    localStorage.removeItem("token"); // Remove the token from local storage
  };
  return (
    // The userContext.Provider will provide the user state and the login and logout functions to all the components that are wrapped inside it
    <userContext.Provider value={{ user, login, logout }}>
      {children}
    </userContext.Provider>
  );
};

export const useAuth = () => useContext(userContext);

export default authContext;
