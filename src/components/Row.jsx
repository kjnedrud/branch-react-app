/**
 * Row component
 * A single row in a table
 */

import React from 'react';
import { Link } from 'react-router-dom';

const Row = (props) => {

  const checkboxChange = function(e) {
    props.onCheckboxChange(props.user.email, e.currentTarget.checked);
  }

  return (
    <tr>
      <td>
        <input type="checkbox" onChange={checkboxChange} />
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
