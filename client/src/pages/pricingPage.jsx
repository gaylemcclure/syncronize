/* eslint-disable react/prop-types */
import WelcomeNav from "../components/nav/welcomeNav";
import styled from "styled-components";
import WelcomeFooter from "../components/nav/welcomeFooter";
import PropTypes from "prop-types";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Box from "@mui/material/Box";
import { singleData, recurringData } from "../assets/data/pricingData";
import { useState, useEffect } from "react";

const PricingPage = () => {
  const [value, setValue] = useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
  const CustomTabPanel = (props) => {
    const { children, value, index, ...other } = props;

    return (
      <div role="tabpanel" hidden={value !== index} id={`simple-tabpanel-${index}`} aria-labelledby={`simple-tab-${index}`} {...other}>
        {value === index && <Box sx={{ p: 3 }}>{children}</Box>}
      </div>
    );
  };

  CustomTabPanel.propTypes = {
    children: PropTypes.node,
    index: PropTypes.number.isRequired,
    value: PropTypes.number.isRequired,
  };

  const a11yProps = (index) => {
    return {
      id: `simple-tab-${index}`,
      "aria-controls": `simple-tabpanel-${index}`,
    };
  };

  const handlePlan = (e) => {
    const planType = e.target.value;
    window.location.href = `/signup?=${planType}`;
  };

  const PriceCard = ({ title, description, text, price, features, value }) => {
    const formLink = "http://localhost:5173/create-checkout-session-recurring";
    return (
      <PriceBox>
        <h3 style={{ color: `${text}` }}>{title}</h3>
        <h4>{description}</h4>
        <h5 style={{ color: `${text}` }}>{price}</h5>
        <form action={`${formLink}?=${value}`} method="POST">
        </form>
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
      <PricingWrapper>
        <h1>
          Start <span className="green-text">syncronizing </span>your work today!
        </h1>
        <p>Options for recurring subscription or get lifetime access for one single payment</p>

        <Box sx={{ width: "100%", display: 'flex', flexDirection: "column", alignItems:  'center'}}>
          <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
            <Tabs value={value} onChange={handleChange} aria-label="basic tabs example">
              <Tab label="Recurring" {...a11yProps(0)} />
              <Tab label="Lifetime" {...a11yProps(1)} />
            </Tabs>
          </Box>
          <CustomTabPanel value={value} index={0}>
          <div className="recurring">
                {recurringData.map((rec, i) => {
                  return <PriceCard key={i} text={rec.text} title={rec.title} price={rec.cost} description={rec.description} features={rec.features} value={rec.value} />;
                })}
              </div>

          </CustomTabPanel>
          <CustomTabPanel value={value} index={1}>
          {<PriceCard text={singleData.text} title={singleData.title} price={singleData.cost} description={singleData.description} value={singleData.value} features={singleData.features} />}
          </CustomTabPanel>
        </Box>
        {/* <Tabs variant="enclosed">
          <TabList>
            <Tab>Recurring</Tab>
            <Tab>Lifetime</Tab>
          </TabList>
          <TabPanels>
            <TabPanel>
            </TabPanel>
            <TabPanel className="lifetime"></TabPanel>
          </TabPanels>
        </Tabs> */}
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
