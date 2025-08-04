import React, { useState, useEffect } from "react";
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
import { useSelector } from "react-redux";
import { usePreserveQueryNavigate } from "../../hooks/useQueryNavigate";
import Survey from "./components/Survey/Survey";
import { db } from "../../firebase";
import {
  collection,
  addDoc,
  doc,
  setDoc,
  serverTimestamp,
} from "firebase/firestore";
import { likertQuestions } from "./components/Survey/Survey";
import { detectAvoidBehavior } from "../../utils/behaviorDetection";
import { resetCart } from "../../store/cart";
import { useDispatch } from "react-redux";
import { usePopup } from "../../Provider/usePopup";
import { sanitizeForFirestore } from "../../logger";

const TaskCompletionModal = ({
  id,
  open,
  targetTaskType,
  onClose,
  formData,
}) => {
  const navigate = usePreserveQueryNavigate();
  const location = useLocation();
  const dispatch = useDispatch();
  const { notifyTaskCompletionModalOpen } = usePopup();
  const searchParams = new URLSearchParams(location.search);
  const isAgent = searchParams.get("agent") === "true";
  const userID = searchParams.get("userID") || 1;
  const tasks = getTasks(userID);
  const currentTaskIndex = tasks.findIndex((task) => task.id === parseInt(id));

  // 获取购物车状态
  const cartState = useSelector((state) => state.cart);

  const [likertAnswers, setLikertAnswers] = useState(Array(5).fill(null));
  const [yesNoMaybe, setYesNoMaybe] = useState(null);

  // Snackbar 状态
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const isEnd = currentTaskIndex === 13;

  // 通知PopupProvider TaskCompletionModal的打开状态
  useEffect(() => {
    if (notifyTaskCompletionModalOpen) {
      notifyTaskCompletionModalOpen(open);
    }
  }, [open, notifyTaskCompletionModalOpen]);

  const handleNextTask = async () => {
    if (likertAnswers.some((a) => a === null) || yesNoMaybe === null) {
      setSnackbarOpen(true); // 打开提示
      return;
    }

    // 检测avoid behavior
    const userActions = window.userActions || [];
    const avoided = detectAvoidBehavior(id, userActions, cartState, formData);

    const userIDInt = parseInt(userID);
    const likertData = likertQuestions.reduce((acc, q, idx) => {
      acc[q.key] = likertAnswers[idx];
      return acc;
    }, {});

    // 获取当前任务的日志数据
    const lastInputValues = window.lastInputValues || {};
    const lastToggleStates = window.lastToggleStates || {};
    const visitedRoutes = window.visitedRoutes || [];
    const docId = `${userIDInt}_${tasks[currentTaskIndex].id}`;

    const surveyData = {
      userID: userIDInt,
      taskID: tasks[currentTaskIndex].id,
      avoided: avoided, // 添加avoided字段
      ...likertData,
      awareness: yesNoMaybe,
      createdAt: serverTimestamp(),
      // 添加日志数据
      userActions: userActions,
      lastInputValues: lastInputValues,
      lastToggleStates: lastToggleStates,
      visitedRoutes: visitedRoutes,
      uploadedAt: new Date().toISOString(),
      userAgent: navigator.userAgent,
      // 如果是跳过的任务，添加跳过信息
      ...(formData &&
        formData.skipReason && {
          skipped: true,
          skipReason: formData.skipReason,
        }),
    };
    console.log(surveyData);
    const sanitizedPayload = sanitizeForFirestore(surveyData);
    try {
      await setDoc(doc(db, "surveyResponses", docId), sanitizedPayload);
      console.log("Survey and logs submitted to Firebase:", docId);
    } catch (err) {
      console.error("Error saving survey:", err);
    }

    if (onClose) onClose();

    // 每完成一个任务都清空本地存储，确保下次任务的日志数据只与当前任务相关
    localStorage.removeItem("userActions");
    localStorage.removeItem("lastInputValues");
    localStorage.removeItem("lastToggleStates");
    localStorage.removeItem("visitedRoutes");
    dispatch(resetCart());

    if (isEnd) {
      navigate("/task/0");
    } else {
      navigate(`/task/${nextTask.id}`);
    }
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

  // 检查是否是从 QuestionMark 跳过的任务（有 formData 且包含 skipReason）
  const isSkippedTask = formData && formData.skipReason;

  if (tasks[currentTaskIndex].taskType === targetTaskType || isSkippedTask) {
    return (
      <>
        <Dialog
          open={open}
          fullWidth
          maxWidth="lg"
          onClose={() => {
            if (onClose) onClose();
            if (isEnd) navigate("/completed");
            else navigate(`/task/${nextTask.id}`);
          }}
        >
          <DialogTitle>
            {isSkippedTask ? "Task Skipped" : "Task Completion Successful"}
          </DialogTitle>
          <DialogContent>
            {isSkippedTask && (
              <Typography variant="body1" color="text.secondary" sx={{ mb: 2 }}>
                You skipped this task. Reason: {formData.skipReason}
              </Typography>
            )}
            <Typography>
              Please rate your opinions on these statements
            </Typography>
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
