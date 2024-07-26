import { useEffect, useState } from "react";
import Box from "@mui/material/Box";
import "../assets/styles/homepage.css";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Overview from "../components/views/overview";
import TableView from "../components/views/tableView";
import ListView from "../components/views/listView";
import { useOpenContext } from "../utils/openContext";
import ProjectTable from "./projectTable";
import AddTaskModal from "./modals/addTaskModal";

const HomeTabs = ({ one, two, three, projectData }) => {
  const [value, setValue] = useState(0);
  const { open } = useOpenContext();
  const [data, setData] = useState(projectData);

  useEffect(() => {
    if ( projectData !== undefined) {
    if (Object.keys(projectData).length > 0) {
      setData(projectData);
    }
  }
  }, [projectData]);

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
      <Box sx={{ borderBottom: 1, borderColor: "divider", display: "flex", flexDirection: "row" }}>
        <Tabs value={value} onChange={handleChange} aria-label="tabs">
          <Tab label={one} {...tabProps(0)} />
          <Tab label={two} {...tabProps(1)} />
          <Tab label={three} {...tabProps(2)} />
        </Tabs>
        <AddTaskModal projectData={data} />
      </Box>
      <CustomTabPanel value={value} index={0}>
        {one === "Overview" ? <Overview /> : <ProjectTable projectData={data} />}
      </CustomTabPanel>
      <CustomTabPanel value={value} index={1}>
        <TableView />
      </CustomTabPanel>
      <CustomTabPanel value={value} index={2}>
        <ListView />
      </CustomTabPanel>
    </Box>
  );
};

export default HomeTabs;
