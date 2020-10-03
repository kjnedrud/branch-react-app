/**
 * EditUser component
 * Form to edit user details
 */

import React, {useState} from 'react';

const UserForm = (props) => {

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
    <section className="container">
      <header>
        <h1>{props.user.email}</h1>
        <button type="submit">Save</button>
      </header>

      <div className="form-content">
        <div className="form-column">
          <label htmlFor="name-field">Name</label>
          <input id="name-field" type="text" name="name" value={userState.name} onChange={inputChange} />
        </div>

        <div className="form-column">
          <label>Role</label>
          {roles.map((role, roleIndex) => {
            return (
              <div className="radio-choice" key={roleIndex}>
                <input id={`role-field-${role.key}`} type="radio" name="role" value={role.key} checked={role.key == userState.role} onChange={inputChange} />
                <label htmlFor={`role-field-${role.key}`}>{role.label}</label>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  </form>);
};

export default UserForm;
