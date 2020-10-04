/**
 * UsersTable component
 * A table of user data
 */

import React from 'react';
import Row from './Row.jsx';

const UsersTable = (props) => {

  return (
    <>
    <table>
      <thead>
        <tr>
          <th></th>
          <th>Email</th>
          <th>Name</th>
          <th>Role</th>
        </tr>
      </thead>
      <tbody>
        {props.users.map((user, userIndex) => {
          return (<Row key={userIndex} user={user} />);
        })}
      </tbody>
    </table>
    </>
  );
}

export default UsersTable;
