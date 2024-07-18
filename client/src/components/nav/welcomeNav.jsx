import styled from "styled-components";
import { Link } from "react-router-dom";
import logo from "../../assets/images/sync.png";
import WelcomeMenu from "../menus/welcomeMenu";

const WelcomeNav = ({ user }) => {
  const path = window.location.pathname;
  const checkUser = Object.keys(user).length;

  return (
    <Navbar className={path === "/" ? "transparent" : "black"}>
      <ul className="nav-links flex-row">
        <Link to="/">
          <img className="logo" src={logo} alt="logo" />
        </Link>
        <div className="link-wrapper flex-row">
        <Link to="/product" className="nav-link roboto-medium">Product</Link>
        <Link to="/solutions" className="nav-link roboto-medium">Solutions</Link>
        <Link to="/pricing" className="nav-link roboto-medium">Pricing</Link>
        </div>
      </ul>
      {checkUser === 0 && (<ul className="nav-signup flex-row">
        <Link to="/login" className="nav-link roboto-medium">Log in</Link>
        <Link to="/signup" ><button className="nav-button roboto-medium">Sign up</button></Link>
      </ul>)}
      {checkUser !== 0 && (<div className="nav-signup flex-row"><MenuInitials href="/home">{user.initials}</MenuInitials></div>)}

      <div className="mobile"><WelcomeMenu /></div>
    </Navbar>
  );
};

const Navbar = styled.nav`
  width: 100vw;
  padding: 1rem;
  display: flex;
  flex-direction: row;
  align-items: center;
  position: fixed;
  box-sizing: border-box;
  .logo {
    width: 14rem;
    padding-top: 2px;
  }
  .nav-link {
    text-decoration: none;
    align-self: center;
    padding: 0 1.5rem;
    color: var(--gray-text);
    font-size: 18px;
  }
  .link-wrapper {
    margin-left: 4rem;
  }

  .nav-button {
    padding: 0.7rem 2rem;
    font-size: 1rem;
    background-color: #06866E;
    border-radius: 25px;
    border: none;
    color: white;
  }

  .nav-signup {
    margin-left: auto;
    padding-right: 2rem;
  }

  .mobile {
    display: none;
  }
  ul {
    margin-bottom: 0;
  }


  @media screen and (max-width: 768px) {
    padding: 1rem 2rem 1rem 2rem;
    .link-wrapper, .nav-signup {
    display: none;
  }
  .mobile {
    display: flex;
    margin-left: auto;
  }
  }

  @media screen and (min-width: 769px) and (max-width: 1023px) {
    .link-wrapper {
    margin-left: 1.5rem;
  }
  .nav-link {
    padding: 0 1rem;
  }
  }

    
 
`; 

const MenuInitials = styled.a`
  background-color: var(--main-green);
  border-radius: 50%;
  border: none;
  color: white;
  font-weight: 600;
  transition-timing-function: ease-in;
  transition-duration: 0.2s;
  height: 40px;
  width: 40px;
  padding: 8px;

`

export default WelcomeNav;
