import React, { useState, useEffect } from 'react';
import { Routes, Route, Link } from "react-router-dom";
import WelcomePage from './pages/welcomePage';
import ProductPage from './pages/productPage';
import SolutionsPage from './pages/solutionsPage';
import SignupPage from './pages/signupPage';
import PricingPage from './pages/pricingPage';


const App = () => {

    const [backendData, setBackendData] = useState([{}]);

    useEffect(() => {
    fetch("/api/users").then(
     response => response.json()
    ).then(
      data => {
        setBackendData(data)
      }
    )
  }, [])

  return (

    <Routes>
    <Route path="/" element={<WelcomePage />} />
      <Route index element={<WelcomePage />} />
      <Route path="product" element={<ProductPage />} />
      <Route path="solutions" element={<SolutionsPage />} />
      <Route path="pricing" element={<PricingPage />} />
      <Route path="login" element={<SignupPage />} />
      <Route path="signup" element={<SignupPage />} />
      <Route path="*" element={<NoMatch />} />

  </Routes>

  );
}


function NoMatch() {
  return (
    <div>
      <h2>Nothing to see here!</h2>
      <p>
        <Link to="/">Go to the home page</Link>
      </p>
    </div>
  );
}

export default App;
