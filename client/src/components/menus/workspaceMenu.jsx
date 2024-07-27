import { useState, useEffect} from 'react';
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
import { useUserContext } from '../../utils/contexts';
import RenameWorkspace from '../modals/renameWorkspace';


const WorkspaceMenu = (user) => {


  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  const [wsInitials, setWsInitials] = useState("");
  const { userData } = useUserContext();
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const theme = useTheme();

  useEffect(() => {
    if (userData.workspaceName) {
      const separate = userData.workspaceName.split(' ')
      const firstInitial = separate[0].charAt(0);
      const secondInitial = separate[1].charAt(0);
      const ints = `${firstInitial}${secondInitial}`;
      setWsInitials(ints.toUpperCase());

    }

  }, [userData])


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

          <Link href="/home/account">
            <MenuItem>
              <ListItemIcon>
                <EditIcon sx={{ fontSize: "16px" }} />
              </ListItemIcon>
              <ListItemText sx={{color: theme.palette.mode === "dark" ? theme.palette.secondary.contrastText : theme.palette.primary.contrastText}}>Account details</ListItemText>
            </MenuItem>
          </Link>

            <MenuItem>
              <ListItemIcon>
                <SettingsIcon sx={{ fontSize: "16px" }} />
                <RenameWorkspace />
              </ListItemIcon>
            </MenuItem>



        </MenuList>
      </Menu>
    </>
  );
};

export default WorkspaceMenu;
