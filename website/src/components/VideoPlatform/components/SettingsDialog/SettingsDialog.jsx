import React, { useState } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  List,
  ListItemButton,
  ListItemText,
  Box,
  Typography,
  Divider,
  IconButton,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";

const menuItems = [
  "Data Protection",
  "Safety",
  "Content",
  "Privacy",
  "Your Preferences",
];

export const SettingsDialog = ({ open, onClose }) => {
  const [selected, setSelected] = useState(menuItems[0]);

  return (
    <Dialog open={open} onClose={onClose} maxWidth="md" fullWidth>
      <DialogTitle
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        Settings
        <IconButton onClick={onClose}>
          <CloseIcon />
        </IconButton>
      </DialogTitle>

      <DialogContent sx={{ display: "flex", minHeight: "400px" }}>
        {/* Left: Sidebar */}
        <Box sx={{ width: "250px", borderRight: "1px solid #ddd", pr: 1 }}>
          <List disablePadding>
            {menuItems.map((item) => (
              <ListItemButton
                key={item}
                selected={selected === item}
                onClick={() => setSelected(item)}
              >
                <ListItemText primary={item} />
              </ListItemButton>
            ))}
          </List>
        </Box>

        {/* Right: Content */}
        <Box sx={{ flexGrow: 1, pl: 3 }}>
          <Typography variant="h6" gutterBottom>
            {selected}
          </Typography>
          <Divider sx={{ mb: 2 }} />
          <Typography variant="body1">
            {/* This part can be replaced with actual setting forms per section */}
            This is the settings content for <strong>{selected}</strong>. You
            can place configuration options, toggles, text fields etc. here.
          </Typography>
        </Box>
      </DialogContent>
    </Dialog>
  );
};
