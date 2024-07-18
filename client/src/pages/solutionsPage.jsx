import WelcomeNav from '../components/nav/welcomeNav';
import Auth from "../utils/auth";
import { QUERY_ME } from "../utils/queries";
import { useQuery } from "@apollo/client";
import { useState, useEffect } from 'react';

const SolutionPage = () => {
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
    return (
        <>
        <WelcomeNav user={userData} />
        <h1>Solutions</h1>
        </>
    )
}

export default SolutionPage;