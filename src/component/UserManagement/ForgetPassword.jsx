import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

import Stack from "@mui/material/Stack";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";

import { isEmailValid } from "../../helpers";

function ForgetPassword() {
  const [email, setEmail] = useState("");
  const [shouldOpenConfirmOrderDialog, setShouldOpenConfirmOrderDialog] =
    useState(false);

  const navigate = useNavigate();

  const handleCloseConfirmOrderDialog = () => {
    setShouldOpenConfirmOrderDialog(false);
    navigate("/reset-password");
  };

  const handleGenerateTemporaryPassword = async () => {
    const payload = {
      email,
    };

    const response = await fetch("http://localhost:5000/forget-password", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    });

    if (response.ok) {
      setShouldOpenConfirmOrderDialog(true);
    } else {
      console.log("Please contact an administrator");
    }
  };

  const isEmailAddressValid = isEmailValid(email);
  const emailAddressHelperText = isEmailAddressValid
    ? ""
    : "Example: example@mail.com";

  return (
    <Stack spacing={3} width="35ch">
      <TextField
        color="secondary"
        label="Email"
        variant="standard"
        value={email}
        onChange={(event) => setEmail(event.target.value)}
        error={!isEmailAddressValid}
        helperText={emailAddressHelperText}
      />

      <Button
        disabled={!isEmailAddressValid}
        color="secondary"
        variant="outlined"
        onClick={handleGenerateTemporaryPassword}
      >
        Send me a temporary password
      </Button>

      <Dialog
        open={shouldOpenConfirmOrderDialog}
        onClose={handleCloseConfirmOrderDialog}
      >
        <DialogContent>
          <DialogContentText>
            We have sent a temporary password to {email}. Please check your
            mailbox and follow the instruction to reset your password.
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

export default ForgetPassword;
