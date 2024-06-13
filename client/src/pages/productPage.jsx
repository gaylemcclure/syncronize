import React from 'react';
import WelcomeNav from '../components/nav/welcomeNav';
import styled from 'styled-components';
import ScrollAnimation from '../utils/scrollAnimation';

const ProductPage = () => {
    return (
        <div>
            <WelcomeNav />
            <ProductContainer>
                <h1>Something</h1>
                {/* <div className="animate-img slide-in-blurred-left"></div> */}

                <ScrollAnimation reappear><div className="animate-img slide-in-blurred-left"></div></ScrollAnimation>

            </ProductContainer>


        </div>
    )
};

const ProductContainer = styled.div`
    height: 100%;
    background-color: blue;
    padding: 7rem 3rem 3rem;

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

`

export default ProductPage;