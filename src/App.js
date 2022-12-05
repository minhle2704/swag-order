import React, { useState, useEffect } from "react";
import { Route, Routes, useNavigate, useLocation } from "react-router-dom";
import Container from "@mui/material/Container";

import MyCart from "./component/SwagManagement/MyCart";
import CheckOut from "./component/SwagManagement/CheckOut";
import Header from "./component/Header";
import SwagCardContainer from "./component/SwagManagement/SwagCardContainer";
import SwagDialog from "./component/SwagManagement/SwagDialog";
import Login from "./component/UserManagement/Login";
import MyOrder from "./component/UserManagement/MyOrder";
import SignUp from "./component/UserManagement/SignUp";

function App() {
  const [user, setUser] = useState(null);
  const [swagData, setSwagData] = useState([]);
  const [swagOrders, setSwagOrders] = useState({});
  const [shouldOpenAddSwagDialog, setShouldOpenAddSwagDialog] = useState(false);
  const [orderData, setOrderData] = useState([]);

  const { pathname } = useLocation();

  const navigate = useNavigate();

  useEffect(() => {
    if (!user && pathname !== "/sign-up") {
      navigate("/login");
    }
  }, []);

  useEffect(() => {
    if (user) {
      fetchSwagData();
    }
  }, [user]);

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
      <Header
        text="Swag Shop Order"
        user={user}
        swagOrders={swagOrders}
        handleClickOpenAddSwagDialog={handleClickOpenAddSwagDialog}
      />

      <Routes>
        <Route path="/login" element={<Login setUser={setUser} />}></Route>
        <Route path="/sign-up" element={<SignUp setUser={setUser} />}></Route>
        <Route
          path="/"
          element={
            <SwagCardContainer
              user={user}
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
              user={user}
              swagOrders={swagOrders}
              clearSwagOrders={clearSwagOrders}
              setSwagData={setSwagData}
            />
          }
        ></Route>

        <Route
          path="/my-order"
          element={
            <MyOrder
              user={user}
              swagOrders={swagOrders}
              orderData={orderData}
              setOrderData={setOrderData}
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
