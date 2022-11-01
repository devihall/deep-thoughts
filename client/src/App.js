import React from 'react';
import {
  ApolloProvider,// special type of React component that provides data to all of the other components.
  ApolloClient,// constructor function that will help initialize connection to the GraphQL API server.
  InMemoryCache,// enables the Apollo Client instance to cache API response data so that we can perform requests more efficiently.
  createHttpLink,// allows us to control how the Apollo Client makes a request. Think of it like middleware for the outbound network requests.
} from "@apollo/client";



import Header from './components/Header';
import Footer from './components/Footer';

import Home from './pages/Home';

// establish a new link to the GraphQL server at its /graphql endpoint 
const httpLink = createHttpLink({
  uri: "http://localhost:3001/graphql",
});

// constructor to instantiate the Apollo Client instance and create the connection to the API endpoint.
const client = new ApolloClient({
  link: httpLink,
  cache: new InMemoryCache(),// new cache object using new InMemoryCache()
});



function App() {
  return (
    // passing the client variable in as the value for the client prop----everything between the JSX tags will have access to the server's API data through the client
    <ApolloProvider client={client}>
      <div className="flex-column justify-flex-start min-100-vh">
        <Header />
        <div className="container">
          <Home />
        </div>
        <Footer />
      </div>
    </ApolloProvider>
  );
}

export default App;
