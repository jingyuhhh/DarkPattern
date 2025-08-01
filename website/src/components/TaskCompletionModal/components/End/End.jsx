// End.jsx
import { Box, Typography, Button, Paper } from "@mui/material";
import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";

export const End = () => {
  return (
    <Box
      display="flex"
      justifyContent="center"
      alignItems="center"
      minHeight="100vh"
      bgcolor="#f5f5f5"
      p={2}
    >
      <Paper
        elevation={3}
        sx={{
          p: 5,
          maxWidth: 500,
          textAlign: "center",
          borderRadius: 3,
        }}
      >
        <CheckCircleOutlineIcon color="success" sx={{ fontSize: 80, mb: 2 }} />
        <Typography variant="h4" gutterBottom>
          Congratulations!
        </Typography>
        <Typography variant="body1" color="textSecondary" gutterBottom>
          You have completed all the tasks.
        </Typography>
      </Paper>
    </Box>
  );
};
