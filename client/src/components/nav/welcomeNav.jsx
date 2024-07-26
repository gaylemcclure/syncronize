import { useState, useEffect } from "react";
import { styled } from "@mui/material/styles";
import Box from "@mui/material/Box";
import MuiAppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import logo from "../../assets/images/sync.png";
import DropdownMenu from "../../components/menus/dropdownMenu";
import { useUserContext } from "../../utils/contexts";
import { useNavigate } from "react-router";
import "../../assets/styles/welcomepage.css";
import Auth from "../../utils/auth";
import { Link } from "react-router-dom";

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

const WelcomeNav = ({ setPath }) => {
  const [open, setOpen] = useState(true);
  const { userData, setUserData } = useUserContext();
  const [loggedIn, setLoggedIn] = useState(false);

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
        // case "/home/account":
        //   setPath("home");
        //   break;
        //   case "/home/account":
        //     setPath("home");
        //     break;
  
        default:
     }
    };

    const pathStart = pathName.slice(0, 11);

    if (pathStart === "/project/q=") {
      setPath('home')
    }
  
  
    handleNav()
  }, [pathName])

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
          <MuiAppBar
            position="fixed"
            sx={{
              backgroundColor: "var(--black)",
              display: "flex !important",
              justifyContent: "flex-start !important",
              alignItems: "center",
              padding: "1rem;",
            }}
          >
            <ul className="nav-links flex-row">
              <Link to="/">
                <img className="logo-full" src={logo} alt="logo" />
              </Link>{" "}
              <div className="link-wrapper flex-row">
                <Link to="/product" className="nav-link">
                  Product
                </Link>
                <Link to="/solutions" className="nav-link">
                  Solutions
                </Link>
                <Link to="/pricing" className="nav-link">
                  Pricing
                </Link>
              </div>
            </ul>
            <ul className="nav-signup flex-row">
              <Link to="/login" className="nav-link">
                Log in
              </Link>
              <Link to="/signup">
                <Button sx={{backgroundColor: 'var(--main-green)', width: '7rem'}} className="nav-button">Sign up</Button>
              </Link>
            </ul>
            {/* {userData && <DropdownMenu user={userData} />} */}
          </MuiAppBar>
        </StyledBox>
      )}
    </>
  );

  // <Navbar className={path === "/" ? "transparent" : "black"}>

  //   {checkUser !== 0 && (<div className="nav-signup flex-row"><MenuInitials href="/home">{user.initials}</MenuInitials></div>)}

  //   <div className="mobile"><WelcomeMenu /></div>
  // </Navbar>
  //);
};

// const Navbar = styled.nav`
//   width: 100vw;
//   padding: 1rem;
//   display: flex;
//   flex-direction: row;
//   align-items: center;
//   position: fixed;
//   box-sizing: border-box;
//   .logo {
//     width: 14rem;
//     padding-top: 2px;
//   }


//   @media screen and (max-width: 768px) {
//     padding: 1rem 2rem 1rem 2rem;
//     .link-wrapper, .nav-signup {
//     display: none;
//   }
//   .mobile {
//     display: flex;
//     margin-left: auto;
//   }
//   }

//   @media screen and (min-width: 769px) and (max-width: 1023px) {
//     .link-wrapper {
//     margin-left: 1.5rem;
//   }
//   .nav-link {
//     padding: 0 1rem;
//   }
//   }

// `;

// const MenuInitials = styled.a`
//   background-color: var(--main-green);
//   border-radius: 50%;
//   border: none;
//   color: white;
//   font-weight: 600;
//   transition-timing-function: ease-in;
//   transition-duration: 0.2s;
//   height: 40px;
//   width: 40px;
//   padding: 8px;

// `

export default WelcomeNav;
