/**
 * UsersTable component
 * A table of user data
 */

import React, {useState} from 'react';
import Row from './Row.jsx';
import EditUser from './EditUser.jsx';

const UsersTable = (props) => {

  const [modalClass, setModalClass] = useState('modal-overlay');
  const [modalContent, setModalContent] = useState(null);

  // add content and show
  const openModal = function(content) {
    setModalContent(content);
    setModalClass('modal-overlay open');
  }

  // clear content and hide
  const closeModal = function() {
    setModalContent(null);
    setModalClass('modal-overlay')
  }

  // open modal with EditUser form
  const editUser = function(user) {
    openModal(<EditUser user={user} />);
  }

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
          return (<Row key={userIndex} user={user} onEdit={editUser} />);
        })}
      </tbody>
    </table>

    <div className={modalClass}>
      <div className="modal-content">
        {modalContent}
      </div>
    </div>

    </>
  );
}

export default UsersTable;
