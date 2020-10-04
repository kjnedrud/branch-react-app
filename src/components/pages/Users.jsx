import { useQuery, useMutation } from '@apollo/react-hooks';
import { gql } from 'apollo-boost';
import React, { useState } from 'react';

import Row from '../Row.jsx';

const Users = (props) => {

  // load users
  const ALL_USERS_QUERY = gql`
    query {
      allUsers {
        email
        name
        role
      }
    }
  `;
  let { loading, error, data, refetch } = useQuery(ALL_USERS_QUERY);

  // delete users
  const DELETE_USERS_MUTATION = gql`
    mutation deleteUsers($emails: [ID]!) {
      deleteUsers(emails: $emails)
    }
  `;
  const [deleteUsers] = useMutation(DELETE_USERS_MUTATION);

  // reset users
  const RESET_USERS_MUTATION = gql`
    mutation resetUsers {
      resetUsers
    }
  `;
  const [resetUsers] = useMutation(RESET_USERS_MUTATION);

  // keep track of checked state
  const [checkedRows, updateCheckedRows] = useState([]);

  // update checked rows when they are checked/unchecked
  const handleCheckboxes = function(email, checked) {

    let newCheckedRows = [...checkedRows];

    if (checked) {
      // add to checked rows
      newCheckedRows.push(email);
    } else {
      // remove from checked rows
      newCheckedRows = newCheckedRows.filter(row => row !== email);
    }

    updateCheckedRows(newCheckedRows);
  }

  // delete button click event handler
  const deleteButton = function(e) {
    if (checkedRows.length) {
      deleteUsers({
        variables: {
          emails: checkedRows,
        },
      }).then(response => {
        // make sure rows get unchecked
        updateCheckedRows([]);
        // refresh page
        refetch();
      });
    }
  }

  const resetClick = function(e) {
    resetUsers().then(response => {
        // refresh page
      refetch();
    });
  }

  if (loading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>Error: {JSON.stringify(error)}</p>;
  }

  return (
    <section className="container">
      <header>
        <h1>Users</h1>
        <button className="danger" onClick={deleteButton} disabled={!checkedRows.length}>Delete</button>
      </header>
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
          {data.allUsers.map((user) => {
            return (<Row key={user.email} user={user} onCheckboxChange={handleCheckboxes} />);
          })}
        </tbody>
      </table>
      <p>
        <button type="button" onClick={resetClick}>Reset</button>
      </p>
    </section>

  )
}

export default Users;
