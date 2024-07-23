import {
  ApolloClient,
  InMemoryCache,
  ApolloProvider,
  createHttpLink,
} from '@apollo/client';
import { setContext } from '@apollo/client/link/context';
import { Outlet } from 'react-router-dom';
import { UserProvider } from '../src/utils/contexts';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import useMediaQuery from '@mui/material/useMediaQuery';

// Construct main GraphQL API endpoint
const httpLink = createHttpLink({
  uri: '/graphql',
});




// Construct request middleware that will attach the JWT token to every request as an `authorization` header
const authLink = setContext((_, { headers }) => {
  // get the authentication token from local storage if it exists
  const token = localStorage.getItem('id_token');
  // return the headers to the context so httpLink can read them
  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : '',
    },
  };
});

// Set up our client to execute the `authLink` middleware prior to making the request to our GraphQL API
const client = new ApolloClient({
  link: authLink.concat(httpLink),
  cache: new InMemoryCache(),
});

function App() {
  const prefersDarkMode = useMediaQuery('(prefers-color-scheme: light)');

  const theme = createTheme({
    palette: {
      mode: prefersDarkMode ? 'dark' : 'light',
      primary: {
        main: '#f3f4f9',
        contrastText: '#000',
        light: '#06866e'
      },
      secondary: {
        main: '#101010',
                contrastText: '#fff'
      },
      light: {
        main: '#f3f4f9'
      }
    },
    typography: {
      fontFamily: "Figtree, sans-serif",
    }
  });

  return (
    <ApolloProvider client={client}>
      <UserProvider>
        <ThemeProvider theme={theme}>
      <div className="flex-column justify-flex-start min-100-vh">
        {/* <Header /> */}
        <div className="container">
          <Outlet />
        </div>
        {/* <Footer /> */}
      </div>
      </ThemeProvider>
      </UserProvider>
    </ApolloProvider>

  );
}

export default App;
