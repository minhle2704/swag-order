import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import TextField from "@mui/material/TextField";
import Stack from "@mui/material/Stack";
import Button from "@mui/material/Button";
import Alert from "@mui/material/Alert";
import InputAdornment from "@mui/material/InputAdornment";
import IconButton from "@mui/material/IconButton";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import Link from "@mui/material/Link";

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

        <TextField
          color="secondary"
          label="Password"
          variant="standard"
          type={shouldShowPassword ? "text" : "password"}
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <IconButton onClick={handleClickShowPassword}>
                  {shouldShowPassword ? <Visibility /> : <VisibilityOff />}
                </IconButton>
              </InputAdornment>
            ),
          }}
          value={password}
          onChange={(event) => setPassword(event.target.value)}
        />
      </Stack>

      <Button
        disabled={!username || !password}
        color="secondary"
        variant="outlined"
        onClick={handleUserLogin}
      >
        Submit
      </Button>
      <div>
        Don't have an account?{" "}
        <Link
          href="/sign-up"
          onClick={(event) => {
            event.preventDefault();
            navigate("/sign-up");
          }}
          underline="hover"
        >
          Sign Up
        </Link>
      </div>

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
