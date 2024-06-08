import React from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";
import logo from "../assets/images/sync.png";

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
    </Navbar>
  );
};

const Navbar = styled.nav`
  padding: 1rem;
  display: flex;
  flex-direction: row;
  align-items: center;
  position: fixed;
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
  .
`;

export default WelcomeNav;
