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

function SignUp({ setUser, saveUserToLocalStorage }) {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const [shouldShowPassword, setShouldShowPassword] = useState(false);
  const [signUpError, setSignUpError] = useState(null);

  const navigate = useNavigate();

  const handleClickShowPassword = () => {
    setShouldShowPassword(!shouldShowPassword);
  };

  const handleUserSignUp = async () => {
    const payload = {
      firstName,
      lastName,
      email,
      username,
      password,
    };

    const response = await fetch("http://localhost:5000/sign-up", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    });

    if (response.ok) {
      const { firstName, lastName, username, role, id, email } =
        await response.json();
      const user = { firstName, lastName, username, role, id, email };
      setUser(user);
      saveUserToLocalStorage(user);
      navigate("/");
    } else {
      const error = await response.text();
      setSignUpError(error);
    }
  };

  const isPasswordMatch = password === confirmPassword;
  const passwordHelperText = isPasswordMatch ? "" : "Password does not match";

  const isEmailAddressValid =
    !email || !!email.match(/^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-]+$/);
  const emailAddressHelperText = isEmailAddressValid
    ? ""
    : "Example: example@mail.com";

  return (
    <Stack spacing={3} width="35ch">
      <Stack spacing={1}>
        <TextField
          color="secondary"
          label="First Name"
          variant="standard"
          value={firstName}
          onChange={(event) => setFirstName(event.target.value)}
        />

        <TextField
          color="secondary"
          label="Last Name"
          variant="standard"
          value={lastName}
          onChange={(event) => setLastName(event.target.value)}
        />

        <TextField
          color="secondary"
          label="Email Address"
          variant="standard"
          value={email}
          onChange={(event) => setEmail(event.target.value)}
          error={!isEmailAddressValid}
          helperText={emailAddressHelperText}
        />

        <TextField
          color="secondary"
          label="Username"
          variant="standard"
          value={username}
          onChange={(event) => setUsername(event.target.value)}
        />

        <TextField
          color="secondary"
          label="Create Password"
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

        <TextField
          color="secondary"
          label="Confirm Password"
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
          value={confirmPassword}
          onChange={(event) => setConfirmPassword(event.target.value)}
          error={!isPasswordMatch}
          helperText={passwordHelperText}
        />
      </Stack>

      <Button
        disabled={
          !username || !password || !email || password !== confirmPassword
        }
        color="secondary"
        variant="outlined"
        onClick={handleUserSignUp}
      >
        Create an Account
      </Button>

      <div>
        Already have an account?{" "}
        <Link
          href="/login"
          onClick={(event) => {
            event.preventDefault();
            navigate("/login");
          }}
          underline="hover"
        >
          Log In
        </Link>
      </div>

      {signUpError && <Alert severity="error">{signUpError}</Alert>}
    </Stack>
  );
}

export default SignUp;
