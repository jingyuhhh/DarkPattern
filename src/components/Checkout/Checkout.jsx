import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { resetCart } from "../../store/cart";
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
import { useNavigate, useParams, useLocation } from "react-router-dom";
import { tasks, TaskType } from "../TaskEntry/tasks";

const SHIPPING_OPTIONS = [
  { label: "Standard (Free)", value: "standard", price: 0 },
  { label: "Premium (+$10)", value: "premium", price: 10 },
];

const Checkout = () => {
  const location = useLocation();
  const itemsFromState = location.state?.product
    ? [{ ...location.state.product }]
    : [];
  const itemsFromCart = useSelector((state) => state.cart.items);
  const items = itemsFromState.length ? itemsFromState : itemsFromCart;

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { id } = useParams();
  const [address, setAddress] = useState({
    name: "",
    phone: "",
    address: "",
  });

  const [shipping, setShipping] = useState("");
  const [dialogOpen, setDialogOpen] = useState(false);
  const sortedShippingOptions =
    parseInt(id) === 4
      ? [...SHIPPING_OPTIONS].sort((a, b) => (a.value === "premium" ? -1 : 1))
      : SHIPPING_OPTIONS;

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

    // Reset the cart
    dispatch(resetCart());

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

              {/* 仅在 id === 6 时显示鼓励提示 */}
              {parseInt(id) === 6 && (
                <div className="mb-4 p-4 rounded-lg bg-gradient-to-r from-yellow-50 to-orange-50 border border-yellow-200 shadow-sm">
                  <Typography
                    variant="subtitle1"
                    className="font-semibold text-orange-700"
                  >
                    Treat yourself to express shipping!
                  </Typography>
                  <Typography variant="body2" className="text-orange-600">
                    You deserve to enjoy your purchase as soon as possible.
                  </Typography>
                </div>
              )}

              <div className="grid gap-3">
                {sortedShippingOptions.map((opt) => {
                  const isPremium = opt.value === "premium";
                  const highlightPremium =
                    (parseInt(id) === 4 && isPremium) ||
                    (parseInt(id) === 5 && isPremium);
                  return (
                    <div
                      key={opt.value}
                      className={`relative flex items-center justify-between p-4 rounded-lg border cursor-pointer transition-all
            ${
              highlightPremium
                ? "border-blue-500 bg-blue-50 shadow-md"
                : "border-gray-200 hover:border-gray-300 bg-white"
            }`}
                      onClick={() => setShipping(opt.value)}
                    >
                      {/* 推荐徽标 */}
                      {highlightPremium && (
                        <div className="absolute -top-2 right-2">
                          <span className="bg-blue-500 text-white text-xs px-2 py-0.5 rounded-full shadow">
                            Recommended
                          </span>
                        </div>
                      )}
                      <div className="flex items-center gap-3">
                        <Radio
                          checked={shipping === opt.value}
                          value={opt.value}
                        />
                        <div>
                          <Typography
                            variant="subtitle1"
                            className={`font-semibold ${
                              highlightPremium
                                ? "text-blue-700"
                                : "text-gray-800"
                            }`}
                          >
                            {opt.label}
                          </Typography>
                          <Typography variant="body2" className="text-gray-500">
                            {isPremium
                              ? "Faster delivery (1-2 days)"
                              : "Standard shipping (3-5 days)"}
                          </Typography>
                        </div>
                      </div>
                      <Typography
                        variant="subtitle1"
                        className={`font-bold ${
                          highlightPremium ? "text-blue-600" : "text-gray-700"
                        }`}
                      >
                        {opt.price === 0 ? "Free" : `+$${opt.price}`}
                      </Typography>
                    </div>
                  );
                })}
              </div>
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
