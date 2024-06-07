import React from 'react';
import styled from "styled-components";
import WelcomeNav from '../components/welcomeNav';

const WelcomePage = () => {

  return (
    <WelcomeContainer className="welcome-bg">
      <WelcomeBG>
        <WelcomeNav />
      </WelcomeBG>
    </WelcomeContainer>
  )

};

const WelcomeContainer = styled.div`
  background-color: #AFAFAF;
  height: 100%;
`;

const WelcomeBG = styled.div`
  background: rgb(16, 16, 16);
  background: linear-gradient(
    180deg,
    rgba(16, 16, 16, 1) 0%,
    rgba(52, 52, 52, 1) 100%
  );
  height: 80vh;
  clip-path: polygon(0 0, 100% 0, 100% calc(100% - 10vw), 0 100%);
  -webkit-clip-path: polygon(0 0, 100% 0, 100% calc(100% - 10vw), 0 100%);
  margin-bottom: -10vw;
`;

export default WelcomePage;