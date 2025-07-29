import React from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
} from "@mui/material";

const GlobalPopup = ({ open, onClose }) => {
  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>Share Your Data</DialogTitle>
      <DialogContent>
        <p>
          We would like to collect some data to improve your experience. Would
          you like to share your data with us?
        </p>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} color="primary" variant="outlined">
          Not now
        </Button>
        <Button
          onClick={() => {
            /* handle data sharing logic */
          }}
          color="primary"
          variant="outlined"
        >
          Yes
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default GlobalPopup;
