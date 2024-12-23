import React, { createContext, useContext, useState, useEffect } from "react";

const MainContext = createContext();

export const MainContextProvider = ({ children }) => {
  const [sidenavColor, setSidenavColor] = useState(
    localStorage.getItem("sidenavColor") || "#1890ff"
  );


  useEffect(() => {
    localStorage.setItem("sidenavColor", sidenavColor);
  }, [sidenavColor,]);

  return (
    <MainContext.Provider
      value={{ sidenavColor, setSidenavColor, }}
    >
      {children}
    </MainContext.Provider>
  );
};

export const useMain = () => useContext(MainContext);
