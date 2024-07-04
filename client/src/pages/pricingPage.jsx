import WelcomeNav from "../components/nav/welcomeNav";
import styled from 'styled-components';
import WelcomeFooter from "../components/nav/welcomeFooter";
import { useOutletContext } from "react-router";


const PricingPage = () => {

    const PriceCard = () => {
        return (
            <PriceBox>
                <h3>Title</h3>
                <p>Description</p>
                <h4>$50</h4>
                <PriceButton>Get started</PriceButton>
                <div>
                    <p>Key features</p>
                    <ul>
                        <li>Feature</li>
                    </ul>
                </div>
            </PriceBox>
        )
    }
    const [user] = useOutletContext();
    return (
        <PricingContainer>
        <WelcomeNav user= {user} />
<PricingWrapper>
    <h1>pricing</h1>
    <PriceCard />
</PricingWrapper>
        <WelcomeFooter />
      </PricingContainer>
  
    )
};

const PricingContainer = styled.div`

  display: flex;
  flex-direction: column;
`

const PricingWrapper = styled.div`
      background-color: #fbfbfb;
      height: 100%;
      padding-top: 6rem;

`

const PriceBox = styled.div`
    border: 1px solid black;
    border-radius: 12px;
`

const PriceButton = styled.button`
    width: 5rem;
    height: 40px;
    color: white;
    border: none;
    border-radius: 12px;

`

export default PricingPage;