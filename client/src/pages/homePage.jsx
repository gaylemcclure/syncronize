import { useState, useEffect } from "react";
import Box from "@mui/material/Box";
import { useUserContext } from "../utils/contexts";
import { useNavigate } from "react-router";
import "../assets/styles/homepage.css";
import Auth from "../utils/auth";
import { useOpenContext } from "../utils/openContext";
import HomeTabs from '../components/homeTabs';

const HomePage = () => {
  const { open, setOpen, drawerWidth} = useOpenContext();
  const { userData, setUserData } = useUserContext();
  const [loggedIn, setLoggedIn] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const isLoggedIn = async () => {
      try {
        const token = Auth.loggedIn() ? Auth.getToken() : null;

        if (!token) {
          setLoggedIn(false);
          setTimeout(() => {
            navigate("/login");
          }, 5000);
        } else {
          setLoggedIn(true);
        }
      } catch (err) {
        console.error(err);
      }
    };
    isLoggedIn();
  }, []);

  return (
    <>
      {!loggedIn && <h1>You are not logged in. Redirecting to login page ...</h1>}
      {loggedIn && (
          <Box component="main" sx={{ width: open? `calc(100% - ${drawerWidth}px)` : 'calc(100% - 65px)', flexGrow: 1, p: 3, marginLeft: open ? `${drawerWidth}px` : '65px' }}>
            <HomeTabs one="Overview" two="Table" three="List"/>
          </Box>

      )}
    </>
  );
};

export default HomePage;
