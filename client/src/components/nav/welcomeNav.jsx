import React from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";
import logo from "../../assets/images/sync.png";
import WelcomeMenu from "../menus/welcomeMenu";

const WelcomeNav = () => {
  return (
    <Navbar>
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
      <WelcomeMenu />
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
  /* @media only screen and (max-width: 360px) {

  } */

  @media screen and (max-width: 568px) {
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
      padding-right: 0;
    }
  }


@media screen and (min-width: 768px) {

}

@media screen and (min-width: 1024px) {

}

@media screen and (min-width: 1300px) {

}
@media screen and (min-width: 1800px) {

}
    
 
`;

export default WelcomeNav;
