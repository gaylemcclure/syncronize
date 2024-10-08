import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from 'react-router-dom';

//Import the routes
import App from "./App.jsx";
import WelcomePage from "./pages/welcomePage";
import ProductPage from "./pages/productPage";
import SolutionsPage from "./pages/solutionsPage";
import SignupPage from "./pages/signupPage";
import PricingPage from "./pages/pricingPage";
import HomePage from "./pages/homePage";
import ProjectPage from './pages/projectPage';
import ErrorPage from "./pages/errorPage.jsx";
import Checkout from "./pages/checkout.jsx";
import Success from "./pages/successPage.jsx";
import Cancelled from './pages/cancelledPage.jsx';
import LoginPage from './pages/loginPage.jsx';
import AccountPage from "./pages/home/accountPage.jsx";
import ThemePage from './pages/home/themePage.jsx';
import SettingsPage from './pages/home/settingsPage.jsx';
import ManageUsers from './pages/home/manageUsers.jsx'

//Import stylesheet
import '../src/assets/styles/index.css';


// Define the accessible routes, and which components respond to which URL
const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    errorElement: <ErrorPage />,
    children: [
      {
        index: true,
        element: <WelcomePage />,
      },
      {
        path: 'product',
        element: <ProductPage />,
      },
      {
        path: 'solutions',
        element: <SolutionsPage />,
      },
      {
        path: 'pricing',
        element: <PricingPage />,
      },
      {
        path: 'login',
        element: <LoginPage />,
      },
      {
        path: 'signup',
        element: <SignupPage />,
      },
      {
        path: 'home',
        element: <HomePage />,
      },
      {
        path: 'project/:id',
        element: <ProjectPage />,
      },
      {
        path: 'checkout',
        element: <Checkout />,
      },
      {
        path: 'create-checkout-session',
        element: <Checkout />,
      },
      {
        path: 'cancelled',
        element: <Cancelled />,
      },
      {
        path: 'success=?*',
        element: <Success />,
      },
      {
        path: 'home/account',
        element: <AccountPage />
      },
      {
        path: 'home/settings',
        element: <SettingsPage />
      },
      {
        path: 'home/manage-users',
        element: <ManageUsers />
      },
      {
        path: 'home/theme',
        element: <ThemePage />
      },


    ],
  },
]);


ReactDOM.createRoot(document.getElementById('root')).render(
  <RouterProvider router={router} />
)

