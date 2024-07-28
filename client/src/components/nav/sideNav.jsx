import { useEffect, useState } from "react";
import { styled, useTheme } from "@mui/material/styles";
import MuiDrawer from "@mui/material/Drawer";
import List from "@mui/material/List";
import Divider from "@mui/material/Divider";
import IconButton from "@mui/material/IconButton";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import MailIcon from "@mui/icons-material/Mail";
import HomeIcon from "@mui/icons-material/Home";
import "../../assets/styles/homepage.css";
import FolderIcon from "@mui/icons-material/Folder";
import AddProjectModal from "../modals/addProjectModal";
import WorkspaceMenu from "../menus/workspaceMenu";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import { Menu, Avatar } from "@mui/material";
import MenuItem from "@mui/material/MenuItem";
import DeleteIcon from '@mui/icons-material/Delete';
import { DELETE_PROJECT } from "../../utils/mutations";
import { useMutation, useLazyQuery } from "@apollo/client";

const drawerWidth = 350;

const openedMixin = (theme) => ({
  width: drawerWidth,
  transition: theme.transitions.create("width", {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.enteringScreen,
  }),
  overflowX: "hidden",
});

const closedMixin = (theme) => ({
  transition: theme.transitions.create("width", {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  overflowX: "hidden",
  width: `calc(${theme.spacing(7)} + 1px)`,
  [theme.breakpoints.up("sm")]: {
    width: `calc(${theme.spacing(8)} + 1px)`,
  },
});

const DrawerHeader = styled("div")(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  justifyContent: "flex-end",
  padding: theme.spacing(0, 1),
  // necessary for content to be below app bar
  ...theme.mixins.toolbar,
}));

const Drawer = styled(MuiDrawer, { shouldForwardProp: (prop) => prop !== "open" })(({ theme, open }) => ({
  width: drawerWidth,
  flexShrink: 0,
  whiteSpace: "nowrap",
  boxSizing: "border-box",
  ...(open && {
    ...openedMixin(theme),
    "& .MuiDrawer-paper": openedMixin(theme),
  }),
  ...(!open && {
    ...closedMixin(theme),
    "& .MuiDrawer-paper": closedMixin(theme),
  }),
}));



const SideNav = ({ open, setOpen, user }) => {
  const theme = useTheme();
  const [isLoaded, setIsLoaded] = useState(false);
  const [anchorEl, setAnchorEl] = useState(null);
  const moreOpen = Boolean(anchorEl);
  const [deleteProject] = useMutation(DELETE_PROJECT);
  
  const handleClick = (e) => {
    setAnchorEl(e.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  //Check that the user & projects are loaded before rendering
  useEffect(() => {
    if (user.projects) {
      setIsLoaded(true);
    } else {
      setIsLoaded(false);
    }
  }, [user]);
  const handleDrawerClose = () => {
    setOpen(false);
  };

  const handleSideNavigation = (e) => {
    const url = e.target.parentElement.parentElement.id;
    window.location.href = `/project/q=${url}`;
  };

  const handleHomeNavigation = () => {
    window.location.href = "/home";
  }

  const handleDeleteProject = async (e) => {
    try{
      const data = await deleteProject({variables: { _id: e.currentTarget.id }})
      window.location.href = "/home";
    } catch (err) {
      console.error(err);
    }
  }
  return (
    <Drawer variant="permanent" open={open}>
      <DrawerHeader>
        <IconButton onClick={handleDrawerClose}>{theme.direction === "rtl" ? <ChevronRightIcon /> : <ChevronLeftIcon />}</IconButton>
      </DrawerHeader>
      <Divider />
      <List>
        {["Home", "Inbox"].map((text, index) => (
          <ListItem key={text} disablePadding sx={{ display: "block" }}>
            <ListItemButton
              sx={{
                minHeight: 48,
                justifyContent: open ? "initial" : "center",
                px: 2.5,
              }}
              onClick={(e) => handleHomeNavigation(e)}
            >
              <ListItemIcon
                sx={{
                  minWidth: 0,
                  mr: open ? 3 : "auto",
                  justifyContent: "center",
                }}
              >
                {index % 2 === 0 ? <HomeIcon /> : <MailIcon />}
              </ListItemIcon>
              <ListItemText primary={text} sx={{ opacity: open ? 1 : 0 }} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
      <Divider />
      <div className={open ? "flex-col sidenav-main" : "flex-col sidenav-main-closed"}>
        <div className="flex-row workspace-main">
          <div className={open ? "workspace-icon space" : "workspace-icon"}>{user.initials}</div>
          <h4 className={theme.palette.mode === "dark" ? "workspace-name white-text" : "workspace-name black-text"}>{open ? user.workspaceName : ""}</h4>

          {open && <WorkspaceMenu user={user} />}
          {open && <AddProjectModal button="button" />}
        </div>
      </div>
      <List>
        {isLoaded &&
          user.projects.map((proj) => (
            <ListItem key={proj._id} disablePadding sx={{ display: "flex", flexDirection: "row" }} id={proj._id}>
              <ListItemButton
                sx={{
                  minHeight: 48,
                  justifyContent: open ? "initial" : "center",
                  px: 2.5,
                }}
                id={proj._id}
                onClick={(e) => handleSideNavigation(e)}
              >
                <ListItemIcon
                  sx={{
                    minWidth: 0,
                    mr: open ? 3 : "auto",
                    justifyContent: "center",
                  }}
                >
                  <FolderIcon />
                </ListItemIcon>
                <ListItemText primary={proj.projectName} sx={{ opacity: open ? 1 : 0 }} />
              </ListItemButton>
              <ListItemButton id="more-button" sx={{ width: "24px", minWidth: "24px", maxWidth: "24px" }} onClick={(e) => handleClick(e)}>
                <MoreHorizIcon />{" "}
              </ListItemButton>
              <Menu
        sx={{ width: 400, maxWidth: "100%",  }}
        id="delete-menu"
        anchorEl={anchorEl}
        open={moreOpen}
        onClose={handleClose}
        MenuListProps={{
          "aria-labelledby": "delete-menu",
        }}
      >
            <MenuItem>
            <ListItemButton id={proj._id} onClick={(e) => handleDeleteProject(e)}>
              <ListItemIcon>
                <DeleteIcon sx={{ fontSize: "16px" }} />
              </ListItemIcon>
              <ListItemText sx={{color: theme.palette.mode === "dark" ? theme.palette.secondary.contrastText : theme.palette.primary.contrastText}}>Delete project</ListItemText>
              </ListItemButton>
            </MenuItem>
      </Menu>

            </ListItem>
          ))}
      </List>
    </Drawer>
  );
};

export default SideNav;
