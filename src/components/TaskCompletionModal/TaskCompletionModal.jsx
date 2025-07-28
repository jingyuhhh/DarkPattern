import React from "react";
import {
  Typography,
  Button,
  Paper,
  Radio,
  RadioGroup,
  FormControlLabel,
  TextField,
  FormControl,
  FormLabel,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
} from "@mui/material";

const TaskCompletionModal = ({ open, onClose }) => {
  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>Task Completion Successful</DialogTitle>
      <DialogContent>
        <Typography>Your finished the task successfully!</Typography>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} color="primary">
          Next Task
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default TaskCompletionModal;
