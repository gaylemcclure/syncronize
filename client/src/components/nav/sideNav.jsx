import { useEffect, useState } from 'react';
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
import InboxIcon from "@mui/icons-material/MoveToInbox";
import MailIcon from "@mui/icons-material/Mail";
import HomeIcon from "@mui/icons-material/Home";
import "../../assets/styles/homepage.css";
import FolderIcon from "@mui/icons-material/Folder";
import AddProjectModal from '../modals/addProjectModal';
import AllDropdownMenu from '../menus/allDropdownMenu';
import WorkspaceMenu from '../menus/workspaceMenu';

const drawerWidth = 240;

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


useEffect(() => {
  if (user.projects) {
    setIsLoaded(true)
  } else {
    setIsLoaded(false)
  }
}, [user])

console.log(isLoaded)
  const handleDrawerClose = () => {
    setOpen(false);
  };


  const handleSideNavigation = (e) => {
    console.log(e.target.parentElement.parentElement.id)
    // const url = e.target.id;
    // window.location.href=`/home/project/q=${url}`
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

          {open && (<WorkspaceMenu user={user} /> )}
         {open && <AddProjectModal button="button"/> }

          </div>
          </div>
      <List>
        {isLoaded &&
          user.projects.map((proj) => (
            <ListItem key={proj._id} disablePadding sx={{ display: "block" }} id={proj._id}>
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
                                mr: open ? 3 : 'auto',
                                justifyContent: 'center',
                              }}
                              
                >
                  <FolderIcon />
                </ListItemIcon>
                <ListItemText primary={proj.projectName} sx={{ opacity: open ? 1 : 0 }} />


              </ListItemButton>
            </ListItem>
          ))}
      
    
      </List>
    </Drawer>
  );
};

export default SideNav;

// /* eslint-disable react/prop-types */
// import { useState, useEffect } from "react";
// import styled from "styled-components";
// import WorkspaceMenu from '../menus/workspaceMenu';
// // import { ChakraProvider } from "@chakra-ui/react";
// import { useUserContext } from "../../utils/contexts";
// import AddProjectModal from '../modals/addProjectModal';
// import AllDropdownMenu from "../menus/allDropdownMenu";

// const SideNav = ({ menu, setMenu }) => {

//   const { userData } = useUserContext();
//   const userLength = Object.keys(userData).length;

//   const handleOpenMenu = () => {
//     setMenu(true)
//   }

//   const handleCloseMenu = () => {
//     setMenu(false)
//   }

//   return (
//     // <ChakraProvider>
//       <Sidebar className={menu ? "sidebar open" : "sidebar closed"}>
//          <div className="flex-col sidenav-header">
//           <button className="sidebar-button" onClick={menu ? handleCloseMenu : handleOpenMenu}>
//             <i className="fa-solid fa-chevron-left"></i>
//           </button>
//           <MenuItem href="/home">
//             <span className="material-symbols-outlined space">home</span> {menu ? "Home" : ""}
//           </MenuItem>
//           <MenuItem href="/home">
//             <span className="material-symbols-outlined space">inventory</span> {menu ? "My work" : ""}
//           </MenuItem>
//         </div>

//           {userLength !== 0 && (
//             userData.projects.map((proj) => {
//               const link = `/project/q=${proj._id}`
//               return <MenuItem id={proj._id} href={link} key={proj._id}>
//                 <span className="material-symbols-outlined space">folder</span> {menu ? proj.projectName : ""}
//               </MenuItem>
//             })
//           )}

//         </div>
//       </Sidebar>
//     // </ChakraProvider>
//   );
// };

// const Sidebar = styled.div`
//   height: 100%;
//   position: fixed;
//   top: 0;
//   left: 0;
//   background-image: linear-gradient(180deg, #101010 0%, #0d0e17 100%);
//   overflow-x: hidden;
//   transition: 0.5s;

// `;

// const MenuItem = styled.a`
//   display: flex;
//   text-decoration: none;
//   color: var(--ws-gray-text);
//   font-size: 1rem;
//   font-weight: 300;
//   margin: 0.5rem 1rem 0.5rem 0;
//   /* justify-content: center; */
// `;

// export default SideNav;
