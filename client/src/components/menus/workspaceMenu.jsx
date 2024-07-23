import { useState} from 'react';
import Button from "@mui/material/Button";
import Divider from "@mui/material/Divider";
import MenuList from "@mui/material/MenuList";
import MenuItem from "@mui/material/MenuItem";
import ListItemText from "@mui/material/ListItemText";
import ListItemIcon from "@mui/material/ListItemIcon";
import "../../assets/styles/homepage.css";
import { Menu, Avatar } from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import SettingsIcon from "@mui/icons-material/Settings";
import ColorLensIcon from "@mui/icons-material/ColorLens";
import GroupIcon from "@mui/icons-material/Group";
import LogoutIcon from "@mui/icons-material/Logout";
import Link from "@mui/material/Link";
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { styled, useTheme } from "@mui/material/styles";


const WorkspaceMenu = (user) => {


  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const theme = useTheme();

  return (
    <>
      <Button sx={{ height: '20px', width: '20px'}} id="basic-button" aria-controls={open ? "basic-menu" : undefined} aria-haspopup="true" aria-expanded={open ? "true" : undefined} onClick={handleClick}>
        <ExpandMoreIcon sx={{color: theme.palette.mode === "dark" ? theme.palette.secondary.contrastText : theme.palette.primary.contrastText}}/>
      </Button>

      <Menu
        sx={{ width: 400, maxWidth: "100%" }}
        id="basic-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        MenuListProps={{
          "aria-labelledby": "basic-button",
        }}
      >
        <MenuList>
          <div className="menu-header flex-row align">
            <Avatar sx={{ width: 24, height: 24, fontSize: 12, marginRight: 2, backgroundColor: "var(--main-green)" }}>{user.user.initials}</Avatar>
            <h4 className="user-initials">
              {user.user.first} {user.user.last}
            </h4>
          </div>
          <Divider sx={{ paddingTop: "0.5rem" }} />
          <Link href="/home/account">
            <MenuItem>
              <ListItemIcon>
                <EditIcon sx={{ fontSize: "16px" }} />
              </ListItemIcon>
              <ListItemText sx={{color: theme.palette.mode === "dark" ? theme.palette.secondary.contrastText : theme.palette.primary.contrastText}}>Account details</ListItemText>
            </MenuItem>
          </Link>
          <Link href="/home/account">
            <MenuItem>
              <ListItemIcon>
                <SettingsIcon sx={{ fontSize: "16px" }} />
              </ListItemIcon>
              <ListItemText sx={{color: theme.palette.mode === "dark" ? theme.palette.secondary.contrastText : theme.palette.primary.contrastText}}>Settings</ListItemText>
            </MenuItem>
          </Link>
          <Link href="/home/account">
            <MenuItem>
              <ListItemIcon>
                <ColorLensIcon sx={{ fontSize: "16px" }} />
              </ListItemIcon>
              <ListItemText sx={{color: theme.palette.mode === "dark" ? theme.palette.secondary.contrastText : theme.palette.primary.contrastText}}>Themes</ListItemText>
            </MenuItem>
          </Link>
          <Link href="/home/account">
            <MenuItem>
              <ListItemIcon>
                <GroupIcon sx={{ fontSize: "16px" }} />
              </ListItemIcon>
              <ListItemText sx={{color: theme.palette.mode === "dark" ? theme.palette.secondary.contrastText : theme.palette.primary.contrastText}}>Manage users</ListItemText>
            </MenuItem>
          </Link>
          <Divider />
          <Link href="/home/account">
            <MenuItem>
              <ListItemIcon>
                <LogoutIcon sx={{ fontSize: "16px" }} />
              </ListItemIcon>
              <ListItemText sx={{color: theme.palette.mode === "dark" ? theme.palette.secondary.contrastText : theme.palette.primary.contrastText}}>Log out</ListItemText>
            </MenuItem>
          </Link>
        </MenuList>
      </Menu>
    </>
  );
};

export default WorkspaceMenu;
