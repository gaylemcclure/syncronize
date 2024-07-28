import { 
    ListItemIcon, 
    ListItemText, 
    Menu, 
    MenuItem, 
    Button,
    Box
} from "@mui/material"; 
import { useState } from 'react';
import { createTheme } from '@mui/material/styles';





const AllDropdownMenu = () => {

    const [menu, setMenu] = useState(false);
    const open = Boolean(menu);
    const handleClick = (event) => {
        setMenu(event.currentTarget);
    };
    const handleClose = () => {
        setMenu(null);
    };
  
    return (
      <div>
        <Button
          id="basic-button"
          aria-controls={open ? 'basic-menu' : undefined}
          aria-haspopup="true"
          aria-expanded={open ? 'true' : undefined}
          onClick={handleClick}
        >
          Dashboard
        </Button>
        <Box
          id="basic-menu"
          anchorEl={menu}
          open={open}
          onClose={handleClose}
          MenuListProps={{
            'aria-labelledby': 'basic-button',
          }}
        >
          <MenuItem onClick={handleClose}>Profile</MenuItem>
          <MenuItem onClick={handleClose}>My account</MenuItem>
          <MenuItem onClick={handleClose}>Logout</MenuItem>
        </Box>
      </div>
    );}

export default AllDropdownMenu;