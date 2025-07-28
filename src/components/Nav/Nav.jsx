import React, { useState } from "react";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
// import { IconSearch } from "@arco-design/web-react/icon";
import SearchIcon from "@mui/icons-material/Search";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import Badge from "@mui/material/Badge";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import PersonIcon from "@mui/icons-material/Person";
import WorkspacePremium from "@mui/icons-material/WorkspacePremium";
import LogoutIcon from "@mui/icons-material/Logout";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogActions from "@mui/material/DialogActions";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import Snackbar from "@mui/material/Snackbar";
import Alert from "@mui/material/Alert";
import { useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";

const Nav = () => {
  const cartCount = useSelector((state) => state.cart.number);
  const navigate = useNavigate();
  const { id } = useParams();
  const [anchorEl, setAnchorEl] = useState(null);
  const [membershipDialogOpen, setMembershipDialogOpen] = useState(false);
  const [isPremiumMember, setIsPremiumMember] = useState(true);
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const open = Boolean(anchorEl);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleMembershipClick = () => {
    setMembershipDialogOpen(true);
    handleClose();
  };

  const handleMembershipDialogClose = () => {
    setMembershipDialogOpen(false);
  };

  const handleCancelMembership = () => {
    setIsPremiumMember(false);
    setSnackbarOpen(true);
    handleMembershipDialogClose();
  };

  const handleSnackbarClose = () => {
    setSnackbarOpen(false);
  };

  return (
    <nav className="flex items-center justify-end bg-[#141921] px-4 py-2 shadow-md">
      {/* Search Box */}
      {/* <div className="flex items-center bg-gray-100 rounded px-2 py-1 w-2/3">
        <SearchIcon className="text-gray-500 mr-2" />
        <input
          type="text"
          placeholder="Search..."
          className="bg-transparent outline-none w-full text-sm"
        />
      </div> */}
      {/* Icons */}
      <div className="flex items-center space-x-6">
        <div onClick={() => navigate(`/task/${id}/cart`)}>
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
        </div>
        <div
          className={`p-1 rounded-full border-2 cursor-pointer transition-colors ${
            isPremiumMember
              ? "border-yellow-400 hover:border-yellow-500"
              : "border-gray-300 hover:border-gray-400"
          }`}
          onClick={handleClick}
        >
          <AccountCircleIcon className="text-white" fontSize="medium" />
        </div>
        <Menu
          anchorEl={anchorEl}
          open={open}
          onClose={handleClose}
          onClick={handleClose}
          PaperProps={{
            elevation: 3,
            sx: {
              overflow: "visible",
              filter: "drop-shadow(0px 2px 8px rgba(0,0,0,0.32))",
              mt: 1.5,
              "& .MuiAvatar-root": {
                width: 32,
                height: 32,
                ml: -0.5,
                mr: 1,
              },
            },
          }}
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
              primaryTypographyProps={{ fontSize: "0.875rem", fontWeight: 600 }}
              secondaryTypographyProps={{ fontSize: "0.75rem" }}
            />
          </MenuItem>
          {isPremiumMember ? (
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
                primaryTypographyProps={{
                  fontSize: "0.875rem",
                  fontWeight: 600,
                  color: "text.primary",
                }}
                secondaryTypographyProps={{
                  fontSize: "0.75rem",
                  color: "text.secondary",
                }}
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
                primaryTypographyProps={{
                  fontSize: "0.875rem",
                  fontWeight: 600,
                  color: "text.primary",
                }}
                secondaryTypographyProps={{
                  fontSize: "0.75rem",
                  color: "text.secondary",
                }}
              />
            </MenuItem>
          )}
          {/* <MenuItem onClick={handleClose}>
            <ListItemIcon>
              <LogoutIcon fontSize="small" />
            </ListItemIcon>
            <ListItemText primary="Logout" />
          </MenuItem> */}
        </Menu>

        {/* Membership Dialog */}
        <Dialog
          open={membershipDialogOpen}
          onClose={handleMembershipDialogClose}
          maxWidth="sm"
          fullWidth
        >
          <DialogTitle sx={{ display: "flex", alignItems: "center", gap: 1 }}>
            {isPremiumMember ? (
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
            {isPremiumMember ? (
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
                        alignItems: "center",
                      }}
                    >
                      <Typography variant="body1">Plan:</Typography>
                      <Typography variant="body1" fontWeight="bold">
                        Premium
                      </Typography>
                    </Box>
                    <Box
                      sx={{
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "center",
                      }}
                    >
                      <Typography variant="body1">Status:</Typography>
                      <Typography
                        variant="body1"
                        color="success.main"
                        fontWeight="bold"
                      >
                        Active
                      </Typography>
                    </Box>
                    <Box
                      sx={{
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "center",
                      }}
                    >
                      <Typography variant="body1">Start Date:</Typography>
                      <Typography variant="body1">January 1, 2024</Typography>
                    </Box>
                    <Box
                      sx={{
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "center",
                      }}
                    >
                      <Typography variant="body1">Expiry Date:</Typography>
                      <Typography variant="body1">December 31, 2024</Typography>
                    </Box>
                    <Box
                      sx={{
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "center",
                      }}
                    >
                      <Typography variant="body1">Monthly Fee:</Typography>
                      <Typography variant="body1" fontWeight="bold">
                        $9.99
                      </Typography>
                    </Box>
                  </Box>
                </Box>

                <Box sx={{ mb: 3 }}>
                  <Typography variant="h6" color="primary" gutterBottom>
                    Premium Benefits
                  </Typography>
                  <Box
                    sx={{ display: "flex", flexDirection: "column", gap: 1 }}
                  >
                    <Typography variant="body2">
                      • Free shipping on all orders
                    </Typography>
                    <Typography variant="body2">
                      • Exclusive member discounts
                    </Typography>
                    <Typography variant="body2">
                      • Priority customer support
                    </Typography>
                    <Typography variant="body2">
                      • Early access to new products
                    </Typography>
                    <Typography variant="body2">
                      • Extended return window (60 days)
                    </Typography>
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
                        alignItems: "center",
                      }}
                    >
                      <Typography variant="body1">Plan:</Typography>
                      <Typography variant="body1" fontWeight="bold">
                        Regular
                      </Typography>
                    </Box>
                    <Box
                      sx={{
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "center",
                      }}
                    >
                      <Typography variant="body1">Status:</Typography>
                      <Typography
                        variant="body1"
                        color="text.secondary"
                        fontWeight="bold"
                      >
                        Active
                      </Typography>
                    </Box>
                  </Box>
                </Box>

                <Box sx={{ mb: 3 }}>
                  <Typography variant="h6" color="primary" gutterBottom>
                    Upgrade to Premium
                  </Typography>
                  <Box
                    sx={{ display: "flex", flexDirection: "column", gap: 1 }}
                  >
                    <Typography variant="body2">
                      • Free shipping on all orders
                    </Typography>
                    <Typography variant="body2">
                      • Exclusive member discounts
                    </Typography>
                    <Typography variant="body2">
                      • Priority customer support
                    </Typography>
                    <Typography variant="body2">
                      • Early access to new products
                    </Typography>
                    <Typography variant="body2">
                      • Extended return window (60 days)
                    </Typography>
                  </Box>
                </Box>
              </>
            )}

            {/* <Box sx={{ p: 2, bgcolor: "warning.light", borderRadius: 1 }}>
              <Typography variant="body2" color="warning.dark">
                <strong>Note:</strong> Cancelling your membership will remove
                all premium benefits immediately. You can reactivate at any
                time.
              </Typography>
            </Box> */}
          </DialogContent>
          <DialogActions sx={{ p: 3, gap: 2 }}>
            {isPremiumMember ? (
              <Button
                onClick={handleCancelMembership}
                variant="outlined"
                // color="error"
              >
                Cancel Membership
              </Button>
            ) : (
              <Button
                onClick={() => {
                  setIsPremiumMember(true);
                  handleMembershipDialogClose();
                }}
                variant="contained"
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

        {/* Success Snackbar */}
        <Snackbar
          open={snackbarOpen}
          autoHideDuration={3000}
          onClose={handleSnackbarClose}
          anchorOrigin={{ vertical: "top", horizontal: "center" }}
        >
          <Alert
            onClose={handleSnackbarClose}
            severity="success"
            sx={{ width: "100%" }}
          >
            Membership cancelled successfully!
          </Alert>
        </Snackbar>
      </div>
    </nav>
  );
};

export default Nav;
