// src/context/UserContext.jsx
import React, { createContext, useContext, useState } from "react";

const UserContext = createContext(null);

export const UserProvider = ({ children }) => {
  const [userId, setUserId] = useState(null);
  const [profileId, setProfileId] = useState(null);
  const [token, setToken] = useState(null);

  const value = {
    userId,
    profileId,
    token,
    setUserId,
    setProfileId,
    setToken,
  };

  return <UserContext.Provider value={value}>{children}</UserContext.Provider>;
};

export const useUser = () => useContext(UserContext);
