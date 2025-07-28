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
import { useNavigate, useParams } from "react-router-dom";
import { tasks, TaskType } from "../TaskEntry/tasks";
import TaskCompletionModal from "../TaskCompletionModal/TaskCompletionModal";

const SHIPPING_OPTIONS = [
  { label: "Standard (Free)", value: "standard", price: 0 },
  { label: "Premium (+$2)", value: "premium", price: 2 },
];

const Checkout = () => {
  const items = useSelector((state) => state.cart.items);
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
  const itemsTotal = items.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );
  const estimatedTax = (itemsTotal + shippingPrice) * 0.07; // 模拟税
  const orderTotal = itemsTotal + shippingPrice + estimatedTax;

  const handleInputChange = (e) =>
    setAddress({ ...address, [e.target.name]: e.target.value });
  const handleShippingChange = (e) => setShipping(e.target.value);
  const handlePlaceOrder = () => setDialogOpen(true);
  const handleDialogClose = () => {
    setDialogOpen(false);
    dispatch(resetCart());
    const currentTaskIndex = tasks.findIndex(
      (task) => task.id === parseInt(id)
    );
    if (
      currentTaskIndex !== -1 &&
      tasks[currentTaskIndex].taskType === TaskType.BuyProduct
    ) {
      const nextTask = tasks[currentTaskIndex + 1];
      if (nextTask) navigate(`/task/${nextTask.id}`);
    }
  };

  if (!items.length) {
    return <div className="p-6 text-center text-gray-400 text-lg">Empty</div>;
  }

  return (
    <>
      <Nav />
      <div className="max-w-7xl mx-auto px-6 py-6 grid grid-cols-1 md:grid-cols-12 gap-6">
        {/* 左侧：收货地址 & 配送方式 */}
        <div className="md:col-span-8 space-y-6">
          <Paper className="p-4 rounded-xl bg-white border border-gray-100">
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
          <Paper className="p-4 rounded-xl bg-white border border-gray-100">
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

        {/* 右侧：订单总结 */}
        <div className="md:col-span-4">
          <Paper className="p-6 rounded-xl bg-white border border-gray-200 shadow">
            <Button
              fullWidth
              style={{
                backgroundColor: "#ffd814",
                color: "#000",
                borderRadius: "8px",
                textTransform: "none",
                fontWeight: 600,
                fontSize: "16px",
                padding: "10px 0",
                marginBottom: "16px",
              }}
              onClick={handlePlaceOrder}
            >
              Place your order
            </Button>
            <div className="border-t my-4"></div>
            <div className="space-y-2 text-sm text-gray-700">
              <div className="flex justify-between">
                <span>Items:</span>
                <span>${itemsTotal.toFixed(2)}</span>
              </div>
              <div className="flex justify-between">
                <span>Shipping:</span>
                <span>${shippingPrice.toFixed(2)}</span>
              </div>

              <div className="flex justify-between">
                <span>Estimated Tax:</span>
                <span>${estimatedTax.toFixed(2)}</span>
              </div>
            </div>
            <div className="border-t my-4"></div>
            <div className="flex justify-between text-lg font-bold">
              <span>Order Total:</span>
              <span>${orderTotal.toFixed(2)}</span>
            </div>
          </Paper>
        </div>
      </div>

      {/* 下单成功弹窗 */}
      <TaskCompletionModal open={dialogOpen} onClose={handleDialogClose} />
    </>
  );
};

export default Checkout;
