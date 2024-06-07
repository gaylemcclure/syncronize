import React from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";

const WelcomeNav = () => {
  return (
    <Navbar>
          <div className="logo">Shopio</div>
           <ul className="nav-links">
              <Link to="/">Home</Link>
              <Link to="/product">Products</Link>
              <Link to="/service">Services</Link>
              <Link to="/pricing">Pricing</Link>
              <Link to="/login">Log in</Link>
              <Link to="/signup">Sign up</Link>
           </ul>
    </Navbar>
  );
};



const Navbar = styled.nav`


  .
`;

export default WelcomeNav;
