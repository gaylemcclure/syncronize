import React, { useState, useEffect } from 'react';
import { Routes, Route, Outlet, Link } from "react-router-dom";
import WelcomePage from './pages/welcomePage';
import ProductPage from './pages/productPage';
import ServicePage from './pages/servicePage';
import LoginPage from './pages/loginPage';
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
    <Route path="/" element={<WelcomePage />}>
      <Route index element={<WelcomePage />} />
      <Route path="product" element={<ProductPage />} />
      <Route path="service" element={<ServicePage />} />
      <Route path="pricing" element={<PricingPage />} />
      <Route path="login" element={<LoginPage />} />
      <Route path="signup" element={<SignupPage />} />

      <Route path="*" element={<NoMatch />} />
    </Route>
  </Routes>

  );
}





// function Layout() {
//   return (
//     <div>
//       {/* A "layout route" is a good place to put markup you want to
//           share across all the pages on your site, like navigation. */}
//       <nav>
//         <ul>
//           <li>
//             <Link to="/">Home</Link>
//           </li>
//           <li>
//             <Link to="/about">About</Link>
//           </li>
//           <li>
//             <Link to="/dashboard">Dashboard</Link>
//           </li>
//           <li>
//             <Link to="/nothing-here">Nothing Here</Link>
//           </li>
//         </ul>
//       </nav>

//       <hr />

//       {/* An <Outlet> renders whatever child route is currently active,
//           so you can think about this <Outlet> as a placeholder for
//           the child routes we defined above. */}
//       <Outlet />
//     </div>
//   );
// }


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
