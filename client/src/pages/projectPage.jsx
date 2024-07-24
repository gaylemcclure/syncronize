import { useState, useEffect } from "react";
import HomeNav from "../components/nav/homeNav";
import SideNav from "../components/nav/sideNav";
// import styled from "styled-components";
import ProjectTable from "../components/projectTable";
import ProjectTitleIcon from "../components/menus/projectTitleIcon";
import { useUserContext } from "../utils/contexts";
import { useQuery } from "@apollo/client";
import { QUERY_PROJECT } from "../utils/queries";
import { styled, useTheme } from "@mui/material/styles";
import Box from "@mui/material/Box";
import MuiAppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import CssBaseline from "@mui/material/CssBaseline";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import logo from "../assets/images/sync-icon.png";
import DropdownMenu from "../components/menus/dropdownMenu";
import AddTaskModal from "../components//modals/addTaskModal";
import AddProjectModal from "../components//modals/addProjectModal";
import { useNavigate } from "react-router";
import "../assets/styles/homepage.css";
import Auth from "../utils/auth";
import PropTypes from "prop-types";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Overview from '../components/views/overview';
import TableView from '../components/views/tableView';
import ListView from '../components/views/listView';



//Set the width of the sideNav
const drawerWidth = 350;

//Style the sidenav header
const DrawerHeader = styled("div")(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  justifyContent: "flex-end",
  padding: theme.spacing(0, 1),
  // necessary for content to be below app bar
  ...theme.mixins.toolbar,
}));

//Style the top menu bar
const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== "open",
})(({ theme, open }) => ({
  zIndex: theme.zIndex.drawer + 1,
  transition: theme.transitions.create(["width", "margin"], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(["width", "margin"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}));

//Style the rest of the nav bar
const StyledBox = styled(Box)(({ theme }) => ({
  "& .MuiPaper-root.MuiAppBar-root": {
    display: "flex",
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
  "& .MuiButtonBase-root": {
    marginRight: "20px",
  },
  "& .MuiToolbar-root": {
    paddingRight: "0",
  },
}));

function CustomTabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div role="tabpanel" hidden={value !== index} id={`simple-tabpanel-${index}`} aria-labelledby={`simple-tab-${index}`} {...other}>
      {value === index && <Box sx={{ p: 3 }}>{children}</Box>}
    </div>
  );
}

CustomTabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
};

const ProjectTabs = () => {
  const [value, setValue] = useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <Box sx={{ width: "100%" }}>
      <Box sx={{ borderBottom: 1, borderColor: "divider", display: 'flex', flexDirection: 'row' }}>
        <Tabs value={value} onChange={handleChange} aria-label="tabs">
          <Tab label="Table" {...a11yProps(0)} />
          <Tab label="List" {...a11yProps(1)} />
          <Tab label="Board" {...a11yProps(2)} />
        </Tabs>
        <AddTaskModal />
      </Box>
      <CustomTabPanel value={value} index={0}>
<ProjectTable />
      </CustomTabPanel>
      <CustomTabPanel value={value} index={1}>

      </CustomTabPanel>
      <CustomTabPanel value={value} index={2}>

      </CustomTabPanel>
    </Box>
  );
};

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    "aria-controls": `simple-tabpanel-${index}`,
  };
}
const ProjectPage = () => {
  const { userData } = useUserContext();
  const [open, setOpen] = useState(true);
  const [loggedIn, setLoggedIn] = useState(false);

  //Get the project id from url
  let projectId = "";
  const paramString = window.location.pathname;
  const searchParams = new URLSearchParams(paramString);
  searchParams.forEach((value, key) => {
    projectId = value;
  });

  //use projectId to query the project data
  const { data, refetch } = useQuery(QUERY_PROJECT, { variables: { _id: projectId } });


  const handleDrawerOpen = () => {
    setOpen(true);
  };

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
        <StyledBox sx={{ display: "flex", flexDirection: "row" }}>
          <CssBaseline />
          <AppBar position="fixed" open={open}>
            <Toolbar>
              <IconButton
                // color="inherit"
                aria-label="open drawer"
                onClick={handleDrawerOpen}
                edge="start"
                sx={{
                  marginRight: 5,
                  ...(open && { display: "none" }),
                }}
              >
                <MenuIcon />
              </IconButton>
            </Toolbar>
            <img className="logo" src={logo} alt="logo" />
            <div className="input-container">
              <input className="search-bar" placeholder="Search..." />
            </div>
            {userData && <DropdownMenu user={userData} />}
          </AppBar>
          <SideNav open={open} setOpen={setOpen} user={userData} />
          <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
            <DrawerHeader />
            <ProjectTabs refetch={refetch}/>
          </Box>
        </StyledBox>
      )}

    </>
  );
};

export default ProjectPage;
