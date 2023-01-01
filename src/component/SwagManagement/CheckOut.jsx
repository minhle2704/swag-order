import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import TextField from "@mui/material/TextField";
import Stack from "@mui/material/Stack";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";

function CheckOut({ user, swagOrders, clearSwagOrders, setSwagData }) {
  const [name, setName] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [deliveryAddress, setDeliveryAddress] = useState("");
  const [date, setDate] = useState(null);
  const [shouldOpenConfirmOrderDialog, setShouldOpenConfirmOrderDialog] =
    useState(false);

  const navigate = useNavigate();

  const handleClickOpenConfirmOrderDialog = () => {
    setShouldOpenConfirmOrderDialog(true);
  };

  const handleCloseConfirmOrderDialog = () => {
    setShouldOpenConfirmOrderDialog(false);
    clearSwagOrders();
    updateSwagData();
    navigate("/");
  };

  // Update swag data after customer order
  const updateSwagData = async () => {
    const payload = {
      userId: user.id,
      swagOrders: swagOrders,
      deliveryAddress,
      phoneNumber,
      date,
    };

    const response = await fetch("http://localhost:5000/commit-order", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    });

    const data = await response.json();

    setSwagData(data);
  };

  return (
    <Stack spacing={4} width="50ch">
      <Stack spacing={1} width="50ch">
        <TextField
          color="secondary"
          label="Name"
          variant="standard"
          value={name}
          onChange={(event) => setName(event.target.value)}
        />
        <TextField
          color="secondary"
          label="Phone Number"
          variant="standard"
          value={phoneNumber}
          onChange={(event) => setPhoneNumber(event.target.value)}
        />

        <TextField
          color="secondary"
          label="Deliver Address"
          variant="standard"
          value={deliveryAddress}
          onChange={(event) => setDeliveryAddress(event.target.value)}
        />
      </Stack>

      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <DatePicker
          color="secondary"
          label="Delivery Date"
          value={date}
          onChange={(date) => {
            setDate(date);
          }}
          renderInput={(params) => <TextField {...params} />}
        />
      </LocalizationProvider>

      <Button
        color="secondary"
        variant="outlined"
        onClick={handleClickOpenConfirmOrderDialog}
      >
        Confirm Order
      </Button>

      <Dialog
        open={shouldOpenConfirmOrderDialog}
        onClose={handleCloseConfirmOrderDialog}
      >
        <DialogContent>
          <DialogContentText>
            Thanks for ordering swags. We will ship them soon!
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseConfirmOrderDialog} autoFocus>
            OK
          </Button>
        </DialogActions>
      </Dialog>
    </Stack>
  );
}

export default CheckOut;
