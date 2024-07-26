import { useState, useEffect } from "react";
import { useUserContext } from "../utils/contexts";
import { useQuery } from "@apollo/client";
import { QUERY_PROJECT } from "../utils/queries";
import Box from "@mui/material/Box";
import { useNavigate } from "react-router";
import "../assets/styles/homepage.css";
import Auth from "../utils/auth";
import { useOpenContext } from "../utils/openContext";
import HomeTabs from '../components/homeTabs';
import ProjectTitleIcon from "../components/menus/projectTitleIcon";

const ProjectPage = () => {
  const { userData } = useUserContext();
  const { open, setOpen, drawerWidth} = useOpenContext();
  const [loggedIn, setLoggedIn] = useState(false);
  const [projectData, setProjectData] = useState({})


  const navigate = useNavigate();
 
  //Get the project id from url
  let projectId = "";
  const paramString = window.location.pathname;
  const searchParams = new URLSearchParams(paramString);
  searchParams.forEach((value, key) => {
    projectId = value;
  });

  //use projectId to query the project data
  const { data, refetch } = useQuery(QUERY_PROJECT, { variables: { _id: projectId } });
  const project = data?.proj;

  //Set the project data to state
  useEffect(() => {
    const getUserData = async () => {
      try {
        if (project) {
          setProjectData(project);
        }
      } catch (err) {
        console.error(err);
      }
    };
    getUserData();
  }, [project]);


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
  


  return (
    <>
      {!loggedIn && <h1>You are not logged in. Redirecting to login page ...</h1>}
      {loggedIn && (
          <Box component="main" sx={{ width: open? `calc(100% - ${drawerWidth}px)` : 'calc(100% - 65px)', flexGrow: 1, p: 3, marginLeft: open ? `${drawerWidth}px` : '65px' }}>
            <div className="flex-row align">
              <h1 className="project-title">{projectData.projectName}</h1>
              <ProjectTitleIcon projectData={projectData} />
              
              </div>
            <p className="project-description">{projectData.description}</p>
            <HomeTabs one="Table" two="List" three="Board" projectData={projectData} />

          </Box>

      )}
    </>
  );
};

export default ProjectPage;
