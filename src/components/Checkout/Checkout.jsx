import React, { useState } from "react";
import { useSelector } from "react-redux";
import {
  Typography,
  Button,
  Paper,
  Radio,
  RadioGroup,
  FormControlLabel,
  TextField,
  FormControl,
  FormLabel,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
} from "@mui/material";
import Nav from "../Nav/Nav";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { useNavigate, useParams } from "react-router-dom";
import { tasks, TaskType } from "../TaskEntry/tasks";

const SHIPPING_OPTIONS = [
  { label: "Standard (Free)", value: "standard", price: 0 },
  { label: "Premium (+$10)", value: "premium", price: 10 },
];

const Checkout = () => {
  const items = useSelector((state) => state.cart.items);
  const navigate = useNavigate();
  const { id } = useParams();
  const [address, setAddress] = useState({
    name: "",
    phone: "",
    address: "",
  });
  const [shipping, setShipping] = useState("standard");
  const [dialogOpen, setDialogOpen] = useState(false);

  const shippingPrice =
    SHIPPING_OPTIONS.find((opt) => opt.value === shipping)?.price || 0;
  const total =
    items.reduce((sum, item) => sum + item.price * item.quantity, 0) +
    shippingPrice;

  const handleInputChange = (e) => {
    setAddress({ ...address, [e.target.name]: e.target.value });
  };

  const handleShippingChange = (e) => {
    setShipping(e.target.value);
  };

  const handlePlaceOrder = () => {
    setDialogOpen(true);
  };

  const handleDialogClose = () => {
    setDialogOpen(false);

    // Check if the current task type is "Buy Product"
    const currentTaskIndex = tasks.findIndex(
      (task) => task.id === parseInt(id)
    );
    if (
      currentTaskIndex !== -1 &&
      tasks[currentTaskIndex].taskType === TaskType.BuyProduct
    ) {
      const nextTask = tasks[currentTaskIndex + 1];
      if (nextTask) {
        navigate(`/task/${nextTask.id}`);
      }
    }
  };

  if (!items.length) {
    return <div className="p-6 text-center text-gray-400 text-lg">Empty</div>;
  }

  return (
    <>
      <Nav />
      <Button onClick={() => navigate(-1)} startIcon={<ArrowBackIcon />}>
        Return
      </Button>
      <div className="flex flex-col h-[calc(100vh-56px)] bg-gray-50">
        <Typography variant="h6" className="mb-4 font-bold px-6 pt-6">
          Checkout
        </Typography>
        <div className="flex-1 overflow-y-auto px-4 pb-32 space-y-6">
          <Paper
            elevation={2}
            className="p-4 rounded-xl bg-white border border-gray-100"
          >
            <Typography variant="subtitle1" className="font-semibold mb-2">
              Shipping Address
            </Typography>
            <div className="flex flex-col gap-3">
              <TextField
                label="Name"
                name="name"
                value={address.name}
                onChange={handleInputChange}
                size="small"
                required
              />
              <TextField
                label="Phone"
                name="phone"
                value={address.phone}
                onChange={handleInputChange}
                size="small"
                required
              />
              <TextField
                label="Address"
                name="address"
                value={address.address}
                onChange={handleInputChange}
                size="small"
                required
                multiline
                minRows={2}
              />
            </div>
          </Paper>
          <Paper
            elevation={2}
            className="p-4 rounded-xl bg-white border border-gray-100"
          >
            <FormControl component="fieldset">
              <FormLabel component="legend" className="font-semibold mb-2">
                Shipping Method
              </FormLabel>
              <RadioGroup value={shipping} onChange={handleShippingChange}>
                {SHIPPING_OPTIONS.map((opt) => (
                  <FormControlLabel
                    key={opt.value}
                    value={opt.value}
                    control={<Radio />}
                    label={opt.label}
                  />
                ))}
              </RadioGroup>
            </FormControl>
          </Paper>
        </div>
        <div className="fixed left-0 right-0 bottom-0 bg-white border-t shadow-lg px-6 py-4 flex justify-between items-center z-10">
          <div className="text-xl font-bold text-gray-800">
            Total: <span className="text-blue-600">${total.toFixed(2)}</span>
          </div>
          <Button
            variant="contained"
            color="primary"
            size="large"
            onClick={handlePlaceOrder}
          >
            Place Order
          </Button>
        </div>
      </div>

      {/* Success Dialog */}
      <Dialog open={dialogOpen} onClose={handleDialogClose}>
        <DialogTitle>Order Successful</DialogTitle>
        <DialogContent>
          <Typography>Your order has been placed successfully!</Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleDialogClose} color="primary">
            OK
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default Checkout;
