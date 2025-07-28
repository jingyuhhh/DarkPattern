import React, { useState } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Typography,
  RadioGroup,
  FormControlLabel,
  Radio,
  TextField,
} from "@mui/material";

const CancelMembershipFlowDialog = ({ open, onClose, onCancelSuccess }) => {
  const [step, setStep] = useState(0);
  const [reason, setReason] = useState("");
  const [password, setPassword] = useState("");

  const handleNext = () => {
    if (step < 4) {
      setStep(step + 1);
    } else {
      // 最后一步：校验密码
      if (password.length >= 4) {
        onCancelSuccess(); // 通知父组件取消成功
        onClose();
      } else {
        alert("Please enter a valid password (min 4 characters)");
      }
    }
  };

  const handleClose = () => {
    setStep(0);
    setReason("");
    setPassword("");
    onClose();
  };

  return (
    <Dialog open={open} onClose={handleClose} maxWidth="sm" fullWidth>
      <DialogTitle>Cancel Premium Membership</DialogTitle>
      <DialogContent>
        {step === 0 && (
          <Typography>
            Are you sure you want to cancel your premium membership?
          </Typography>
        )}
        {step === 1 && (
          <>
            <Typography>You will lose the following benefits:</Typography>
            <ul className="list-disc pl-6 mt-2 text-sm">
              <li>Free shipping on all orders</li>
              <li>Exclusive member discounts</li>
              <li>Priority customer support</li>
              <li>Early access to new products</li>
              <li>Extended return window (60 days)</li>
            </ul>
            <Typography className="mt-3">
              Are you sure you want to continue?
            </Typography>
          </>
        )}
        {step === 2 && (
          <>
            <Typography>Select a reason for cancellation:</Typography>
            <RadioGroup
              value={reason}
              onChange={(e) => setReason(e.target.value)}
              className="mt-2"
            >
              <FormControlLabel
                value="Too expensive"
                control={<Radio />}
                label="Too expensive"
              />
              <FormControlLabel
                value="Not using enough"
                control={<Radio />}
                label="Not using enough"
              />
              <FormControlLabel
                value="Found better alternative"
                control={<Radio />}
                label="Found a better alternative"
              />
              <FormControlLabel
                value="Other"
                control={<Radio />}
                label="Other"
              />
            </RadioGroup>
          </>
        )}
        {step === 3 && (
          <Typography>
            If you cancel now, reactivating will require eligibility
            reassessment. Do you still want to proceed?
          </Typography>
        )}
        {step === 4 && (
          <>
            <Typography>
              Please enter your payment password to confirm cancellation:
            </Typography>
            <TextField
              type="password"
              fullWidth
              className="mt-3"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </>
        )}
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose}>Close</Button>
        <Button variant="contained" color="primary" onClick={handleNext}>
          {step < 4 ? "Next" : "Confirm Cancel"}
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default CancelMembershipFlowDialog;
