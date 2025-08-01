import React, { useState } from "react";
import {
  Typography,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Snackbar,
  Alert,
} from "@mui/material";
import { useLocation } from "react-router-dom";
import { getTasks } from "../../data/tasks";
import { useDispatch } from "react-redux";
import { usePreserveQueryNavigate } from "../../hooks/useQueryNavigate";
import Survey from "./components/Survey/Survey";
import { db } from "../../firebase";
import { collection, addDoc, serverTimestamp } from "firebase/firestore";

const TaskCompletionModal = ({ id, open, targetTaskType, onClose }) => {
  const navigate = usePreserveQueryNavigate();
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const isAgent = searchParams.get("agent") === "true";
  const userID = searchParams.get("userID") || 0;
  const tasks = getTasks(userID);
  const currentTaskIndex = tasks.findIndex((task) => task.id === parseInt(id));
  const dispatch = useDispatch();

  const [likertAnswers, setLikertAnswers] = useState(Array(5).fill(null));
  const [yesNoMaybe, setYesNoMaybe] = useState(null);

  // Snackbar 状态
  const [snackbarOpen, setSnackbarOpen] = useState(false);

  const handleNextTask = async () => {
    if (likertAnswers.some((a) => a === null) || yesNoMaybe === null) {
      setSnackbarOpen(true); // 打开提示
      return;
    }

    const surveyData = {
      userID,
      taskID: tasks[currentTaskIndex].id,
      likertAnswers,
      yesNoMaybe,
      createdAt: serverTimestamp(),
    };

    try {
      await addDoc(collection(db, "surveyResponses"), surveyData);
      console.log("Survey submitted to Firebase:", surveyData);
    } catch (err) {
      console.error("Error saving survey:", err);
    }

    if (onClose) onClose();
    navigate(`/task/${nextTask.id}`);
  };

  const handleSnackbarClose = () => {
    setSnackbarOpen(false);
  };

  const nextTask = tasks[(currentTaskIndex + 1) % 14];

  // Agent 模式
  if (isAgent) {
    return (
      <Dialog
        open={open}
        onClose={() => {
          if (onClose) onClose();
          navigate(`/task/${tasks[currentTaskIndex].id}`);
        }}
      >
        <DialogTitle>Task Completion Successful</DialogTitle>
        <DialogContent>
          <Typography>You finished the task successfully!</Typography>
        </DialogContent>
      </Dialog>
    );
  }

  if (
    tasks[currentTaskIndex].taskType === targetTaskType &&
    currentTaskIndex !== 13
  ) {
    return (
      <>
        <Dialog
          open={open}
          onClose={() => {
            if (onClose) onClose();
            navigate(`/task/${nextTask.id}`);
          }}
        >
          <DialogTitle>Task Completion Successful</DialogTitle>
          <DialogContent>
            <Typography>Please rate your experience</Typography>
            <br />
            <Survey
              likertAnswers={likertAnswers}
              setLikertAnswers={setLikertAnswers}
              yesNoMaybe={yesNoMaybe}
              setYesNoMaybe={setYesNoMaybe}
            />
          </DialogContent>
          <DialogActions>
            <Button onClick={handleNextTask} color="primary">
              Next Task
            </Button>
          </DialogActions>
        </Dialog>

        {/* Snackbar 提示 */}
        <Snackbar
          open={snackbarOpen}
          autoHideDuration={3000}
          onClose={handleSnackbarClose}
          anchorOrigin={{ vertical: "top", horizontal: "center" }}
        >
          <Alert severity="warning" onClose={handleSnackbarClose}>
            Please answer all questions before continuing.
          </Alert>
        </Snackbar>
      </>
    );
  } else if (tasks[currentTaskIndex].taskType === targetTaskType) {
    return (
      <Dialog
        open={open}
        onClose={() => {
          if (onClose) onClose();
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
  }
};

export default TaskCompletionModal;
