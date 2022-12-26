import React from "react";

import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableRow from "@mui/material/TableRow";
import { USER_PROP_STRINGS } from "../../constants";

function MyProfile({ user }) {
  return (
    <Table>
      <TableBody>
        {Object.entries(user)
          .filter(([key]) => USER_PROP_STRINGS[key])
          .map(([key, val]) => (
            <TableRow key={key}>
              <TableCell>{USER_PROP_STRINGS[key]}</TableCell>
              <TableCell align="left">{val}</TableCell>
            </TableRow>
          ))}
      </TableBody>
    </Table>
  );
}

export default MyProfile;
