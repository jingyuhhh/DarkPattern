import React, { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import {
  IconButton,
  Tooltip,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Typography,
  Box,
  TextField,
  FormControl,
  RadioGroup,
  FormControlLabel,
  Radio,
} from "@mui/material";
import HelpOutlineIcon from "@mui/icons-material/HelpOutline";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import SkipNextIcon from "@mui/icons-material/SkipNext";
import PlayArrowIcon from "@mui/icons-material/PlayArrow";
import { tasks } from "../../data/tasks.js";
import { useDispatch } from "react-redux";
import { addToCart } from "../../store/cart.js";
import { PII } from "../../data/PII.js";
import { usePreserveQueryNavigate } from "../../hooks/useQueryNavigate.js";

const QuestionMark = () => {
  const [dialogOpen, setDialogOpen] = useState(false);
  const [selectedOption, setSelectedOption] = useState("");
  const [skipReason, setSkipReason] = useState("");
  const { id } = useParams();
  const dispatch = useDispatch();
  const navigate = usePreserveQueryNavigate();

  // Get current task information
  const getCurrentTask = () => {
    // If we're on a task page, get the task by ID
    if (id) {
      return tasks.find((task) => task.id === parseInt(id));
    }

    // If we're on other pages, we might want to get task from URL or other sources
    // For now, return the first task as default
    return tasks[0];
  };

  // Get next task
  const getNextTask = () => {
    const currentTask = getCurrentTask();
    if (!currentTask) return null;

    const currentIndex = tasks.findIndex((task) => task.id === currentTask.id);
    const nextIndex = currentIndex + 1;

    // If there's a next task, return it
    if (nextIndex < tasks.length) {
      return tasks[nextIndex];
    }

    // If this is the last task, return null
    return null;
  };

  const currentTask = getCurrentTask();

  const handleClick = () => {
    setDialogOpen(true);
  };

  const handleClose = () => {
    setDialogOpen(false);
    setSelectedOption("");
    setSkipReason("");
  };

  const handleOptionSelect = (option) => {
    setSelectedOption(option);
  };

  const handleSubmit = () => {
    let nextTask;

    switch (selectedOption) {
      case "finished":
        console.log("Task finished");
        // Navigate to next task
        nextTask = getNextTask();

        if (nextTask) {
          navigate(`/task/${nextTask.id}`);
          console.log(nextTask);
        } else {
          // If no next task, go to shopping page with current task ID
          navigate(`/task/${id}/shopping`);
        }
        break;
      case "skip":
        console.log("Task skipped with reason:", skipReason);
        // Navigate to next task
        nextTask = getNextTask();
        if (nextTask) {
          navigate(`/task/${nextTask.id}`);
        } else {
          // If no next task, go to shopping page with current task ID
          navigate(`/task/${id}/shopping`);
        }
        break;
      case "continue":
        console.log("Continue with task");
        // Stay on current page
        break;
      default:
        break;
    }
    handleClose();
  };

  return (
    <>
      <Tooltip title="Help" placement="bottom">
        <IconButton
          onClick={handleClick}
          sx={{
            position: "fixed",
            top: 16,
            left: 16,
            zIndex: 9999, // Increased z-index to ensure it's always on top
            backgroundColor: "rgba(255, 255, 255, 0.8)",
            "&:hover": {
              backgroundColor: "rgba(255, 255, 255, 0.9)",
            },
          }}
        >
          <HelpOutlineIcon />
        </IconButton>
      </Tooltip>

      <Dialog open={dialogOpen} onClose={handleClose} maxWidth="sm" fullWidth>
        <DialogTitle>
          <Typography variant="h6" component="div">
            Task Options
          </Typography>
        </DialogTitle>

        <DialogContent>
          {currentTask && (
            <Box sx={{ mb: 3, p: 2, bgcolor: "grey.50", borderRadius: 1 }}>
              <Typography variant="h6" gutterBottom color="primary">
                Current Task: {currentTask.title}
              </Typography>
            </Box>
          )}

          {/* Display PII data */}
          <Box sx={{ mb: 3, p: 2, bgcolor: "grey.100", borderRadius: 1 }}>
            <Typography variant="h6" gutterBottom color="secondary">
              Personal Information:
            </Typography>
            <Typography>Email: {PII.email}</Typography>
            <Typography>Phone: {PII.phone}</Typography>
            <Typography>Address: {PII.address}</Typography>
            <Typography>Name: {PII.name}</Typography>
            <Typography>Payment Password: {PII.password}</Typography>
          </Box>

          <FormControl component="fieldset" fullWidth>
            <RadioGroup
              value={selectedOption}
              onChange={(e) => handleOptionSelect(e.target.value)}
            >
              <FormControlLabel
                value="finished"
                control={<Radio />}
                label={
                  <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                    <CheckCircleIcon color="success" />
                    <Typography>I finished the task</Typography>
                  </Box>
                }
              />

              {/* <FormControlLabel
                value="continue"
                control={<Radio />}
                label={
                  <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                    <PlayArrowIcon color="primary" />
                    <Typography>Continue to do the task</Typography>
                  </Box>
                }
              /> */}
              <FormControlLabel
                value="skip"
                control={<Radio />}
                label={
                  <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                    <SkipNextIcon color="warning" />
                    <Typography>I want to skip the task</Typography>
                  </Box>
                }
              />
            </RadioGroup>
          </FormControl>

          {selectedOption === "skip" && (
            <Box sx={{ mt: 2 }}>
              <TextField
                fullWidth
                multiline
                rows={3}
                label="Please provide a reason for skipping"
                value={skipReason}
                onChange={(e) => setSkipReason(e.target.value)}
                placeholder="Enter your reason here..."
              />
            </Box>
          )}
        </DialogContent>

        <DialogActions sx={{ p: 3, gap: 2 }}>
          <Button onClick={handleClose} variant="outlined">
            Cancel
          </Button>
          <Button
            onClick={handleSubmit}
            variant="contained"
            disabled={
              !selectedOption ||
              (selectedOption === "skip" && !skipReason.trim())
            }
          >
            Confirm
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default QuestionMark;
