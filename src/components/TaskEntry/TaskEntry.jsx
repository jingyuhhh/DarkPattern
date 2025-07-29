import React from "react";
import { useParams, useNavigate } from "react-router-dom";
import { tasks } from "./tasks";
import {
  Container,
  Card,
  CardContent,
  Typography,
  Button,
  Box,
  Paper,
} from "@mui/material";

const TaskEntry = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  // Find the task by ID
  const task = tasks.find((task) => task.id === parseInt(id));

  const handleContinue = () => {
    navigate(`/task/${id}/shopping`);
  };

  if (!task) {
    return (
      <Container maxWidth="md" sx={{ mt: 4 }}>
        <Paper sx={{ p: 3, textAlign: "center" }}>
          <Typography variant="h5" color="error">
            Task not found
          </Typography>
          <Button
            variant="contained"
            onClick={() => navigate(`/task/${id}/shopping`)}
            sx={{ mt: 2 }}
          >
            Go to Shopping
          </Button>
        </Paper>
      </Container>
    );
  }

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

            <Typography variant="body1" sx={{ mt: 2, mb: 3 }}>
              {task.description}
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
