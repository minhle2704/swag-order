import React, { useEffect } from "react";
import Stack from "@mui/material/Stack";

import OrderTile from "./OrderTile";

function MyOrder({ user, orderData, setOrderData }) {
  // Fetch orderData
  useEffect(() => {
    if (user) {
      fetchOrderData();
    }
  }, [user]);

  const fetchOrderData = async () => {
    const payload = { userId: user.id };

    const response = await fetch("http://localhost:5000/my-order", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    });

    const data = await response.json();
    setOrderData(data.orders);
  };

  return (
    <>
      <h3>My Order</h3>
      <Stack spacing={1}>
        {orderData.map((order) => (
          <OrderTile key={Object.keys(order)[0]} order={order} />
        ))}
      </Stack>
    </>
  );
}

export default MyOrder;
