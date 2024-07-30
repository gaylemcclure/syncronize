import { useState, useEffect } from "react";
import Box from "@mui/material/Box";
import { useUserContext } from "../utils/contexts";
import { useNavigate } from "react-router";
import "../assets/styles/homepage.css";
import Auth from "../utils/auth";
import { useOpenContext } from "../utils/openContext";
import HomeTabs from "../components/homeTabs";
import CircularProgress from "@mui/material/CircularProgress";
import { useQuery, useLazyQuery } from "@apollo/client";
// import HomeTabs from '../components/homeTabs';
import ProjectTitleIcon from "../components/menus/projectTitleIcon";
import { QUERY_PROJECT_TASKS, QUERY_COMPLETED_TASKS, QUERY_PROJECT, QUERY_TASKS } from "../utils/queries";

const HomePage = () => {
  const { open, drawerWidth } = useOpenContext();
  const { userData } = useUserContext();
  const [loggedIn, setLoggedIn] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);
  const [allTasks, setAllTasks] = useState([])
  const navigate = useNavigate();

  //Check if user is logged in, otherwise redirect to signin page
  useEffect(() => {
    const isLoggedIn = async () => {
      try {
        const token = Auth.loggedIn() ? Auth.getToken() : null;

        if (!token) {
          setLoggedIn(false);
          setTimeout(() => {
            navigate("/login");
          }, 1000);
        } else {
          setLoggedIn(true);
        }
      } catch (err) {
        console.error(err);
      }
    };
    isLoggedIn();
  }, []);

  // Check that the user & projects are loaded before rendering
  useEffect(() => {
    if (userData.projects && userData.tasks) {
      setIsLoaded(true);
    } else {
      setIsLoaded(false);
    }
    setAllTasks(userData.tasks)
  }, [userData]);



  return (
    <>
      {loggedIn && (
        <>
          {!isLoaded && (
            <Box sx={{ display: "flex", justifyContent: "center", alignItems: "center" }}>
              <CircularProgress color="secondary" />
            </Box>
          )}
          {isLoaded && (
            <Box
              component="main"
              sx={{
                width: open ? `calc(100% - ${drawerWidth}px)` : "calc(100% - 65px)",
                flexGrow: 1,
                p: 3,
                marginLeft: open ? `${drawerWidth}px` : "65px",
              }}
            >
              <HomeTabs one="Overview" two="Table" allTasks={allTasks} />
            </Box>
          )}
        </>
      )}
    </>
  );
};

export default HomePage;
