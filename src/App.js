import React, { useState, useEffect } from "react";
import { Route, Routes, useLocation, useNavigate } from "react-router-dom";
import HomeIcon from "@mui/icons-material/Home";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import Badge from "@mui/material/Badge";
import Stack from "@mui/material/Stack";
import Container from "@mui/material/Container";
import Fab from "@mui/material/Fab";
import AddIcon from "@mui/icons-material/Add";

import MyCart from "./component/MyCart";
import CheckOut from "./component/CheckOut";
import Header from "./component/Header";
import SwagCardContainer from "./component/SwagCardContainer";
import SwagDialog from "./component/SwagDialog";

function App() {
  const [swagData, setSwagData] = useState([]);
  const [swagOrders, setSwagOrders] = useState({});
  const [shouldOpenAddSwagDialog, setShouldOpenAddSwagDialog] = useState(false);

  useEffect(() => {
    fetchSwagData();
  }, []);

  const navigate = useNavigate();

  const { pathname } = useLocation();

  const handleClickOpenAddSwagDialog = () => {
    setShouldOpenAddSwagDialog(true);
  };

  const handleCloseAddSwagDialog = () => {
    setShouldOpenAddSwagDialog(false);
  };

  // Fetch swagData
  const fetchSwagData = async () => {
    const response = await fetch("http://localhost:5000/swags");
    const data = await response.json();

    setSwagData(data);
  };

  // Record customer order
  const updateSwagOrders = (swag, quantity) => {
    const { id, name } = swag;
    if (swagOrders[id]) {
      setSwagOrders({ ...swagOrders, [id]: { ...swagOrders[id], quantity } });
    } else {
      setSwagOrders({ ...swagOrders, [id]: { id, name, quantity } });
    }
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

          <Fab size="small" color="secondary">
            <AddIcon fontSize="small" onClick={handleClickOpenAddSwagDialog} />
          </Fab>
        </Stack>
      </Stack>

      <Routes>
        <Route
          path="/"
          element={
            <SwagCardContainer
              swagData={swagData}
              swagOrders={swagOrders}
              setSwagData={setSwagData}
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
              swagOrders={swagOrders}
              clearSwagOrders={clearSwagOrders}
              setSwagData={setSwagData}
            />
          }
        ></Route>
      </Routes>

      {shouldOpenAddSwagDialog && (
        <SwagDialog
          swagData={swagData}
          setSwagData={setSwagData}
          onClose={handleCloseAddSwagDialog}
        />
      )}
    </Container>
  );
}

export default App;
