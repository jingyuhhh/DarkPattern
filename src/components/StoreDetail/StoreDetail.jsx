import { useParams } from "react-router-dom";
import { shoes } from "../Shopping/productInfo";
import Nav from "../Nav/Nav";
import { useState } from "react";
// Material UI imports
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogActions from "@mui/material/DialogActions";
import Checkbox from "@mui/material/Checkbox";
import FormControlLabel from "@mui/material/FormControlLabel";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { useNavigate } from "react-router-dom";

const StoreDetail = () => {
  const { id, storeId } = useParams();
  const storeProducts = shoes.filter((product) => product.store === storeId);
  const [showModal, setShowModal] = useState(false);
  const [agreeTerms, setAgreeTerms] = useState(false);
  const [isSubscribed, setIsSubscribed] = useState(false);
  const [isUnsubscribeMode, setIsUnsubscribeMode] = useState(false);
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gray-50">
      <Nav />
      <Button
        // variant="outlined"
        onClick={() => navigate(-1)}
        // className="!absolute top-6 left-6 z-10"
        startIcon={<ArrowBackIcon />}
      >
        Return
      </Button>
      <Dialog
        open={showModal}
        onClose={() => {
          setShowModal(false);
          setAgreeTerms(false);
          setIsUnsubscribeMode(false);
        }}
      >
        <DialogTitle>
          {isUnsubscribeMode
            ? "Unsubscribe this store?"
            : "Subscribe this store?"}
        </DialogTitle>
        <DialogContent>
          {isUnsubscribeMode ? (
            <div>Are you sure you want to unsubscribe from this store?</div>
          ) : (
            <FormControlLabel
              control={
                <Checkbox
                  checked={agreeTerms}
                  onChange={(e) => setAgreeTerms(e.target.checked)}
                  name="agreeTerms"
                  color="primary"
                />
              }
              label="I agree to the terms"
            />
          )}
        </DialogContent>
        <DialogActions>
          <Button
            onClick={() => {
              setShowModal(false);
              setAgreeTerms(false);
              setIsUnsubscribeMode(false);
            }}
            color="inherit"
          >
            Cancel
          </Button>
          {isUnsubscribeMode ? (
            <Button
              onClick={() => {
                setIsSubscribed(false);
                setShowModal(false);
                setIsUnsubscribeMode(false);
              }}
              color="primary"
              variant="contained"
            >
              Confirm
            </Button>
          ) : (
            <Button
              onClick={() => {
                setIsSubscribed(true);
                setShowModal(false);
                setAgreeTerms(false);
              }}
              color="primary"
              variant="contained"
              disabled={!agreeTerms}
            >
              Confirm
            </Button>
          )}
        </DialogActions>
      </Dialog>
      <div className="max-w-2xl mx-auto bg-white rounded-lg shadow-md p-6">
        <h1 className="text-3xl font-bold mb-4 flex items-center gap-4">
          Store: {storeId}
          <Button
            variant={isSubscribed ? "outlined" : "contained"}
            color={isSubscribed ? "success" : "primary"}
            onClick={() => {
              if (isSubscribed) {
                setIsUnsubscribeMode(true);
                setShowModal(true);
              } else {
                setShowModal(true);
              }
            }}
            sx={{ ml: 2 }}
          >
            {isSubscribed ? "Subscribed" : "Subscribe"}
          </Button>
        </h1>
        {storeProducts.length === 0 ? (
          <p className="text-gray-500">No products found for this store.</p>
        ) : (
          <ul className="space-y-4">
            {storeProducts.map((product, idx) => (
              <li
                key={idx}
                className="group flex items-center space-x-4 cursor-pointer transition hover:bg-blue-50 rounded-lg relative"
                style={{ position: "relative" }}
                onClick={() =>
                  navigate(`/task/${id}/productDetail/${product.id}`)
                }
              >
                <div className="absolute left-0 right-0 -bottom-2 flex justify-center">
                  {idx !== storeProducts.length - 1 && (
                    <div className="w-11/12 h-px bg-gradient-to-r from-transparent via-gray-300 to-transparent" />
                  )}
                </div>
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-20 h-20 object-contain rounded border group-hover:shadow-md transition"
                />
                <div>
                  <div className="text-lg font-semibold group-hover:text-blue-700 transition">
                    {product.name}
                  </div>
                  <div className="text-blue-600 font-bold">
                    ${product.price}
                  </div>
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};

export default StoreDetail;
