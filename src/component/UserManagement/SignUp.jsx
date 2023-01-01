import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import TextField from "@mui/material/TextField";
import Stack from "@mui/material/Stack";
import Button from "@mui/material/Button";
import Alert from "@mui/material/Alert";
import Link from "@mui/material/Link";
import CreatePassword from "./CreatePassword";

import { isEmailValid } from "../../helpers";

function SignUp({ setUser, saveUserToLocalStorage }) {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [createPassword, setCreatePassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [signUpError, setSignUpError] = useState(null);

  const navigate = useNavigate();

  const handleUserSignUp = async () => {
    const payload = {
      firstName,
      lastName,
      email,
      username,
      password: createPassword,
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

  const isEmailAddressValid = isEmailValid(email);

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

        <CreatePassword
          createPassword={createPassword}
          setCreatePassword={setCreatePassword}
          confirmPassword={confirmPassword}
          setConfirmPassword={setConfirmPassword}
        />
      </Stack>

      <Button
        disabled={
          !username ||
          !createPassword ||
          !email ||
          createPassword !== confirmPassword
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

      <div>
        Forget your password?{" "}
        <Link
          href="/sign-up"
          onClick={(event) => {
            event.preventDefault();
            navigate("/forget-password");
          }}
          underline="hover"
        >
          Reset password
        </Link>
      </div>
      {signUpError && <Alert severity="error">{signUpError}</Alert>}
    </Stack>
  );
}

export default SignUp;
