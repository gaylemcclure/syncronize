/* eslint-disable react/prop-types */
import WelcomeNav from "../components/nav/welcomeNav";
import styled from "styled-components";
import WelcomeFooter from "../components/nav/welcomeFooter";
import { Tabs, TabList, TabPanels, Tab, TabPanel } from "@chakra-ui/react";
import { singleData, recurringData } from "../assets/data/pricingData";
import Auth from "../utils/auth";
import { QUERY_ME } from "../utils/queries";
import { useQuery } from "@apollo/client";
import { useState, useEffect } from "react";

const PricingPage = () => {
  const [userData, setUserData] = useState({});
  const { data } = useQuery(QUERY_ME);
  const user = data?.me;

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

  const handlePlan = (e) => {
    const planType = e.target.value;
    window.location.href = `/signup?=${planType}`;
  };

  const PriceCard = ({ title, description, text, price, features, value }) => {
    const formLink = "http://localhost:5001/create-checkout-session-recurring";
    return (
      <PriceBox>
        <h3 style={{ color: `${text}` }}>{title}</h3>
        <h4>{description}</h4>
        <h5 style={{ color: `${text}` }}>{price}</h5>
        {/* <form action={`${formLink}?=${value}`} method="POST">
          <button role="link" id="submit" value={value} type="submit">
            Get started
          </button>
        </form> */}
        <PriceButton value={value} onClick={(e) => handlePlan(e)}>
          Get started
        </PriceButton>
        <div>
          <p>Key features</p>
          <ul>
            {features.map((feat) => {
              return (
                <li key={feat.id}>
                  <span className="material-symbols-outlined">check</span>
                  {feat.name}
                </li>
              );
            })}
          </ul>
        </div>
      </PriceBox>
    );
  };

  return (
    <PricingContainer>
      <WelcomeNav user={userData} />
      <PricingWrapper>
        <h1>
          Start <span className="green-text">syncronizing </span>your work today!
        </h1>
        <p>Options for recurring subscription or get lifetime access for one single payment</p>
        <Tabs variant="enclosed">
          <TabList>
            <Tab>Recurring</Tab>
            <Tab>Lifetime</Tab>
          </TabList>
          <TabPanels>
            <TabPanel>
              <div className="recurring">
                {recurringData.map((rec, i) => {
                  return <PriceCard key={i} text={rec.text} title={rec.title} price={rec.cost} description={rec.description} features={rec.features} value={rec.value} />;
                })}
              </div>
            </TabPanel>
            <TabPanel className="lifetime">{<PriceCard text={singleData.text} title={singleData.title} price={singleData.cost} description={singleData.description} value={singleData.value} features={singleData.features} />}</TabPanel>
          </TabPanels>
        </Tabs>
      </PricingWrapper>
      <WelcomeFooter />
    </PricingContainer>
  );
};

const PricingContainer = styled.div`
  display: flex;
  flex-direction: column;
  .recurring {
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    gap: 2rem;
  }
  .chakra-tabs {
    display: flex;
    flex-direction: column;
    align-items: center;
    .chakra-tabs__tablist {
      background-color: transparent;
      border: 1px solid var(--black);
      border-radius: 12px;
      padding: 0.5rem;
      margin: 1rem 0 2rem;
      button {
        padding: 0.5rem;
        color: var(--main-green);
        border: none;
        border-radius: 12px;
        font-size: 1rem;
      }
      button[aria-selected="true"] {
        background-color: var(--gray-border);
      }
      button[aria-selected="false"] {
        background-color: transparent;
      }
    }
  }
`;

const PricingWrapper = styled.div`
  background-color: #fbfbfb;
  height: 100%;
  padding: 8rem 2rem 4rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  h1 {
    font-size: 50px;
    font-weight: 800;
    margin-bottom: 0;
  }
  .green-text {
    color: var(--main-green);
  }
`;

const PriceBox = styled.div`
  border: 1px solid black;
  border-radius: 12px;
  padding: 1rem 2rem;
  min-width: 18rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  h3 {
    font-size: 24px;
    font-weight: 800;
    margin-bottom: 0;
  }
  h4 {
    margin-top: 10px;
    font-weight: 500;
  }
  h5 {
    margin-top: 0;
    font-size: 30px;
    font-weight: 800;
    margin-bottom: 1rem;
  }
  p {
    margin-top: 2rem;
    font-weight: 800;
    text-decoration: underline;
  }
`;

const PriceButton = styled.button`
  width: 5rem;
  height: 40px;
  color: white;
  border: none;
  border-radius: 12px;
  background-color: var(--main-green);
  width: 100%;
`;

export default PricingPage;
