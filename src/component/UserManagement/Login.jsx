import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import TextField from "@mui/material/TextField";
import Stack from "@mui/material/Stack";
import Button from "@mui/material/Button";
import Alert from "@mui/material/Alert";
import FormControl from "@mui/material/FormControl";
import Input from "@mui/material/Input";
import InputLabel from "@mui/material/InputLabel";
import InputAdornment from "@mui/material/InputAdornment";
import IconButton from "@mui/material/IconButton";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";

function Login({ setUser }) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [shouldShowPassword, setShouldShowPassword] = useState(false);
  const [hasLoginError, setHasLoginError] = useState(false);

  const handleClickShowPassword = () => {
    setShouldShowPassword(!shouldShowPassword);
  };

  const navigate = useNavigate();

  const handleUserLogin = async () => {
    const payload = {
      username,
      password,
    };

    const response = await fetch("http://localhost:5000/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    });

    if (response.ok) {
      const { role, id, orders } = await response.json();
      setUser({ username, role, id, orders });
      navigate("/");
    } else {
      setHasLoginError(true);
    }
  };

  return (
    <Stack width="25ch" spacing={2}>
      <Stack spacing={1}>
        <TextField
          color="secondary"
          label="Username"
          variant="standard"
          value={username}
          onChange={(event) => setUsername(event.target.value)}
        />

        <FormControl variant="standard">
          <InputLabel>Password</InputLabel>
          <Input
            type={shouldShowPassword ? "text" : "password"}
            endAdornment={
              <InputAdornment position="end">
                <IconButton onClick={handleClickShowPassword}>
                  {shouldShowPassword ? <Visibility /> : <VisibilityOff />}
                </IconButton>
              </InputAdornment>
            }
            value={password}
            onChange={(event) => setPassword(event.target.value)}
          />
        </FormControl>
      </Stack>

      <Button color="secondary" variant="outlined" onClick={handleUserLogin}>
        Submit
      </Button>

      {hasLoginError && (
        <Alert severity="error">
          You have provided a wrong username and password combination. Please
          try again!
        </Alert>
      )}
    </Stack>
  );
}

export default Login;
