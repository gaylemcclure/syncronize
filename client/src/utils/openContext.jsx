import { createContext, useContext, useState, useEffect } from "react";


const OpenContext = createContext();

export const useOpenContext = () => useContext(OpenContext);

export const OpenProvider = ({ children }) => {
  const [open, setOpen] = useState(false);
  const [drawerWidth] = useState(350)


  useEffect(() => {
    const getOpenStatus = async () => {
      try {
        setOpen(!open)
      } catch (err) {
        console.error(err);
      }
    };
    getOpenStatus();
  }, []);

  return <OpenContext.Provider value={{ open: open, setOpen: setOpen, drawerWidth: drawerWidth}}>{children}</OpenContext.Provider>;
};
