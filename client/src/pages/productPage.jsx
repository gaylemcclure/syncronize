import WelcomeNav from "../components/nav/welcomeNav";
import styled from "styled-components";
import Auth from "../utils/auth";
import { QUERY_ME } from "../utils/queries";
import { useQuery } from "@apollo/client";
import { useState, useEffect } from "react";
import prodImage from '../assets/images/Parlax-placeholder.png'
import WelcomeFooter from '../components/nav/welcomeFooter';


const ProductPage = () => {
  return (
    <div>
      <ProductContainer>
        <h1>All aspects of work in one <span className="green-text">SYNCRONIZED </span>solution</h1>
        <h4>Syncronize allows teams to focus on executing tasks, projects, and processes efficiently and achieve shared goals at scale.</h4>
        <img src={prodImage} alt="data chart" />

      </ProductContainer>
      <WelcomeFooter />
    </div>
  );
};

const ProductContainer = styled.div`
  height: 100%;
  padding: 7rem 3rem 0;
  display: flex;
  flex-direction: column;
  align-items: center;
  h1 {
    font-size: 3rem;
    max-width:700px;
    text-align: center;
  }
  h4 {
    font-size: 1.2rem;
    font-weight: 500;
    max-width:700px;
    text-align: center;
  }

  img {
        width: 75%;
  }

  .animate-img {
    background-color: red;
    height: 4rem;
    width: 4rem;
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
`;

export default ProductPage;
