import { useEffect, useState } from "react";
import Box from "@mui/material/Box";
import "../assets/styles/homepage.css";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import { useOpenContext } from "../utils/openContext";
import AddTaskModal from "./modals/addTaskModal";
import CircularProgress from "@mui/material/CircularProgress";
import { useUserContext } from "../utils/contexts";
import { styled, useTheme } from "@mui/material/styles";
import ProjectTable from "../components/projectTable";

const ProjectTabs = ({ one, two, currentProject, tasks }) => {
  const [value, setValue] = useState(0);
  const { open } = useOpenContext();
  const { userData, setUserData } = useUserContext();
  const [isLoaded, setIsLoaded] = useState(false);
  const theme = useTheme();
  const [currProject, setCurrProject] = useState('');

  useEffect(() => {
    if (userData.projects) {
      setIsLoaded(true);
      const curr = userData.projects.filter((proj) => proj._id === currentProject._id);
      setCurrProject(curr)
    } else {
      setIsLoaded(false)
    }
  }, [userData]);

  const CustomTabPanel = (props) => {
    const { children, value, index, ...other } = props;

    return (
      <div role="tabpanel" hidden={value !== index} id={`home-tabs-${index}`} aria-labelledby={`home-tabs-${index}`} {...other}>
        {value === index && <Box sx={{ p: 3 }}>{children}</Box>}
      </div>
    );
  };

  const tabProps = (index) => {
    return {
      id: `home-tabs-${index}`,
      "aria-controls": `home-tabs-${index}`,
    };
  };
  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <Box sx={{ width: "100%" }}>
      {!isLoaded && (
        <Box sx={{ display: "flex", justifyContent: "center", alignItems: "center" }}>
          <CircularProgress color="secondary" />
        </Box>
      )}
      {isLoaded && (
        <>
          <Box sx={{ borderBottom: 1, borderColor: "divider", display: "flex", flexDirection: "row" }}>
            <Tabs value={value} onChange={handleChange} aria-label="tabs">
              <Tab label={one} {...tabProps(0)} />
              <Tab label={two} {...tabProps(1)} />
            </Tabs>
            <AddTaskModal projectData={currProject} /> 
          </Box>
          <CustomTabPanel value={value} index={0}>
            <ProjectTable projectData={currProject} />
          </CustomTabPanel>
          <CustomTabPanel value={value} index={1}>

          </CustomTabPanel>
        </>
      )}
    </Box>
  );
};

export default ProjectTabs;
