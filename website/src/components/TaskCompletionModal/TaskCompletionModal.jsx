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
import { likertQuestions } from "./components/Survey/Survey";
import { uploadLogToFirebase } from "../../logger";

const TaskCompletionModal = ({ id, open, targetTaskType, onClose }) => {
  const navigate = usePreserveQueryNavigate();
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const isAgent = searchParams.get("agent") === "true";
  const userID = searchParams.get("userID") || 1;
  const tasks = getTasks(userID);
  const currentTaskIndex = tasks.findIndex((task) => task.id === parseInt(id));
  const dispatch = useDispatch();

  const [likertAnswers, setLikertAnswers] = useState(Array(5).fill(null));
  const [yesNoMaybe, setYesNoMaybe] = useState(null);

  // Snackbar 状态
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const isEnd = currentTaskIndex === 13;

  const handleNextTask = async () => {
    if (likertAnswers.some((a) => a === null) || yesNoMaybe === null) {
      setSnackbarOpen(true); // 打开提示
      return;
    }
    const userIDInt = parseInt(userID);
    const likertData = likertQuestions.reduce((acc, q, idx) => {
      acc[q.key] = likertAnswers[idx];
      return acc;
    }, {});

    const surveyData = {
      userID: userIDInt,
      taskID: tasks[currentTaskIndex].id,
      ...likertData,
      awareness: yesNoMaybe,
      createdAt: serverTimestamp(),
    };

    try {
      await addDoc(collection(db, "surveyResponses"), surveyData);
      console.log("Survey submitted to Firebase:", surveyData);
    } catch (err) {
      console.error("Error saving survey:", err);
    }

    if (onClose) onClose();
    if (isEnd) {
      navigate("/task/0");
      uploadLogToFirebase();
    } else navigate(`/task/${nextTask.id}`);
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

  if (tasks[currentTaskIndex].taskType === targetTaskType) {
    return (
      <>
        <Dialog
          open={open}
          onClose={() => {
            if (onClose) onClose();
            if (isEnd) navigate("/completed");
            else navigate(`/task/${nextTask.id}`);
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
  } else return <></>;
};

export default TaskCompletionModal;
