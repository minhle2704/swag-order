import React from "react";
import TextField from "@mui/material/TextField";
import Stack from "@mui/material/Stack";

export default function CheckOut() {
  return (
    <Stack direction="row" spacing={4}>
      <Stack direction="column" width="35ch">
        <TextField label="Name" variant="standard" />
        <TextField label="Phone Number" variant="standard" />
        <TextField label="Email Address" variant="standard" />
        <TextField label="Deliver Address" variant="standard" />
        <TextField label="To be received by (DDMMYYYY)" variant="standard" />
      </Stack>

      <Stack direction="column" width="25ch">
        <>Placeholder</>
      </Stack>
    </Stack>
  );
}
