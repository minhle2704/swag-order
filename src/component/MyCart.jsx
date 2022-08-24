import React from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Button from "@mui/material/Button";
import Stack from "@mui/material/Stack";
import DeleteIcon from "@mui/icons-material/Delete";
import RemoveIcon from "@mui/icons-material/Remove";
import AddIcon from "@mui/icons-material/Add";
import { useNavigate } from "react-router-dom";

function MyCart({
  swagOrders,
  decreaseSwagOrder,
  increaseSwagOrder,
  removeSwagOrder,
}) {
  const navigate = useNavigate();

  const handleDecrease = (id, quantity) => {
    if (quantity > 1) {
      decreaseSwagOrder(id);
    } else {
      removeSwagOrder(id);
    }
  };

  return (
    <>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell align="left">Swag Name</TableCell>
            <TableCell align="left">Ordered Quantity</TableCell>
            <TableCell align="left"></TableCell>
          </TableRow>
        </TableHead>

        <TableBody>
          {Object.values(swagOrders).map((swagOrder) => (
            <TableRow
              key={swagOrder.id}
              sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
            >
              <TableCell align="left">{swagOrder.name}</TableCell>
              <TableCell align="left">
                <Stack direction="row" alignItems="center" spacing={3}>
                  <RemoveIcon
                    onClick={() =>
                      handleDecrease(swagOrder.id, swagOrder.quantity)
                    }
                  />
                  <div>{swagOrder.quantity}</div>
                  <AddIcon onClick={() => increaseSwagOrder(swagOrder.id)} />
                </Stack>
              </TableCell>
              <TableCell align="left">
                <DeleteIcon onClick={() => removeSwagOrder(swagOrder.id)} />
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>

      <Stack direction="row" justifyContent="right">
        <Button onClick={() => navigate("/check-out")}>Check out</Button>
      </Stack>
    </>
  );
}

export default MyCart;
