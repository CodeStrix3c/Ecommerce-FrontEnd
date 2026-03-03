// // src/context/UserContext.jsx
// import React, { createContext, useContext, useState } from "react";

// const UserContext = createContext(null);

// export const UserProvider = ({ children }) => {
//   const [userId, setUserId] = useState(null);
//   const [profileId, setProfileId] = useState(null);
//   const [token, setToken] = useState(null);

//   const value = {
//     userId,
//     profileId,
//     token,
//     setUserId,
//     setProfileId,
//     setToken,
//   };

//   return <UserContext.Provider value={value}>{children}</UserContext.Provider>;
// };

// export const useUser = () => useContext(UserContext);

import React, { createContext, useContext, useState, useEffect } from "react";

const UserContext = createContext(null);

export const UserProvider = ({ children }) => {
  const [userId, setUserId] = useState(() => localStorage.getItem("userId"));

  const [profileId, setProfileId] = useState(() =>
    localStorage.getItem("profileId"),
  );

  const [token, setToken] = useState(() => localStorage.getItem("token"));

  const [vendorId, setVendorId] = useState(() =>
    localStorage.getItem("vendorId"),
  );

  const [roles, setRoles] = useState(() => localStorage.getItem("roles"));

  // 🔥 Sync everything automatically

  useEffect(() => {
    userId
      ? localStorage.setItem("userId", userId)
      : localStorage.removeItem("userId");
  }, [userId]);

  useEffect(() => {
    profileId
      ? localStorage.setItem("profileId", profileId)
      : localStorage.removeItem("profileId");
  }, [profileId]);

  useEffect(() => {
    token
      ? localStorage.setItem("token", token)
      : localStorage.removeItem("token");
  }, [token]);

  useEffect(() => {
    vendorId
      ? localStorage.setItem("vendorId", vendorId)
      : localStorage.removeItem("vendorId");
  }, [vendorId]);

  useEffect(() => {
    roles
      ? localStorage.setItem("roles", roles)
      : localStorage.removeItem("roles");
  }, [roles]);

  // 🔥 Proper logout function
  const logout = () => {
    localStorage.clear();
    setUserId(null);
    setProfileId(null);
    setToken(null);
    setVendorId(null);
    setRoles(null);
  };

  const value = {
    userId,
    profileId,
    token,
    vendorId,
    roles,
    setUserId,
    setProfileId,
    setToken,
    setVendorId,
    setRoles,
    logout,
  };

  return <UserContext.Provider value={value}>{children}</UserContext.Provider>;
};

export const useUser = () => useContext(UserContext);
