import React, { useState } from "react";
import { Route, Routes, useLocation, useNavigate } from "react-router-dom";
import HomeIcon from "@mui/icons-material/Home";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import Badge from "@mui/material/Badge";
import Stack from "@mui/material/Stack";
import Container from "@mui/material/Container";

import MyCart from "./component/MyCart";
import CheckOut from "./component/CheckOut";
import Header from "./component/Header";
import SwagCardContainer from "./component/SwagCardContainer";
import originalSwagData from "./data/swagData";

function App() {
  const [swagData, setSwagData] = useState(originalSwagData);
  const [swagOrders, setSwagOrders] = useState({});

  const navigate = useNavigate();

  const { pathname } = useLocation();

  const updateSwagOrders = (swag, quantity) => {
    const { id, name } = swag;
    if (swagOrders[id]) {
      setSwagOrders({ ...swagOrders, [id]: { ...swagOrders[id], quantity } });
    } else {
      setSwagOrders({ ...swagOrders, [id]: { id, name, quantity } });
    }
  };

  const updateSwagData = () => {
    setSwagData(
      swagData.map((swag) => {
        if (swagOrders[swag.id]) {
          return {
            ...swag,
            quantity: swag.quantity - swagOrders[swag.id].quantity,
          };
        }
        return swag;
      })
    );
  };

  const clearSwagOrders = () => setSwagOrders({});

  const decreaseSwagOrder = (id) => {
    setSwagOrders({
      ...swagOrders,
      [id]: { ...swagOrders[id], quantity: swagOrders[id].quantity - 1 },
    });
  };

  const increaseSwagOrder = (id) => {
    setSwagOrders({
      ...swagOrders,
      [id]: { ...swagOrders[id], quantity: swagOrders[id].quantity + 1 },
    });
  };

  const removeSwagOrder = (id) => {
    const newSwagOrders = { ...swagOrders };
    delete newSwagOrders[id];
    setSwagOrders(newSwagOrders);
  };

  return (
    <Container>
      <Stack direction="row" justifyContent="space-between" alignItems="center">
        <Header text="Swag Order Shop" />
        <Stack direction="row" spacing={1} alignItems="center">
          {pathname !== "/" && (
            <HomeIcon className="clickable" onClick={() => navigate("/")} />
          )}
          <Badge
            badgeContent={Object.keys(swagOrders).length}
            color="primary"
            onClick={() => navigate("/my-cart")}
          >
            <ShoppingCartIcon className="clickable" />
          </Badge>
        </Stack>
      </Stack>

      <Routes>
        <Route
          path="/"
          element={
            <SwagCardContainer
              swagData={swagData}
              swagOrders={swagOrders}
              updateSwagOrders={updateSwagOrders}
            />
          }
        ></Route>

        <Route
          path="/my-cart"
          element={
            <MyCart
              swagOrders={swagOrders}
              decreaseSwagOrder={decreaseSwagOrder}
              increaseSwagOrder={increaseSwagOrder}
              removeSwagOrder={removeSwagOrder}
            />
          }
        ></Route>

        <Route
          path="/check-out"
          element={
            <CheckOut
              clearSwagOrders={clearSwagOrders}
              updateSwagData={updateSwagData}
            />
          }
        ></Route>
      </Routes>
    </Container>
  );
}

export default App;
