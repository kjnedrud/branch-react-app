/**
 * Row component
 * A single row in a table
 */

import React from 'react';

const Row = (props) => (
  <tr>
    <td>
      <input type="checkbox" />
    </td>
    <td>
      {props.user.email}
    </td>
    <td>
      {props.user.name}
    </td>
    <td>
      {props.user.role}
    </td>
  </tr>
);

// todo: pretty-print role - lowercase and replace spaces with underscores

export default Row;
