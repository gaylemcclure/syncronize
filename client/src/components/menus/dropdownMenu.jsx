import { useState, useContext } from 'react';
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
import { styled, useTheme } from "@mui/material/styles";
import Switch from '@mui/material/Switch';
import { ColorModeContext } from '../../utils/themeContext';
import Brightness4Icon from '@mui/icons-material/Brightness4';
import Brightness7Icon from '@mui/icons-material/Brightness7';
import IconButton from '@mui/material/IconButton';



const DropdownMenu = (user) => {
  const mode =  useContext(ColorModeContext)
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  console.log(user)
  const theme = useTheme();
  const pageTheme = theme.palette.mode;

  const label = { inputProps: { 'aria-label': 'Switch demo' } };


  return (
    <>
      <Button id="basic-button" aria-controls={open ? "basic-menu" : undefined} aria-haspopup="true" aria-expanded={open ? "true" : undefined} onClick={handleClick}>
        <Avatar sx={{ bgcolor: `#${user.user.avatarColour}`, fontWeight: '700' }}>{user.user.initials}</Avatar>
      </Button>

      <Menu
        sx={{ width: 400, maxWidth: "100%",  }}
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
              <ListItemText sx={{color: pageTheme === "dark" ? theme.palette.secondary.contrastText : theme.palette.primary.contrastText}}>Account details</ListItemText>
            </MenuItem>
          </Link>
          {/* <Link href="/home/account">
            <MenuItem>
              <ListItemIcon>
                <SettingsIcon sx={{ fontSize: "16px" }} />
              </ListItemIcon>
              <ListItemText sx={{color: pageTheme === "dark" ? theme.palette.secondary.contrastText : theme.palette.primary.contrastText}}>Settings</ListItemText>
            </MenuItem>
          </Link> */}
          {/* <Link href="/home/account"> */}
            <MenuItem sx={{display: "flex", alignItems: 'center'}}>
              <ListItemIcon sx={{display: "flex!important", alignItems: 'center'}}>
                <ColorLensIcon sx={{ fontSize: "16px" }} />
              </ListItemIcon>
              <ListItemText sx={{color: pageTheme === "dark" ? theme.palette.secondary.contrastText : theme.palette.primary.contrastText, textTransform: 'capitalize'}}>{pageTheme} mode  </ListItemText>
              <IconButton sx={{ ml: 1 }} onClick={mode.toggleColorMode} color="inherit">
        {theme.palette.mode === 'dark' ? <Brightness7Icon /> : <Brightness4Icon />}
      </IconButton>            
      </MenuItem>
          <Link href="/home/account">
            <MenuItem>
              <ListItemIcon>
                <GroupIcon sx={{ fontSize: "16px" }} />
              </ListItemIcon>
              <ListItemText sx={{color: pageTheme === "dark" ? theme.palette.secondary.contrastText : theme.palette.primary.contrastText}}>Manage users</ListItemText>
            </MenuItem>
          </Link>
          <Divider />
          <Link href="/home/account">
            <MenuItem>
              <ListItemIcon>
                <LogoutIcon sx={{ fontSize: "16px" }} />
              </ListItemIcon>
              <ListItemText sx={{color: pageTheme === "dark" ? theme.palette.secondary.contrastText : theme.palette.primary.contrastText, paddingTop: '0.5rem'}}>Log out</ListItemText>
            </MenuItem>
          </Link>
        </MenuList>
      </Menu>
    </>
  );
};

export default DropdownMenu;
