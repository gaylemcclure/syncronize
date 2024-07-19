import WelcomeNav from '../components/nav/welcomeNav';
import styled from 'styled-components';
import Auth from "../utils/auth";
import { QUERY_ME } from "../utils/queries";
import { useQuery } from "@apollo/client";
import { useState, useEffect } from 'react';

const ProductPage = () => {
        // const [userData, setUserData] = useState({});
        // const { data } = useQuery(QUERY_ME);
        // const user = data?.me;
      
        // useEffect(() => {
        //   const getUserData = async () => {
        //     try {
        //       const token = Auth.loggedIn() ? Auth.getToken() : null;
      
        //       if (!token) {
        //         return false;
        //       }
      
        //       if (user) {
        //         setUserData(user);
        //       }
        //     } catch (err) {
        //       console.error(err);
        //     }
        //   };
      
        //   getUserData();
        // }, [user]);
    return (
        <div>
            {/* <WelcomeNav user={userData} /> */}
            <ProductContainer>
                <h1>Something</h1>
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