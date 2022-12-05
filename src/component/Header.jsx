import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import HomeIcon from "@mui/icons-material/Home";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import Badge from "@mui/material/Badge";
import Stack from "@mui/material/Stack";
import Fab from "@mui/material/Fab";
import AddIcon from "@mui/icons-material/Add";
import Button from "@mui/material/Button";

function Header({ text, user, swagOrders, handleClickOpenAddSwagDialog }) {
  const { pathname } = useLocation();
  const navigate = useNavigate();

  return (
    <Stack direction="row" justifyContent="space-between" alignItems="center">
      <h1>{text}</h1>
      {pathname !== "/login" && pathname !== "/sign-up" && (
        <Stack direction="row" spacing={1} alignItems="center">
          <Button variant="text" onClick={() => navigate("/my-order")}>
            Hello {user?.username}
          </Button>

          {pathname !== "/" && (
            <HomeIcon className="clickable" onClick={() => navigate("/")} />
          )}

          <Badge
            badgeContent={Object.keys(swagOrders).length}
            color="secondary"
            onClick={() => navigate("/my-cart")}
          >
            <ShoppingCartIcon className="clickable" />
          </Badge>

          {user?.role === "admin" && (
            <Fab size="small" color="secondary">
              <AddIcon
                fontSize="small"
                onClick={handleClickOpenAddSwagDialog}
              />
            </Fab>
          )}
        </Stack>
      )}
    </Stack>
  );
}

export default Header;
