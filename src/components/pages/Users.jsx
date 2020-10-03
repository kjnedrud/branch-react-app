import React from 'react';

import UsersTable from '../UsersTable.jsx';

const Users = (props) => {

  return (
    <section className="container">
      <header>
        <h1>Users</h1>
        <button className="danger" disabled>Delete</button>
      </header>
      <UsersTable users={props.data.allUsers} />
      <pre>
        <code>
          {JSON.stringify(props.data, null, 2)}
        </code>
      </pre>
    </section>
  )
}

export default Users;
