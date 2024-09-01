import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import logo from "../assets/images/sync.png";
import WelcomeFooter from "../components/nav/welcomeFooter";
import styled from "styled-components";
import {useNavigate} from 'react-router-dom';


const Success = () => {
  const [session, setSession] = useState({});
  const location = useLocation();
  const sessionId = location.search.replace('?session_id=', '');
  const [user, setUser] = useState("");

  const navigate = useNavigate();

  useEffect(() => {
    async function fetchSession() {
      setSession(
        await fetch('/checkout-session?sessionId=' + sessionId).then((res) =>
          res.json()
        )
      );
    }
    fetchSession();
  }, [sessionId]);


  useEffect(() => {
    // setTimeout(() => {
    //   console.log("sending home")
    //   navigate(`${process.env.VITE_DOMAIN}/home`)
    // }, 1000)
  }, [])

  return (
    <div className="sr-root">
      <PaymentText>
      <h1>Your payment was successful.</h1>
    <h2>Redirecting to your new Syncronize workspace...</h2>

      </PaymentText>
      <WelcomeFooter />
    </div>
  );
};

const PaymentText = styled.div`
    padding-top: 6rem;
    display: flex;
    flex-direction: column;
    align-items: center;
    height: 68vh;

`

const PriceNav = styled.nav`
  background-color: var(--black);
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
    font-size: 18px;
  }
  .link-wrapper {
    margin-left: 4rem;
  }

  .nav-button {
    padding: 0.7rem 2rem;
    font-size: 1rem;
    background-color: #06866e;
    border-radius: 25px;
    border: none;
    color: white;
  }

  .nav-signup {
    margin-left: auto;
    padding-right: 2rem;
  }

  .mobile {
    display: none;
  }
  ul {
    margin-bottom: 0;
  }

  @media screen and (max-width: 768px) {
    padding: 1rem 2rem 1rem 2rem;
    .link-wrapper,
    .nav-signup {
      display: none;
    }
    .mobile {
      display: flex;
      margin-left: auto;
    }
  }

  @media screen and (min-width: 769px) and (max-width: 1023px) {
    .link-wrapper {
      margin-left: 1.5rem;
    }
    .nav-link {
      padding: 0 1rem;
    }
  }
`;

const UserIcon = styled.div`
  background-color: var(--main-green);
  border-radius: 50%;
  border: none;
  color: white;
  font-weight: 600;
  transition-timing-function: ease-in;
  transition-duration: 0.2s;
  height: 40px;
  width: 40px;
  padding: 3px;
  display: flex;
  justify-content: center;
  align-items: center;
  margin-left: auto;
`;
export default Success;
