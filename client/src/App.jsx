import { ApolloClient, InMemoryCache, ApolloProvider, createHttpLink } from "@apollo/client";
import { setContext } from "@apollo/client/link/context";
import { useUserContext } from "../src/utils/contexts";
import { OpenProvider, useOpenContext } from "./utils/openContext";
import { Outlet } from "react-router-dom";
import { UserProvider } from "../src/utils/contexts";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import useMediaQuery from "@mui/material/useMediaQuery";
import HomeNav from "./components/nav/homeNav";
import WelcomeNav from "./components/nav/welcomeNav";
import { useState, useEffect } from "react";

// Construct main GraphQL API endpoint
const httpLink = createHttpLink({
  uri: "/graphql",
});

// Construct request middleware that will attach the JWT token to every request as an `authorization` header
const authLink = setContext((_, { headers }) => {
  // get the authentication token from local storage if it exists
  const token = localStorage.getItem("id_token");
  // return the headers to the context so httpLink can read them
  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : "",
    },
  };
});

// Set up our client to execute the `authLink` middleware prior to making the request to our GraphQL API
const client = new ApolloClient({
  link: authLink.concat(httpLink),
  cache: new InMemoryCache(),
});

function App() {
  const prefersDarkMode = useMediaQuery("(prefers-color-scheme: light)");
  const pathname = window.location.pathname;
  const [path, setPath] = useState("welcome");
  // const {userData} = useUserContext();





  const theme = createTheme({
    palette: {
      mode: prefersDarkMode ? "dark" : "light",
      primary: {
        main: "#f3f4f9",
        contrastText: "#000",
        light: "#06866e",
      },
      secondary: {
        main: "#101010",
        contrastText: "#fff",
      },
      light: {
        main: "#f3f4f9",
      },
    },
    typography: {
      fontFamily: "Figtree, sans-serif",
    },
  });

  return (
    <ApolloProvider client={client}>
      <UserProvider>
        <OpenProvider>
        <ThemeProvider theme={theme}>
          <div className="flex-column justify-flex-start min-100-vh">
            {path === "welcome" && ( <WelcomeNav setPath={setPath} />)}
            {path === "home" && ( <HomeNav setPath={setPath}  />)}
            <div className="container">
              <Outlet />
            </div>
            {/* <Footer /> */}
          </div>
        </ThemeProvider>
        </OpenProvider>
      </UserProvider>
    </ApolloProvider>
  );
}

export default App;
