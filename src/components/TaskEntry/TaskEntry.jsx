import React, { useEffect, useRef } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { tasks, TaskType } from "../../data/tasks";
import {
  Container,
  Card,
  CardContent,
  Typography,
  Button,
  Box,
} from "@mui/material";
import { useDispatch } from "react-redux";
import { addToCart } from "../../store/cart";

const TaskEntry = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const addedRef = useRef(false); // 标记是否已经添加

  const task = tasks.find((task) => task.id === parseInt(id));

  const handleContinue = () => {
    if (
      task.taskType === TaskType.CancelSubscription ||
      task.taskType === TaskType.SignSubscription
    ) {
      navigate(`/task/${id}/store/PaperPal#`);
    } else navigate(`/task/${id}/shopping`);
  };

  return (
    <Container maxWidth="md" sx={{ mt: 4 }}>
      <Card>
        <CardContent>
          <Typography variant="h4" component="h1" gutterBottom>
            Task Information
          </Typography>

          <Box sx={{ mt: 3 }}>
            <Typography variant="h6" gutterBottom>
              Task ID: {task.id}
            </Typography>

            <Typography variant="h5" gutterBottom sx={{ mt: 2 }}>
              {task.title}
            </Typography>

            <Button
              variant="contained"
              size="large"
              onClick={handleContinue}
              sx={{ mt: 2 }}
            >
              Continue
            </Button>
          </Box>
        </CardContent>
      </Card>
    </Container>
  );
};

export default TaskEntry;
