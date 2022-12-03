import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import TextField from "@mui/material/TextField";
import Stack from "@mui/material/Stack";
import Button from "@mui/material/Button";
import Alert from "@mui/material/Alert";

function Login({ setUser }) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loginError, setLoginError] = useState(false);

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
      setLoginError(true);
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
          value={password}
          onChange={(event) => setPassword(event.target.value)}
        />
      </Stack>

      <Button color="secondary" variant="outlined" onClick={handleUserLogin}>
        Submit
      </Button>

      {loginError && (
        <Alert severity="error">
          You have provided a wrong username and password combination. Please
          try again!
        </Alert>
      )}
    </Stack>
  );
}

export default Login;
