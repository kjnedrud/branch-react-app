/**
 * EditUser page
 */

import React from 'react';

import UserForm from '../UserForm';

const EditUser = (props) => {

  const email = new URLSearchParams(props.location.search).get('email');
  const user = props.data.allUsers.filter(user => user.email == email)[0];

  return (
    <UserForm user={user} />
  );
};

export default EditUser;
