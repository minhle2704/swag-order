import React from "react";
import Grid from "@mui/material/Unstable_Grid2";

import SwagCard from "./SwagCard";

function SwagCardContainer({
  swagData,
  swagOrders,
  setSwagData,
  updateSwagOrders,
}) {
  return (
    <Grid container spacing={2}>
      {swagData.map((swag) => (
        <Grid key={swag.id} xs={4}>
          <SwagCard
            swag={swag}
            swagData={swagData}
            orderQuantity={swagOrders[swag.id]?.quantity}
            setSwagData={setSwagData}
            updateSwagOrders={updateSwagOrders}
          />
        </Grid>
      ))}
    </Grid>
  );
}

export default SwagCardContainer;
