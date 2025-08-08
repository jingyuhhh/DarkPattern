import React, { useState } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Button,
} from "@mui/material";

export const Register = ({ open, onClose, onLoginSuccess }) => {
  const [fullName, setFullName] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [birthday, setBirthday] = useState("");
  const [passwordError, setPasswordError] = useState(false);
  const [email, setEmail] = useState("");

  const handleRegister = () => {
    if (
      fullName &&
      username &&
      password &&
      confirmPassword &&
      password === confirmPassword &&
      birthday
    ) {
      onLoginSuccess({ username, fullName });
      // Reset form
      setFullName("");
      setUsername("");
      setPassword("");
      setConfirmPassword("");
      setBirthday("");
      setPasswordError(false);
    }
  };

  const handleClose = () => {
    onClose();
    // Reset form
    setFullName("");
    setUsername("");
    setPassword("");
    setConfirmPassword("");
    setBirthday("");
    setPasswordError(false);
  };

  return (
    <Dialog
      open={open}
      onClose={handleClose}
      PaperProps={{
        className: "rounded-xl bg-white max-w-sm w-full",
        sx: { padding: 0 },
      }}
    >
      <DialogTitle
        sx={{
          textAlign: "center",
          fontWeight: 600,
          fontSize: "1.25rem",
          paddingTop: "2rem",
        }}
      >
        Create your Account
      </DialogTitle>

      <DialogContent
        sx={{
          display: "flex",
          flexDirection: "column",
          gap: 2,
          padding: "1.5rem 2rem",
        }}
      >
        <TextField
          label="Full Name"
          placeholder="Enter your full name"
          variant="filled"
          size="small"
          fullWidth
          value={fullName}
          onChange={(e) => setFullName(e.target.value)}
          InputProps={{
            sx: {
              borderRadius: "8px",
              backgroundColor: "#f0f6ff",
            },
          }}
        />
        <TextField
          label="Username"
          placeholder="Enter your email"
          variant="filled"
          size="small"
          fullWidth
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          InputProps={{
            sx: {
              borderRadius: "8px",
              backgroundColor: "#f0f6ff",
            },
          }}
        />
        <TextField
          label="Email"
          placeholder="Enter your email"
          variant="filled"
          size="small"
          fullWidth
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          InputProps={{
            sx: {
              borderRadius: "8px",
              backgroundColor: "#f0f6ff",
            },
          }}
        />

        <TextField
          label="Birthday"
          type="date"
          variant="filled"
          size="small"
          fullWidth
          value={birthday}
          onChange={(e) => setBirthday(e.target.value)}
          InputLabelProps={{ shrink: true }}
          InputProps={{
            sx: {
              borderRadius: "8px",
              backgroundColor: "#f0f6ff",
            },
          }}
        />
        <TextField
          label="Password"
          type="password"
          placeholder="Enter your password"
          variant="filled"
          size="small"
          fullWidth
          value={password}
          onChange={(e) => {
            setPassword(e.target.value);
            setPasswordError(
              confirmPassword && confirmPassword !== e.target.value
            );
          }}
          InputProps={{
            sx: {
              borderRadius: "8px",
              backgroundColor: "#f0f6ff",
            },
          }}
        />
        <TextField
          label="Confirm Password"
          type="password"
          placeholder="Re-enter your password"
          variant="filled"
          size="small"
          fullWidth
          value={confirmPassword}
          onChange={(e) => {
            setConfirmPassword(e.target.value);
            setPasswordError(e.target.value !== password);
          }}
          error={passwordError}
          helperText={passwordError ? "Passwords do not match" : ""}
          InputProps={{
            sx: {
              borderRadius: "8px",
              backgroundColor: "#f0f6ff",
            },
          }}
        />
      </DialogContent>

      <DialogActions
        sx={{
          justifyContent: "space-between",
          padding: "1.5rem 2rem 2rem 2rem",
          marginTop: 0,
        }}
      >
        <Button
          type="button"
          onClick={handleClose}
          sx={{
            color: "#1976d2",
            textTransform: "none",
            fontWeight: 500,
          }}
        >
          Cancel
        </Button>
        <Button
          variant="contained"
          type="button"
          disabled={
            !fullName ||
            !username ||
            !password ||
            !confirmPassword ||
            password !== confirmPassword ||
            !birthday
          }
          onClick={handleRegister}
          sx={{
            backgroundColor: "#1976d2",
            textTransform: "none",
            paddingX: 3,
            "&:hover": {
              backgroundColor: "#1565c0",
            },
          }}
        >
          Register and Sign in
        </Button>
      </DialogActions>
    </Dialog>
  );
};
