import React from "react";
import Grid from "@mui/material/Unstable_Grid2";

import SwagCard from "./SwagCard";

function SwagCardContainer({ swagData, swagOrders, updateSwagOrders }) {
  return (
    <Grid container spacing={2}>
      {swagData.map((swag) => {
        return (
          <Grid key={swag.id} xs={4}>
            <SwagCard
              swag={swag}
              orderQuantity={swagOrders[swag.id]?.quantity}
              updateSwagOrders={updateSwagOrders}
            />
          </Grid>
        );
      })}
    </Grid>
  );
}

export default SwagCardContainer;