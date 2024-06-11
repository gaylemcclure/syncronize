import React from "react";
import styled from "styled-components";
import ScrollAnimation from '../utils/scrollAnimation';
import WelcomeNav from "../components/welcomeNav";
import icon from "../assets/images/sync-icon.png";
import text from "../assets/images/sync-text.png";
import eg from "../assets/images/welcome-eg.png";
import teamEg from "../assets/images/team-eg.png";
import docEg from '../assets/images/doc-eg.png';

const WelcomePage = () => {
  return (
    <WelcomeContainer className="welcome-bg">
      <WelcomeNav />

      <WelcomeBG>
      <div className="main">
        {/* Display the navbar */}
        
        {/* Welcome page desktop */}
        <PageWrapper>
          <div className="flex-row">
            <div className="logos left flex-col">
              <img className="logo-icon" src={icon} alt="sycronize icon logo" />
              <img src={text} className="logo-text" alt="sycronize text logo" />
              <h1 className="slogan roboto-bold">Where every project finds its perfect rhythm</h1>
            </div>
            <div className="right">
              <img src={eg} alt="syncronize eg homepage" />
            </div>
          </div>
          <div className="welcome-icons flex-row">
            <WelcomeIcon><i className="fa-solid fa-house"></i></WelcomeIcon>
            <WelcomeIcon><i className="fa-solid fa-list-check"></i></WelcomeIcon>
            <WelcomeIcon><i className="fa-solid fa-stopwatch"></i></WelcomeIcon>
            <WelcomeIcon><i className="fa-solid fa-flag"></i></WelcomeIcon>
            <WelcomeIcon><i className="fa-solid fa-chart-line"></i></WelcomeIcon>
            <WelcomeIcon><i className="fa-solid fa-file"></i></WelcomeIcon>
          </div>
        </PageWrapper>
        </div>
      </WelcomeBG>

      {/* Scroll down - Collab section */}
      <WelcomeBGRev>
        <PageWrapper>
          <div className="flex-row">
            <div className="left-alt">
              {/* <ScrollAnimation reappear> */}
              <img src={teamEg} alt="syncronize eg homepage" className="slide-in-blurred-left" />
              {/* </ScrollAnimation> */}
            </div>
            <div className="right-alt flex-col">
              <h2 className="team-text roboto-medium">Experience the synergy of seamless project management with Syncronize. Our intuitive platform synchronizes every aspect of your projects, from planning to execution, keeping your team in perfect harmony.</h2>
              <div className="flex-row">
                <FeatureIcon>Comments</FeatureIcon>
                <FeatureIcon>Docs</FeatureIcon>
              </div>
            </div>
          </div>
        </PageWrapper>
      </WelcomeBGRev>

      {/* Scroll down - doc section */}
      <WelcomeBGAlt>
        <PageWrapper>
          <div className="flex-row padding-top">
          <div className="left flex-end flex-col">
              <h2 className="task-text roboto-medium">With real-time updates, effortless collaboration, and streamlined workflows, Syncronize ensures that every project moves forward with precision and purpose.</h2>
              <div className="flex-col">
                <div className="flex-row">
                <FeatureIcon>Tasks</FeatureIcon>
                <FeatureIcon>Subtasks</FeatureIcon>
                </div>
                <div className="flex-row">
                <FeatureIcon>Forms</FeatureIcon>
                <FeatureIcon>Templates</FeatureIcon>
                </div>
              </div>
            </div>
            <div className="right">
              <img src={docEg} className="doc-img" alt="syncronize eg homepage" />
            </div>
          </div>
        </PageWrapper>
      </WelcomeBGAlt>

    
    </WelcomeContainer>
  );
};

// Styled components
const WelcomeContainer = styled.div`
  background-color: #afafaf;
  height: 100%;
  .main {
    padding-top: 7rem;
  }
`;

//Black slanted background variations
const WelcomeBG = styled.div`
  background-image: linear-gradient(175deg, #101010 0%, #343434 75%, #d9d9d9 calc(75% + 2px));
`;

const WelcomeBGRev = styled.div`
  background-image: linear-gradient(175deg, #d9d9d9 70%, #101010 calc(70% + 2px));
`;

const WelcomeBGAlt = styled.div`
  background-image: linear-gradient(4deg, #d9d9d9 45%, #101010 calc(45% + 2px));
`;

//Page inner
const PageWrapper = styled.div`

  .left {
    width: 35%;
    padding: 5rem 3rem;
    .logo-icon {
      width: 7rem;
    }
    .logo-text {
      width: 30rem;
    }
    .slogan {
      color: white;
      font-size: 42px;
      width: 24rem;
    }
  }

  .right {
    padding-top: 6rem;
    padding-bottom: 2rem;
    img {
      border-radius: 12px;
    }
  }

  .welcome-icons {
    justify-content: center;
  }


  }

  .right-alt {
    display: flex;
    padding: 13rem;
  }
    .flex-end {
        justify-content: flex-end;}

  .doc-img {
  height: 35rem;
  }

     @keyframes slide-in-blurred-left {
  0% {
    -webkit-transform: translateX(-1000px) scaleX(2.5) scaleY(0.2);
            transform: translateX(-1000px) scaleX(2.5) scaleY(0.2);
    -webkit-transform-origin: 100% 50%;
            transform-origin: 100% 50%;
    -webkit-filter: blur(40px);
            filter: blur(40px);
    opacity: 0;
  }
  100% {
    -webkit-transform: translateX(0) scaleY(1) scaleX(1);
            transform: translateX(0) scaleY(1) scaleX(1);
    -webkit-transform-origin: 50% 50%;
            transform-origin: 50% 50%;
    -webkit-filter: blur(0);
            filter: blur(0);
    opacity: 1;
  }
}

.slide-in-blurred-left {
	-webkit-animation: slide-in-blurred-left 1.2s ease-in both;
	        animation: slide-in-blurred-left 1.2s ease-in both;
}

/* The element to apply the animation to */
.left-alt {
    width: 65%;
    padding: 9rem 5rem;
    img {
      border-radius: 12px;

      overflow: hidden;
    
}
`;

//First page icon background
const WelcomeIcon = styled.div`
  height: 4rem;
  width: 4rem;
  background-color: #464545;
  border-radius: 12px;
  padding: 0.5rem;
  margin: 2rem 3rem;
  display: flex;
  justify-content: center;
  align-items: center;
  .fa-solid {
    font-size: 2rem;
    color: var(--gray-text);
  }
`;

//Feature box styling
const FeatureIcon = styled.div`
  border: 1px solid #a5a5bf;
  border-radius: 12px;
  padding: 0.5rem 1rem;
  margin-right: 2rem;
  margin-bottom: 0.5rem;
`;

export default WelcomePage;
