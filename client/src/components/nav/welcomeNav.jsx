import styled from "styled-components";
import { Link } from "react-router-dom";
import logo from "../../assets/images/sync.png";
import WelcomeMenu from "../menus/welcomeMenu";

const WelcomeNav = () => {
  const path = window.location.pathname;
  console.log(path)
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
      <ul className="nav-signup flex-row">
        <Link to="/login" className="nav-link roboto-medium">Log in</Link>
        <Link to="/signup" ><button className="nav-button roboto-medium">Sign up</button></Link>
      </ul>
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

/* 
@media screen and (max-width: 768px) {
  .logo {
      width: 10rem;
    }
    ul {
      padding-left: 0;
      margin-bottom: 0;
    }
    .link-wrapper, .nav-link {
      display: none;
    }
    .nav-button {
      padding: 0.4rem 0.5rem;
      font-size: 0.8rem;
    }
    .nav-signup {
      padding-right: 1rem;
    }
} */

/* @media screen and (max-width: 1024px) {
  .logo {
      width: 10rem;
    }
    ul {
      padding-left: 0;
      margin-bottom: 0;
    }
    .mobile {
      display: none;
    }
    .nav-button {
      padding: 0.4rem 0.5rem;
      font-size: 0.8rem;
    }
    .nav-signup {
      padding-right: 1rem;
    }
    .link-wrapper, .nav-link {
      display: flex;
    }
} */
/* 
@media screen and (max-width: 1300px) {

}
@media screen and (min-width: 1800px) {

}*/
    
 
`; 

export default WelcomeNav;
