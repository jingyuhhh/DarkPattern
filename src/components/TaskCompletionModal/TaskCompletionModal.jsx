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
import { useParams, useNavigate } from "react-router-dom";
import { tasks, TaskType } from "../../data/tasks";
import { useDispatch } from "react-redux";
import { addToCart } from "../../store/cart";
import { resetCart } from "../../store/cart";

const TaskCompletionModal = ({ id, open, targetTaskType, onClose }) => {
  const navigate = useNavigate();
  const currentTaskIndex = tasks.findIndex((task) => task.id === parseInt(id));
  const dispatch = useDispatch();

  if (
    currentTaskIndex !== -1 &&
    tasks[currentTaskIndex].taskType === targetTaskType
  ) {
    const nextTask = tasks[currentTaskIndex + 1];
    if (!nextTask) {
      return (
        <Dialog
          open={open}
          onClose={() => {
            if (onClose) onClose();
            navigate("/tasks/completed"); // Navigate to a completion page or summary
          }}
        >
          <DialogTitle>All Tasks Completed</DialogTitle>
          <DialogContent>
            <Typography>You have completed all tasks!</Typography>
          </DialogContent>
          <DialogActions>
            <Button onClick={() => onClose && onClose()} color="primary">
              Close
            </Button>
          </DialogActions>
        </Dialog>
      );
    } else {
      console.log(`Next task ID: ${nextTask.id}`);

      return (
        <Dialog
          open={open}
          onClose={() => {
            if (onClose) onClose();
            navigate(`/task/${nextTask.id}`);
          }}
        >
          <DialogTitle>Task Completion Successful</DialogTitle>
          <DialogContent>
            <Typography>You finished the task successfully!</Typography>
          </DialogContent>
          <DialogActions>
            <Button
              onClick={() => {
                if (onClose) onClose();
                navigate(`/task/${nextTask.id}`);
              }}
              color="primary"
            >
              Next Task
            </Button>
          </DialogActions>
        </Dialog>
      );
    }
  }
  return null; // Return null if the task is not found or does not match the targetTaskType
};

export default TaskCompletionModal;
