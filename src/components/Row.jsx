/**
 * Row component
 * A single row in a table
 */

import React from 'react';
import { Link } from 'react-router-dom';

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
        <Link to={`/edit-user?email=${props.user.email}`}>
          {props.user.email}
        </Link>
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
