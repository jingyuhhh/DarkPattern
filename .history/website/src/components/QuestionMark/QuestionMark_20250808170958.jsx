import React, { useState } from "react";
import { useParams, useLocation } from "react-router-dom";
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
import { resetCart } from "../../store/cart.js";
import { getTasks, DomainType } from "../../data/tasks.js";
import { useDispatch } from "react-redux";
import {
  PII,
  ecommercePII,
  socialMediaPII,
  videoStreamPII,
} from "../../data/PII.js";
import TaskCompletionModal from "../TaskCompletionModal/TaskCompletionModal.jsx";

const QuestionMark = () => {
  const [dialogOpen, setDialogOpen] = useState(false);
  const [selectedOption, setSelectedOption] = useState("");
  const [skipReason, setSkipReason] = useState("");
  const [completionModalOpen, setCompletionModalOpen] = useState(false); // 控制 TaskCompletionModal
  const [taskFormData, setTaskFormData] = useState();
  const { id } = useParams();
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const userID = searchParams.get("userID") || 1;
  const tasks = getTasks(userID);
  const dispatch = useDispatch();

  const getCurrentTask = () => {
    if (id) {
      return tasks.find((task) => task.id === parseInt(id));
    }
    return tasks[0];
  };

  const currentTask = getCurrentTask();

  // 根据domain获取相应的PII信息
  const getPIIByDomain = (domain) => {
    switch (domain) {
      case DomainType.ECommerce:
        return ecommercePII;
      case DomainType.SocialMedia:
        return socialMediaPII;
      case DomainType.VideoStream:
        return videoStreamPII;
      default:
        return PII;
    }
  };

  const currentPII = getPIIByDomain(currentTask?.domain);

  const handleClick = () => setDialogOpen(true);
  const handleClose = () => {
    setDialogOpen(false);
    setSelectedOption("");
    setSkipReason("");
  };

  const handleOptionSelect = (option) => setSelectedOption(option);

  const handleSubmit = () => {
    const data = {
      skipReason: selectedOption === "skip" ? skipReason : null,
    };
    dispatch(resetCart());
    setCompletionModalOpen(true);
    setTaskFormData(data); // 新增一个 state 保存 formData
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
            zIndex: 9999,
            backgroundColor: "rgba(255, 255, 255, 0.8)",
            "&:hover": {
              backgroundColor: "rgba(255, 255, 255, 0.9)",
            },
          }}
        >
          <HelpOutlineIcon />
        </IconButton>
      </Tooltip>

      {/* 原有的弹窗 */}
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
              <Typography variant="body2" color="text.secondary">
                Domain: {currentTask.domain}
              </Typography>
            </Box>
          )}

          <Box sx={{ mb: 3, p: 2, bgcolor: "grey.100", borderRadius: 1 }}>
            <Typography variant="h6" gutterBottom color="secondary">
              Personal Information ({currentTask?.domain}):
            </Typography>
            {currentTask?.domain === DomainType.ECommerce && (
              <>
                <Typography>Full Name: {currentPII.fullname}</Typography>
                <Typography>Phone: {currentPII.phone}</Typography>
                <Typography>Address: {currentPII.address}</Typography>
                <Typography>Payment Password: {currentPII.password}</Typography>
              </>
            )}
            {currentTask?.domain === DomainType.SocialMedia && (
              <>
                <Typography>Full Name: {currentPII.fullname}</Typography>
                <Typography>Email: {currentPII.email}</Typography>
                <Typography>Birthday: {currentPII.birthday}</Typography>
                <Typography>Bio: {currentPII.bio}</Typography>
              </>
            )}
            {currentTask?.domain === DomainType.VideoStream && (
              <>
                <Typography>Full Name: {currentPII.fullname}</Typography>
                <Typography>Username: {currentPII.username}</Typography>
                <Typography>Email: {currentPII.email}</Typography>
                <Typography>Birthday: {currentPII.birthday}</Typography>
                <Typography>Password: {currentPII.password}</Typography>
                <Typography>
                  Profile Picture: {currentPII.profilePicture}
                </Typography>
              </>
            )}
          </Box>

          <FormControl component="fieldset" fullWidth>
            <RadioGroup
              value={selectedOption}
              onChange={(e) => handleOptionSelect(e.target.value)}
            >
              {/* <FormControlLabel
                value="finished"
                control={<Radio />}
                label={
                  <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                    <CheckCircleIcon color="success" />
                    <Typography>I finished the task</Typography>
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

      {/* Task Completion Modal */}
      <TaskCompletionModal
        id={id}
        open={completionModalOpen}
        targetTaskType={currentTask?.taskType}
        onClose={() => setCompletionModalOpen(false)}
        formData={taskFormData}
      />
    </>
  );
};

export default QuestionMark;
