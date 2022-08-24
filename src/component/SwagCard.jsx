import React, { useEffect, useState } from "react";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";

function SwagCard({ swag, orderQuantity, updateSwagOrders }) {
  const [quantity, setQuantity] = useState("");

  useEffect(() => {
    setQuantity(orderQuantity);
  }, [orderQuantity]);

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
  const message =
    quantity > swag.quantity ? "Please reduce your oder quantity!" : "";

  return (
    <>
      <div>This is {swag.name}</div>
      <div>This is a picture</div>
      <div>Quantity: {swag.quantity}</div>
      <TextField
        label="Enter your order quantity"
        value={quantity}
        onChange={(event) => handleQuantityChange(event.target.value)}
        variant="standard"
      />
      <Button variant="outlined" onClick={handleClick} disabled={btnDisabled}>
        Add to Order
      </Button>
      <div className="message">{message}</div>
    </>
  );
}

export default SwagCard;
