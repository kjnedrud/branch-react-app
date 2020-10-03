/**
 * Row component
 * A single row in a table
 */

import React from 'react';

const Row = (props) => {

  const editUserModal = function(e) {
    props.onEdit(props.user);
  }

  return (
    <tr>
      <td>
        <input type="checkbox" />
      </td>
      <td>
        <button type="button" className="plain" title="Edit User" onClick={editUserModal}>{props.user.email}</button>
      </td>
      <td>
        {props.user.name}
      </td>
      <td>
        {props.user.role}
      </td>
    </tr>
  );
};

// todo: pretty-print role - lowercase and replace spaces with underscores

export default Row;
