import { ApolloProvider, useQuery } from '@apollo/react-hooks';
import ApolloClient, { gql } from 'apollo-boost';
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

const ALL_USERS_QUERY = gql`
  query {
    allUsers {
      email
      name
      role
    }
  }
`;

const App = () => {
  const { loading, error, data } = useQuery(ALL_USERS_QUERY);

  if (loading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>Error: {JSON.stringify(error)}</p>;
  }

  return (
    <BrowserRouter>
      <Switch>
        <Route exact path="/" render={(props) => (<Users {...props} data={data} client={client} />)}></Route>
        <Route exact path="/edit-user" render={(props) => (<EditUser {...props} data={data} client={client} />)}></Route>
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
