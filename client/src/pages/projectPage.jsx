import { useState, useEffect } from "react";
import { useUserContext } from "../utils/contexts";
import { useQuery, useLazyQuery } from "@apollo/client";
import Box from "@mui/material/Box";
import { useNavigate } from "react-router";
import "../assets/styles/homepage.css";
import Auth from "../utils/auth";
import { useOpenContext } from "../utils/openContext";
import ProjectTabs from "../components/projectTabs";
import ProjectTitleIcon from "../components/menus/projectTitleIcon";
import CircularProgress from "@mui/material/CircularProgress";
import { QUERY_PROJECT_TASKS, QUERY_COMPLETED_TASKS, QUERY_PROJECT } from "../utils/queries";

const ProjectPage = () => {
  const { userData } = useUserContext();
  const { open, setOpen, drawerWidth } = useOpenContext();
  const [loggedIn, setLoggedIn] = useState(false);
  const [tasks, setTasks] = useState([]);
  const [allTasksArr, setAllTasksArr] = useState([]);
  const [allTasks, setAllTasks] = useState([]);
  const [isLoaded, setIsLoaded] = useState(false);
  const navigate = useNavigate();
  const [projectId, setProjectId] = useState("");
  const [currentProject, setCurrentProject] = useState("");

  const [queryTasks] = useLazyQuery(QUERY_PROJECT_TASKS);
  const [queryProject] = useLazyQuery(QUERY_PROJECT);

  //Check if the user is logged in
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

  //Get the project id from url
  useEffect(() => {
    if (userData.projects) {
      const getTasks = async () => {
        let proj = "";
        const paramString = window.location.pathname;
        const searchParams = new URLSearchParams(paramString);
        searchParams.forEach((value, key) => {
          proj = value;
        });
        const { data } = await queryTasks({ variables: { projectId: proj } });
        const current = userData.projects.filter((project) => project._id === proj);
        setAllTasks(data.projectTasks);
        setProjectId(proj);
        setCurrentProject(current[0]);
      };

      getTasks();
    }
  }, [userData]);

  // Check that the user & projects are loaded before rendering
  useEffect(() => {
    const curr = typeof currentProject;
    if (curr !== "string") {
      setIsLoaded(true);
    } else {
      setIsLoaded(false);
    }
  }, [currentProject]);

  return (
    <>
      {!isLoaded && (
        <Box sx={{ display: "flex" }}>
          <CircularProgress />
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
          <div className="flex-row align">
            <h1 className="project-title">{currentProject.projectName}</h1>
            <ProjectTitleIcon projectData={currentProject} />
          </div>
          <p className="project-description">{currentProject.description}</p>
          <ProjectTabs one="Table" two="List" three="Board" currentProject={currentProject} tasks={allTasks} allTasksArr={allTasksArr} />
        </Box>
      )}
    </>
  );
};

export default ProjectPage;
