import { useState, useEffect } from "react";
import { styled } from "@mui/material/styles";
import Box from "@mui/material/Box";
import MuiAppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import CssBaseline from "@mui/material/CssBaseline";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import logo from "../../assets/images/sync-icon.png";
import DropdownMenu from "../../components/menus/dropdownMenu";
import { useUserContext } from "../../utils/contexts";
import SideNav from "../../components/nav/sideNav";
import { useNavigate } from "react-router";
import "../../assets/styles/homepage.css";
import Auth from "../../utils/auth";
import TextField from "@mui/material/TextField";
import { useOpenContext } from "../../utils/openContext";
import { useTheme } from "@mui/material/styles";


const HomeNav = ({ setPath }) => {
  const { userData, setUserData } = useUserContext();
  const [loggedIn, setLoggedIn] = useState(false);
  const { open, setOpen, drawerWidth } = useOpenContext();
  const theme = useTheme();

  const pathName = window.location.pathname;
  useEffect(() => {
    const handleNav = () => {
      switch (pathName) {
        case "/":
          setPath("welcome");
          break;
        case "/solutions":
          setPath("welcome");
          break;
        case "/product":
          setPath("welcome");
          break;
        case "/pricing":
          setPath("welcome");
          break;
        case "/login":
          setPath("none");
          break;
        case "/signup":
          setPath("none");
         break;
        case "/home":
          setPath("home");
          break;
        case "/project":
          setPath("home");
          break;
        case "/home/account":
          setPath("home");
          break;
        default:
     }
    };

    const pathStart = pathName.slice(0, 11);
    if (pathStart === "/project/q=") {
      setPath('home')
    }
  
    handleNav()
  }, [pathName])

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
          }, 2000);
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
      <StyledBox sx={{ display: "flex", flexDirection: "row" }}>
        <CssBaseline />
        <AppBar position="fixed" open={open}>
          <Toolbar>
            <IconButton
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
            <TextField className="search-bar" placeholder="Search..." sx={{backgroundColor: theme.palette.mode === "dark" ? theme.palette.primary.contrastText : theme.palette.secondary.contrastText, border:'none'}} />
          </div>
          {userData && <DropdownMenu user={userData} />}
        </AppBar>
        <SideNav open={open} setOpen={setOpen} user={userData} />
        <Box component="main" sx={{ flexGrow: 1 }}>
          <DrawerHeader />
        </Box>
      </StyledBox>
</>
  );
};


export default HomeNav;
