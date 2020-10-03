/**
 * EditUser component
 * Form to edit user details
 */

import React, {useState} from 'react';

const Row = (props) => {

  const [userState, setUserState] = useState(props.user);

  // event handler for form input change
  const inputChange = function(e) {
    let key = e.currentTarget.getAttribute('name');
    let val = e.currentTarget.value
    let newState = Object.assign({}, userState);
    newState[key] = val;
    setUserState(newState);
  }

  let roles = [
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

  return (<form className="edit-user-form">
    <div class="container">
      <header>
        <h1>{props.user.email}</h1>
        <button type="submit">Save</button>
      </header>

      <div class="form-content">
        <div className="form-column">
          <label for="name-field">Name</label>
          <input id="name-field" type="text" name="name" value={userState.name} onChange={inputChange} />
        </div>

        <div className="form-column">
          <label>Role</label>
          {roles.map((role, roleIndex) => {
            return (
              <div className="radio-choice">
                <input id={`role-field-${role.key}`} type="radio" name="role" value={role.key} checked={role.key == userState.role} onChange={inputChange} />
                <label for={`role-field-${role.key}`}>{role.label}</label>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  </form>);
};

export default Row;
