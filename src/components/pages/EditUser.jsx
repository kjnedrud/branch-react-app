/**
 * EditUser page
 */

import { useQuery, useMutation } from '@apollo/react-hooks';
import { gql } from 'apollo-boost';
import React, { useState } from 'react';
import { useHistory } from 'react-router'

const EditUser = (props) => {

  // get email from query string
  const email = new URLSearchParams(props.location.search).get('email');

  // load user by email
  const GET_USER_QUERY = gql`
    query {
      user(email: "${email}") {
        email
        name
        role
      }
    }
  `;
  const {loading, error, data} = useQuery(GET_USER_QUERY);

  // update user
  const UPDATE_USER_MUTATION = gql`
    mutation updateUser($email: ID!, $newAttributes: UserAttributesInput!) {
      updateUser(email: $email, newAttributes: $newAttributes) {
        email
        name
        role
      }
    }
  `;
  const [saveUser] = useMutation(UPDATE_USER_MUTATION);

  // keep track of user state
  const [userState, setUserState] = useState(null);

  const history = useHistory();

  if (loading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>Error: {JSON.stringify(error)}</p>;
  }

  const roles = [
    {
      key: 'ADMIN',
      label: 'Admin',
    },
    {
      key: 'DEVELOPER',
      label: 'Developer',
    },
    {
      key: 'APP_MANAGER',
      label: 'App Manager',
    },
    {
      key: 'MARKETING',
      label: 'Marketing',
    },
    {
      key: 'SALES',
      label: 'Sales',
    },
  ];

  // update the user state when inputs change
  const changeInput = function(e) {
    let key = e.currentTarget.getAttribute('name');
    let val = e.currentTarget.value
    let newState = {
      name: userState ? userState.name : data.user.name,
      role: userState ? userState.role : data.user.role,
    };
    newState[key] = val;
    setUserState(newState);
  }

  // send request to save user
  const submitForm = function(e) {
    e.preventDefault();
    if (userState) {
      saveUser({
        variables: {
          email: email,
          newAttributes: userState,
        },
      }).then(response => {
        // go back to Users page
        history.push('/');
      });
    }
  }

  return (
    <form className="edit-user-form" onSubmit={submitForm}>
      <section className="container">
        <header>
          <h1>{data.user.email}</h1>
          <button type="submit">Save</button>
        </header>

        <div className="form-content">
          <div className="form-column">
            <label htmlFor="name-field">Name</label>
            <input id="name-field" type="text" name="name" defaultValue={data.user.name} onChange={changeInput} />
          </div>

          <div className="form-column">
            <label>Role</label>
            {roles.map((role, roleIndex) => {
              return (
                <div className="radio-choice" key={roleIndex}>
                  <input id={`role-field-${role.key}`} type="radio" name="role" value={role.key} defaultChecked={role.key === data.user.role} onChange={changeInput} />
                  <label htmlFor={`role-field-${role.key}`}>{role.label}</label>
                </div>
              );
            })}
          </div>
        </div>
      </section>
    </form>
  );
};

export default EditUser;
