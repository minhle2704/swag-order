import React, { useState } from "react";
import Button from "@mui/material/Button";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";
import FormControl from "@mui/material/FormControl";
import Stack from "@mui/material/Stack";

function SwagCard({ swag, orderQuantity, updateSwagOrders }) {
  const [quantity, setQuantity] = useState(orderQuantity || "");

  const handleQuantityChange = (input) => {
    if (input === "") {
      setQuantity(input);
      return;
    }

    const quantity = parseInt(input);

    if (isNaN(quantity)) {
      return;
    }

    setQuantity(quantity);
  };

  const handleClick = () => {
    updateSwagOrders(swag, quantity);
  };

  const btnDisabled =
    quantity === "" || quantity === 0 || quantity > swag.quantity;

  return (
    <Stack spacing={1}>
      <img className="swag-card-width" src={swag.image} height="250" />
      <div>{swag.name}</div>
      <div>Stock: {swag.quantity}</div>
      <Stack
        className="swag-card-width"
        direction="row"
        justifyContent="space-between"
      >
        <FormControl sx={{ minWidth: 120 }} size="small">
          <InputLabel id="quantity-label">Quantity</InputLabel>
          <Select
            labelId="quantity-label"
            value={quantity}
            label="Quantity"
            onChange={(event) => handleQuantityChange(event.target.value)}
          >
            {[...Array(Math.min(30, swag.quantity)).keys()]
              .map((x) => x + 1)
              .map((num) => (
                <MenuItem key={num} value={num}>
                  {num}
                </MenuItem>
              ))}
          </Select>
        </FormControl>

        <Button variant="outlined" onClick={handleClick} disabled={btnDisabled}>
          Add to Order
        </Button>
      </Stack>
    </Stack>
  );
}

export default SwagCard;
