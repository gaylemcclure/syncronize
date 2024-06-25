import React from "react";
import styled from "styled-components";
import logo from "../../assets/images/sync.png";


const WelcomeFooter = () => {

    const date = new Date();
    const year = date.getFullYear();
  return (
    <FooterContainer>
        <Logo src={logo} alt="logo"/>
        Copyright: Gayle McClure - {year}

    </FooterContainer>
  );
};

const FooterContainer = styled.div`
    height: 10rem;
    background-color: var(--black);
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    color: white;

`

const Logo = styled.img`
    width: 10rem;
`

export default WelcomeFooter;
