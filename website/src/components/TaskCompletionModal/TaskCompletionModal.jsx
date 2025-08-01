import React from "react";
import {
  Typography,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
} from "@mui/material";
import { useParams, useNavigate, useLocation } from "react-router-dom";
import { getTasks } from "../../data/tasks";
import { useDispatch } from "react-redux";
import { usePreserveQueryNavigate } from "../../hooks/useQueryNavigate";

const TaskCompletionModal = ({ id, open, targetTaskType, onClose }) => {
  const navigate = usePreserveQueryNavigate();
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const isAgent = searchParams.get("agent") === "true"; // 判断是否为 agent 模式
  const userID = searchParams.get("userID") || 0;
  const tasks = getTasks(userID);
  const currentTaskIndex = tasks.findIndex((task) => task.id === parseInt(id));
  const dispatch = useDispatch();

  // 如果是 agent 模式，始终返回 Task Completion Successful
  if (isAgent) {
    return (
      <Dialog
        open={open}
        onClose={() => {
          if (onClose) onClose();
          navigate(`/task/${tasks[currentTaskIndex].id}`); // 停留在当前任务或保持页面
        }}
      >
        <DialogTitle>Task Completion Successful</DialogTitle>
        <DialogContent>
          <Typography>You finished the task successfully!</Typography>
        </DialogContent>
        <DialogActions></DialogActions>
      </Dialog>
    );
  }

  const nextTask = tasks[(currentTaskIndex + 1) % 14];

  if (
    tasks[currentTaskIndex].taskType === targetTaskType &&
    currentTaskIndex !== 13
  ) {
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
