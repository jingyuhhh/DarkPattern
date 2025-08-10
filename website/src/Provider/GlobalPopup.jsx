import React from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
} from "@mui/material";

const GlobalPopup = ({ open, onClose, onDisable }) => {
  return (
    <Dialog
      open={open}
      onClose={(event, reason) => {
        // 阻止 backdrop 点击 和 ESC 键关闭
        if (reason !== "backdropClick" && reason !== "escapeKeyDown") {
          onClose();
        }
      }}
      disableEscapeKeyDown
      disableBackdropClick
      sx={{
        zIndex: 9999, // 设置很高的z-index值，确保显示在最上层
      }}
    >
      <DialogTitle>Share Your Data</DialogTitle>
      <DialogContent>
        <p>
          We would like to access your location to improve your experience.
          Would you like to share your location with us?
        </p>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} color="primary" variant="outlined">
          Not now
        </Button>
        <Button
          onClick={onDisable} // Call onDisable when "Yes" is clicked
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
