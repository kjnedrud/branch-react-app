import { ApolloProvider } from '@apollo/react-hooks';
import ApolloClient from 'apollo-boost';
import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import env from './env';

import Users from './components/pages/Users.jsx';
import EditUser from './components/pages/EditUser.jsx';

const client = new ApolloClient({
  uri: env.GRAPHQL_ENDPOINT,
  request: operation => {
    operation.setContext({
      headers: {
        'x-api-key': env.GRAPHQL_API_KEY,
      }
    })
  }
});

const App = () => {

  return (
    <BrowserRouter forceRefresh={true}>
      <Switch>
        <Route exact path="/" component={Users} />
        <Route exact path="/edit-user" component={EditUser} />
      </Switch>
    </BrowserRouter>
  )
}

const Root = () => (
  <ApolloProvider client={client}>
    <App />
  </ApolloProvider>
);

ReactDOM.render(<Root />, document.getElementById('root'));
