import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import ApolloClient from 'apollo-client';
import { HttpLink } from 'apollo-link-http';
import { setContext } from 'apollo-link-context';
import { InMemoryCache } from 'apollo-cache-inmemory';
import { ApolloProvider } from 'react-apollo';

import './index.css';
import App from './components/App';
import registerServiceWorker from './registerServiceWorker';

const authLink = setContext((_, { headers }) => {
  const token = localStorage.getItem('token');

  return {
    headers: {
      ...headers,
      Authorization: token ? `Bearer ${token}` : null
    }
  };
});

const client = new ApolloClient({
  link: authLink.concat(new HttpLink({ uri: '/graphql' })),
  cache: new InMemoryCache()
});

const Routes = props => (
  <ApolloProvider client={client}>
    <BrowserRouter {...props}>
      <App />
      {/* <Route path="*" component={NotFound} /> */}
    </BrowserRouter>
  </ApolloProvider>
);

ReactDOM.render(<Routes />, document.getElementById('root'));
registerServiceWorker();
