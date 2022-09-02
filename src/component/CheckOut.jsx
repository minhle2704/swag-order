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

export default function CheckOut({ clearSwagOrders, updateSwagData }) {
  const [name, setName] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [emailAddress, setEmailAddress] = useState("");
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

  const isEmailAddressValid =
    !emailAddress ||
    !!emailAddress.match(/^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-]+$/);

  const emailAddressHelperText = isEmailAddressValid
    ? ""
    : "Example: example@mail.com";

  return (
    <Stack spacing={4} width="50ch">
      <Stack spacing={1} width="50ch">
        <TextField
          label="Name"
          variant="standard"
          value={name}
          onChange={(event) => setName(event.target.value)}
        />
        <TextField
          label="Phone Number"
          variant="standard"
          value={phoneNumber}
          onChange={(event) => setPhoneNumber(event.target.value)}
        />
        <TextField
          label="Email Address"
          variant="standard"
          value={emailAddress}
          onChange={(event) => setEmailAddress(event.target.value)}
          error={!isEmailAddressValid}
          helperText={emailAddressHelperText}
        />
        <TextField
          label="Deliver Address"
          variant="standard"
          value={deliveryAddress}
          onChange={(event) => setDeliveryAddress(event.target.value)}
        />
      </Stack>

      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <DatePicker
          label="Delivery Date"
          value={date}
          onChange={(date) => {
            setDate(date);
          }}
          renderInput={(params) => <TextField {...params} />}
        />
      </LocalizationProvider>

      <Button variant="outlined" onClick={handleClickOpenConfirmOrderDialog}>
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
