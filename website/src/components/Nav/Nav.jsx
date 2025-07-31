import React, { useState } from "react";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import Badge from "@mui/material/Badge";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import PersonIcon from "@mui/icons-material/Person";
import WorkspacePremium from "@mui/icons-material/WorkspacePremium";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogActions from "@mui/material/DialogActions";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { TaskType } from "../../data/tasks";
import { resetCart } from "../../store/cart";
import TaskCompletionModal from "../TaskCompletionModal/TaskCompletionModal";
import Snackbar from "@mui/material/Snackbar";
import Alert from "@mui/material/Alert";
import { usePreserveQueryNavigate } from "../../hooks/useQueryNavigate";
import { RadioGroup, FormControlLabel, Radio, TextField } from "@mui/material";
import { PII } from "../../data/PII";

const Nav = () => {
  const cartCount = useSelector((state) => state.cart.number);
  const navigate = usePreserveQueryNavigate();
  const dispatch = useDispatch();
  const { id } = useParams();

  const [anchorEl, setAnchorEl] = useState(null);
  const [membershipDialogOpen, setMembershipDialogOpen] = useState(false);
  const [isPremiumMember, setIsPremiumMember] = useState(true);
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const open = Boolean(anchorEl);

  // 多步骤取消弹窗
  const [cancelFlowOpen, setCancelFlowOpen] = useState(false);
  const [cancelStep, setCancelStep] = useState(0);
  const [cancelReason, setCancelReason] = useState("");
  const [password, setPassword] = useState("");

  const handleClick = (event) => setAnchorEl(event.currentTarget);
  const handleClose = () => setAnchorEl(null);
  const [openSnackbar, setOpenSnackbar] = useState(false);

  const handleMembershipClick = () => {
    setMembershipDialogOpen(true);
    handleClose();
  };
  const handleMembershipDialogClose = () => setMembershipDialogOpen(false);

  const handleOpenCancelFlow = () => {
    setCancelFlowOpen(true);
    setCancelStep(0);
    setCancelReason("");
    setPassword("");
  };

  const handleCancelSuccess = () => {
    setIsPremiumMember(false);
    setSnackbarOpen(true);
    setCancelFlowOpen(false);
    setMembershipDialogOpen(false);
  };

  const handleNextStep = () => {
    if (cancelStep === 2 && !cancelReason) {
      setOpenSnackbar(true);
      return;
    }
    if (cancelStep < 4) {
      setCancelStep(cancelStep + 1);
    } else {
      // TODO 密码校验
      if (password === PII.password) {
        handleCancelSuccess();
      } else {
        alert("Please enter a valid password.");
      }
    }
  };

  return (
    <>
      <nav className="flex items-center justify-end bg-[#141921] px-4 py-2 shadow-md">
        <div className="flex items-center space-x-6 ">
          {/* 购物车 */}
          <div
            className="border-gray-300 border-2 p-2 space-x-2 cursor-pointer rounded-full hover:border-gray-400 flex items-center"
            onClick={() => navigate(`/task/${id}/cart`)}
          >
            <Badge
              badgeContent={cartCount}
              color="amazon"
              overlap="circular"
              anchorOrigin={{ vertical: "top", horizontal: "right" }}
              classes={{ badge: "bg-blue-600 text-white text-xs font-bold" }}
            >
              <ShoppingCartIcon
                className="text-white cursor-pointer"
                fontSize="medium"
              />
            </Badge>
            <Typography
              variant="body2"
              className="text-white"
              fontWeight="bold"
            >
              Shopping Cart
            </Typography>
          </div>

          {/* 用户菜单 */}
          <div
            className={`flex items-center space-x-2 p-2 rounded-full border-2 cursor-pointer transition-colors ${
              isPremiumMember && id == 1
                ? "border-yellow-400 hover:border-yellow-500"
                : "border-gray-300 hover:border-gray-400"
            }`}
            onClick={handleClick}
          >
            <AccountCircleIcon className="text-white" fontSize="medium" />
            <Typography
              variant="body2"
              className="text-white"
              fontWeight="bold"
            >
              Account
            </Typography>
          </div>

          <Menu
            anchorEl={anchorEl}
            open={open}
            onClose={handleClose}
            PaperProps={{ elevation: 3, sx: { mt: 1.5 } }}
            transformOrigin={{ horizontal: "right", vertical: "top" }}
            anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
          >
            <MenuItem onClick={handleClose} disabled>
              <ListItemIcon>
                <PersonIcon fontSize="small" />
              </ListItemIcon>
              <ListItemText
                primary="John Doe"
                secondary="john.doe@example.com"
                primaryTypographyProps={{
                  fontSize: "0.875rem",
                  fontWeight: 600,
                }}
                secondaryTypographyProps={{ fontSize: "0.75rem" }}
              />
            </MenuItem>
            {isPremiumMember && id == 1 ? (
              <MenuItem onClick={handleMembershipClick}>
                <ListItemIcon>
                  <WorkspacePremium
                    fontSize="small"
                    className="text-yellow-600"
                  />
                </ListItemIcon>
                <ListItemText
                  primary="Premium Member"
                  secondary="Valid until Dec 2024"
                />
              </MenuItem>
            ) : (
              <MenuItem onClick={handleMembershipClick}>
                <ListItemIcon>
                  <PersonIcon fontSize="small" />
                </ListItemIcon>
                <ListItemText
                  primary="Regular User"
                  secondary="Upgrade to Premium"
                />
              </MenuItem>
            )}
          </Menu>

          {/* 会员信息 Dialog */}
          <Dialog
            open={membershipDialogOpen}
            onClose={handleMembershipDialogClose}
            maxWidth="sm"
            fullWidth
          >
            <DialogTitle sx={{ display: "flex", alignItems: "center", gap: 1 }}>
              {isPremiumMember && id == 1 ? (
                <>
                  <WorkspacePremium className="text-yellow-600" />
                  <Typography variant="h6">Premium Membership</Typography>
                </>
              ) : (
                <>
                  <PersonIcon />
                  <Typography variant="h6">User Account</Typography>
                </>
              )}
            </DialogTitle>
            <DialogContent>
              {isPremiumMember && id == 1 ? (
                <>
                  <Box sx={{ mb: 3 }}>
                    <Typography variant="h6" color="primary" gutterBottom>
                      Membership Details
                    </Typography>
                    <Box
                      sx={{ display: "flex", flexDirection: "column", gap: 2 }}
                    >
                      <Box
                        sx={{
                          display: "flex",
                          justifyContent: "space-between",
                        }}
                      >
                        <Typography>Plan:</Typography>
                        <Typography fontWeight="bold">Premium</Typography>
                      </Box>
                      <Box
                        sx={{
                          display: "flex",
                          justifyContent: "space-between",
                        }}
                      >
                        <Typography>Status:</Typography>
                        <Typography color="success.main" fontWeight="bold">
                          Active
                        </Typography>
                      </Box>
                      <Box
                        sx={{
                          display: "flex",
                          justifyContent: "space-between",
                        }}
                      >
                        <Typography>Start Date:</Typography>
                        <Typography>January 1, 2024</Typography>
                      </Box>
                      <Box
                        sx={{
                          display: "flex",
                          justifyContent: "space-between",
                        }}
                      >
                        <Typography>Expiry Date:</Typography>
                        <Typography>December 31, 2024</Typography>
                      </Box>
                      <Box
                        sx={{
                          display: "flex",
                          justifyContent: "space-between",
                        }}
                      >
                        <Typography>Monthly Fee:</Typography>
                        <Typography fontWeight="bold">$9.99</Typography>
                      </Box>
                    </Box>
                  </Box>
                </>
              ) : (
                <>
                  <Box sx={{ mb: 3 }}>
                    <Typography variant="h6" color="primary" gutterBottom>
                      Account Status
                    </Typography>
                    <Box
                      sx={{ display: "flex", flexDirection: "column", gap: 2 }}
                    >
                      <Box
                        sx={{
                          display: "flex",
                          justifyContent: "space-between",
                        }}
                      >
                        <Typography>Plan:</Typography>
                        <Typography fontWeight="bold">Regular</Typography>
                      </Box>
                      <Box
                        sx={{
                          display: "flex",
                          justifyContent: "space-between",
                        }}
                      >
                        <Typography>Status:</Typography>
                        <Typography color="text.secondary" fontWeight="bold">
                          Active
                        </Typography>
                      </Box>
                    </Box>
                  </Box>
                </>
              )}
            </DialogContent>
            <DialogActions sx={{ p: 3, gap: 2 }}>
              {isPremiumMember && id == 1 ? (
                <Button onClick={handleOpenCancelFlow} variant="outlined">
                  Cancel Membership
                </Button>
              ) : (
                <Button
                  onClick={() => {
                    setIsPremiumMember(true);
                    handleMembershipDialogClose();
                  }}
                  variant="outlined"
                  color="primary"
                >
                  Upgrade to Premium
                </Button>
              )}
              <Button onClick={handleMembershipDialogClose} variant="outlined">
                Close
              </Button>
            </DialogActions>
          </Dialog>

          {/* 多步骤取消 Dialog */}
          <Dialog
            open={cancelFlowOpen}
            onClose={() => setCancelFlowOpen(false)}
            maxWidth="sm"
            fullWidth
          >
            <DialogTitle>Cancel Premium Membership</DialogTitle>
            <DialogContent>
              {cancelStep === 0 && (
                <Typography>
                  Are you sure you want to cancel your premium membership?
                </Typography>
              )}
              {cancelStep === 1 && (
                <>
                  <Typography>
                    You will lose the following benefits if you cancel the
                    premium membership:
                  </Typography>
                  <ul className="list-disc pl-6 mt-2 text-sm">
                    <li>Free shipping on all orders</li>
                    <li>Exclusive member discounts</li>
                    <li>Priority customer support</li>
                    <li>Early access to new products</li>
                    <li>Extended return window (60 days)</li>
                  </ul>
                  <Typography
                    className="mt-4 font-bold"
                    style={{ fontWeight: "bold" }}
                  >
                    Are you sure you want to proceed with cancellation?
                  </Typography>
                </>
              )}
              {cancelStep === 2 && (
                <>
                  <Typography>Select a reason for cancellation:</Typography>
                  <RadioGroup
                    value={cancelReason}
                    onChange={(e) => setCancelReason(e.target.value)}
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
              {cancelStep === 3 && (
                <Typography>
                  If you cancel now, reactivating will require eligibility
                  reassessment. Do you still want to proceed?
                </Typography>
              )}
              {cancelStep === 4 && (
                <>
                  <Typography>
                    Please enter your payment password to confirm:
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
              <Button
                onClick={() => setCancelFlowOpen(false)}
                variant="outlined"
                color="primary"
              >
                Close
              </Button>
              <Button
                variant="outlined"
                color="primary"
                onClick={handleNextStep}
              >
                Confirm Cancellation
              </Button>
            </DialogActions>
          </Dialog>

          {/* 成功弹窗 */}
          <TaskCompletionModal
            open={snackbarOpen}
            id={id}
            onClose={() => dispatch(resetCart())}
            targetTaskType={TaskType.CancelMembership}
          />
        </div>
      </nav>
      <Snackbar
        open={openSnackbar}
        autoHideDuration={3000}
        onClose={() => setOpenSnackbar(false)}
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
      >
        <Alert severity="warning" onClose={() => setOpenSnackbar(false)}>
          Please select a reason for cancellation.
        </Alert>
      </Snackbar>
    </>
  );
};

export default Nav;
