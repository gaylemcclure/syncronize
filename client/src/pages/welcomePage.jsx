import styled from "styled-components";
import { useState, useEffect } from "react";
import icon from "../assets/images/sync-icon.png";
import text from "../assets/images/sync-text.png";
import eg from "../assets/images/welcome-eg.png";
import teamEg from "../assets/images/team-eg.png";
import docEg from "../assets/images/doc-eg.png";
import WelcomeFooter from "../components/nav/welcomeFooter";
import AccordionComponent from "../components/accordion";
import accordionData from "../assets/data/welcomeAccordion";
import WelcomeNav from "../components/nav/welcomeNav";
import Auth from "../utils/auth";
import { QUERY_ME } from "../utils/queries";
import { useQuery } from "@apollo/client";

const WelcomePage = () => {
  const [userData, setUserData] = useState({});
  const { data } = useQuery(QUERY_ME);
  const user = data?.me;

  // Determine if `useEffect()` hook needs to run again
  const userDataLength = Object.keys(userData).length;

  useEffect(() => {
    const getUserData = async () => {
      try {
        const token = Auth.loggedIn() ? Auth.getToken() : null;

        if (!token) {
          return false;
        }

        if (user) {
          setUserData(user);
        }
      } catch (err) {
        console.error(err);
      }
    };

    getUserData();
  }, [user]);

  return (
    <WelcomeContainer className="welcome-bg">
      <WelcomeNav user={userData} />
      <WelcomeBG>
        <div className="main">
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
              <div className="flex-col center">
                <WelcomeIcon>
                  <i className="fa-solid fa-house"></i>
                </WelcomeIcon>
                <p>Projects</p>
              </div>
              <div className="flex-col center">
                <WelcomeIcon>
                  <i className="fa-solid fa-list-check"></i>
                </WelcomeIcon>
                <p>Tasks</p>
              </div>
              <div className="flex-col center">
                <WelcomeIcon>
                  <i className="fa-solid fa-stopwatch"></i>
                </WelcomeIcon>
                <p>Time tracking</p>
              </div>
              <div className="flex-col center">
                <WelcomeIcon>
                  <i className="fa-solid fa-flag"></i>
                </WelcomeIcon>
                <p>Milestones</p>
              </div>
              <div className="flex-col center">
                <WelcomeIcon>
                  <i className="fa-solid fa-chart-line"></i>
                </WelcomeIcon>
                <p>Dashboards</p>
              </div>
              <div className="flex-col center">
                <WelcomeIcon>
                  <i className="fa-solid fa-file"></i>
                </WelcomeIcon>
                <p>Docs</p>
              </div>
            </div>
          </PageWrapper>
        </div>
      </WelcomeBG>

      <WelcomeBGRev>
        <PageWrapper>
          <div className="flex-row">
            <div className="left-alt">
              <img src={teamEg} alt="syncronize eg homepage" className="slide-in-blurred-left" />
            </div>
            <div className="right-alt flex-col">
              <h2 className="team-text roboto-medium">Experience the synergy of seamless project management with Syncronize. Our intuitive platform synchronizes every aspect of your projects, from planning to execution, keeping your team in perfect harmony.</h2>
              <div className="flex-row feature-container top">
                <FeatureIcon>Comments</FeatureIcon>
                <FeatureIcon>Docs</FeatureIcon>
              </div>
            </div>
          </div>
        </PageWrapper>
      </WelcomeBGRev>

      <WelcomeBGAlt>
        <PageWrapper>
          <div className="flex-row padding-top">
            <div className="left flex-start flex-col">
              <h2 className="task-text roboto-medium">With real-time updates, effortless collaboration, and streamlined workflows, Syncronize ensures that every project moves forward with precision and purpose.</h2>
              <div className="flex-col task-text">
                <div className="flex-row feature-container">
                  <FeatureIcon className="feature-alt">Tasks</FeatureIcon>
                  <FeatureIcon className="feature-alt">Subtasks</FeatureIcon>
                </div>
                <div className="flex-row feature-container">
                  <FeatureIcon className="feature-alt">Forms</FeatureIcon>
                  <FeatureIcon className="feature-alt">Templates</FeatureIcon>
                </div>
              </div>
            </div>
            <div className="right no-padding">
              <img src={docEg} className="doc-img" alt="syncronize eg homepage" />
            </div>
          </div>
        </PageWrapper>
      </WelcomeBGAlt>
      <WelcomeBGLast>
        <PageWrapper>
          <AccordionComponent data={accordionData} />
        </PageWrapper>
      </WelcomeBGLast>
      <WelcomeFooter />
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
  padding-bottom: 4rem;
  /* @media screen and (max-width: 568px) {
    margin-bottom: -1rem;
  } */
`;

const WelcomeBGAlt = styled.div`
  background-image: linear-gradient(4deg, #d9d9d9 45%, #101010 calc(45% + 2px));
  padding-bottom: 13rem;

  @media screen and (max-width: 768px) {
    padding-bottom: 5rem;
  }
`;

const WelcomeBGLast = styled.div`
  background-color: #d9d9d9;
  padding: 1rem 10rem 22rem;

  @media screen and (max-width: 768px) {
    padding: 1rem 5rem 10rem;
  }
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
      line-height: 1.2;
    }
    .task-text {
      padding: 0 4rem;
      color: white;
    }
  }

  .right {
    padding-top: 3rem;
    padding-bottom: 2rem;
    width: 65%;
    img {
      border-radius: 12px;
      width: 100%;
      max-width: 60vw;
    }
  }

  .right-alt {
    display: flex;
    padding: 20rem 3rem 0 0;
    width: 35%;
    img {
      border-radius: 12px;
      max-width: 90vw;
    }
  }

  .left-alt {
    width: 65%;
    padding: 11rem 0 11rem 5rem;

    img {
      border-radius: 12px;
      overflow: hidden;
    }
  }
  .right.no-padding {
    padding-top: 0;
  }
  .welcome-icons {
    justify-content: center;
    flex-wrap: wrap;
    width: 100vw;
  }

  .feature-alt {
    color: white;
  }

  .team-text,
  .left h2.task-text {
    font-size: 28px;
    padding-bottom: 1rem;
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

  .chakra-accordion__item {
    border-color: var(--main-green);
    h2 {
      border-color: var(--main-green);

      button {
        height: 5rem;
        span {
          font-weight: 700;
        }
      }
    }
    .chakra-collapse {
      background-color: #b9b7b7;
      border-radius: 4px;
      padding: 1rem;
    }
  }

  @media screen and (max-width: 568px) {
    .flex-row.feature-container.top {
      padding: 0 2rem;
    }
    .left .task-text {
      padding-bottom: 4rem;
    }
  }

  @media screen and (max-width: 768px) {
    padding-bottom: 3rem;
    .flex-row {
      flex-direction: column;
    }

    .left {
      width: 100%;
      padding: 1rem 2rem;
      justify-content: center;
      align-items: center;
      .logo-icon {
        width: 4rem;
      }
      .logo-text {
        width: 15rem;
      }
      .slogan {
        width: 100%;
        padding: 0 3rem;
        text-align: center;
      }
      h2 {
        width: 100%;
        margin-top: -12rem;
        color: white;
      }
      .task-text {
        width: 100%;
      }
    }
    .right {
      width: 100%;
      padding-top: 1rem;
      display: flex;
      justify-content: center;
      align-items: center;
      img {
        max-width: 90vw;
      }
    }
    .welcome-icons.flex-row {
      flex-direction: row;
      flex-wrap: wrap;
    }
    .left-alt {
      width: 100%;
      display: flex;
      justify-content: center;
      align-items: center;
      padding: 0;
      img {
        width: 90vw;
      }
    }
    .right-alt {
      width: 100%;
      padding: 1rem;
      margin-bottom: 17rem;
    }
    .team-text,
    .left h2.task-text {
      font-size: 20px;
    }
    .team-text {
      padding: 1rem 3rem;
    }
    .flex-row.feature-container {
      flex-direction: row;
    }
    .left.flex-start {
      padding: 0;
    }
  }

  @media screen and (min-width: 769px) and (max-width: 1023px) {
    .link-wrapper {
      margin-left: 2rem;
    }
    .left {
      width: 45%;
      .logo-text {
        width: 22rem;
      }
      .logo-icon {
        width: 5rem;
      }
      .task-text {
        padding: 0;
      }
    }
    .right {
      width: 52%;
      padding-top: 5rem;
    }
    .left-alt {
      width: 55%;
      padding: 6rem 0 11rem 2rem;
    }
    .right-alt {
      width: 45%;
      padding: 6rem 3rem 0 3rem;
    }
    .team-text,
    .left h2.task-text {
      font-size: 20px;
    }
    .left.flex-start {
      padding-top: 2rem;
    }
  }

  @media screen and (min-width: 1024px) and (max-width: 1300px) {
    .right {
      img {
        width: 60vw;
      }
    }
    .left-alt {
      padding: 11rem 2rem 11rem 5rem;
      img {
        max-width: 50vw;
      }
    }
    .right-alt {
      padding: 12rem 3rem 0 2rem;
    }
    .team-text,
    .left h2.task-text {
      font-size: 20px;
    }
    .left.flex-start {
      padding: 0 1rem;
    }
    .left {
      .slogan {
        font-size: 30px;
        padding-right: 7rem;
      }
      .task-text {
        padding: 0 2rem;
      }
    }
    .link-wrapper {
      margin-left: 2rem;
    }
  }

  @media screen and (min-width: 1301px) and (max-width: 1800px) {
    .left.flex-start {
      padding: 0 1rem;
    }
    .right-alt {
      padding: 20rem 3rem 0 3rem;
    }
    .team-text,
    .left h2.task-text {
      font-size: 24px;
    }
  }

  @media screen and (min-width: 1801px) {
  }
`;

//First page icon background
const WelcomeIcon = styled.div`
  height: 4rem;
  width: 4rem;
  background-color: #464545;
  border-radius: 12px;
  padding: 0.5rem;
  margin: 2rem 3rem 0;
  display: flex;
  justify-content: center;
  align-items: center;
  .fa-solid {
    font-size: 2rem;
    color: var(--gray-text);
  }

  @media screen and (max-width: 1023px) {
    margin: 2rem 2rem 0;
  }
`;

//Feature box styling
const FeatureIcon = styled.div`
  border: 1px solid #a5a5bf;
  border-radius: 12px;
  padding: 0.5rem 1rem;
  margin-right: 2rem;
  margin-bottom: 0.5rem;

  @media screen and (min-width: 569px) and (max-width: 1023px) {
    max-width: 10rem;
  }
`;

export default WelcomePage;
