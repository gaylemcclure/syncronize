import { createContext, useContext, useState, useEffect } from "react";
import { QUERY_ME, QUERY_PROJECT } from "./queries";
import { useQuery } from "@apollo/client";

const UserContext = createContext();

export const useUserContext = () => useContext(UserContext);

export const UserProvider = ({ children }) => {
  const [userData, setUserData] = useState({});
  const { data } = useQuery(QUERY_ME);
  const user = data?.me;


  useEffect(() => {
    const getUserData = async () => {
      try {
        if (user) {
          setUserData(user);
        }
      } catch (err) {
        console.error(err);
      }
    };
    getUserData();
  }, [user]);

  return <UserContext.Provider value={{ userData: userData, setUserData: setUserData }}>{children}</UserContext.Provider>;
};
