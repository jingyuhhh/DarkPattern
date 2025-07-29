import { useParams } from "react-router-dom";
import { getProducts } from "../Shopping/productInfo";
import Nav from "../Nav/Nav";
import { useState, useEffect, useRef } from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogActions from "@mui/material/DialogActions";
import Checkbox from "@mui/material/Checkbox";
import FormControlLabel from "@mui/material/FormControlLabel";
import { useNavigate } from "react-router-dom";
import Product from "../Product/Product";
import { useDispatch } from "react-redux";
import { resetCart } from "../../store/cart";
import { tasks, TaskType } from "../TaskEntry/tasks";
import TaskCompletionModal from "../TaskCompletionModal/TaskCompletionModal";

const UnsubscribeDialog = ({ open, onClose, onConfirm }) => {
  const { id, storeId } = useParams();
  const [confirm, setConfirm] = useState(false);
  const dispatch = useDispatch();

  return (
    <>
      <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth>
        <DialogTitle>Unsubscribe from this store?</DialogTitle>
        <DialogContent>
          <div className="text-gray-700">
            {id === "14" && storeId === "aa"
              ? "Are you sure you want to cancel your memberhip? You’ll lose access to member-only discounts and perks” with options labeled"
              : "Are you sure you want to unsubscribe from this store?"}
          </div>
        </DialogContent>
        <DialogActions>
          <Button onClick={onClose} color="inherit" variant="outlined">
            {id === "14" && storeId === "aa"
              ? "No, I like the discounts"
              : "No, Keep Subscribed"}
          </Button>
          <Button
            onClick={() => {
              onConfirm();
              setConfirm(true);
            }}
            color="inherit"
            variant="outlined"
          >
            {id === "14" && storeId === "aa"
              ? "Yes, I like full price"
              : "Yes, Unsubscribe"}
          </Button>
        </DialogActions>
      </Dialog>
      <TaskCompletionModal
        open={confirm}
        id={id}
        targetTaskType={TaskType.CancelSubscription}
        onClose={() => {
          onClose();
          dispatch(resetCart());
        }}
      />
    </>
  );
};

const StoreDetail = () => {
  const { id, storeId } = useParams();
  const products = getProducts(id);
  const storeProducts = products.filter((product) => product.store === storeId);

  // 根据 JSON 初始化订阅状态（只取这个 store 的第一件商品）
  const initialSubscribed =
    storeProducts.length > 0 ? storeProducts[0].storeSubscribed : false;
  const [isSubscribed, setIsSubscribed] = useState(initialSubscribed);

  const [showModal, setShowModal] = useState(false);
  const [agreeTerms, setAgreeTerms] = useState(false);
  const dispatch = useDispatch();
  const [isAdConsent, setIsAdConsent] = useState(true);
  const [isTrickQuestionConsent, setIsTrickQuestionConsent] = useState(false);
  const [isUnsubscribeMode, setIsUnsubscribeMode] = useState(false);
  const [showCompletionModal, setShowCompletionModal] = useState(false);

  const [canCheckTerms, setCanCheckTerms] = useState(false);
  const [countdown, setCountdown] = useState(5);
  const termsRef = useRef(null);
  const navigate = useNavigate();

  useEffect(() => {
    if (showModal && !isUnsubscribeMode) {
      setCanCheckTerms(false);
      setAgreeTerms(false);
      setCountdown(5);
      const interval = setInterval(() => {
        setCountdown((prev) => {
          if (prev <= 1) {
            clearInterval(interval);
            setCanCheckTerms(true);
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
      return () => clearInterval(interval);
    }
  }, [showModal, isUnsubscribeMode]);

  const handleScroll = () => {
    if (termsRef.current) {
      const { scrollTop, scrollHeight, clientHeight } = termsRef.current;
      if (scrollTop + clientHeight >= scrollHeight - 5) {
        setCanCheckTerms(true);
      }
    }
  };

  const termsContent = `
  Welcome to our store! Before subscribing, please read these Terms of Service carefully:
1. Your subscription allows us to send you updates about this store.
2. You may unsubscribe at any time.
3. Please ensure that you have read and understood all conditions.${
    id == 8
      ? "\n4. By subscribing, you allow us to share your personal information with our partners for service improvement."
      : ""
  }
  `;

  return (
    <>
      <div className="min-h-screen bg-gray-50">
        <Nav />
        <div className="mb-12"></div>

        {/* 订阅弹窗 */}
        <Dialog
          open={showModal && !isUnsubscribeMode}
          onClose={() => {
            setShowModal(false);
            setAgreeTerms(false);
          }}
          maxWidth="sm"
          fullWidth
        >
          <DialogTitle>Subscribe to this store?</DialogTitle>
          <DialogContent>
            <div
              ref={termsRef}
              onScroll={handleScroll}
              style={{
                maxHeight: "140px",
                overflowY: "auto",
                padding: "8px",
                border: "1px solid #ccc",
                borderRadius: "4px",
                marginBottom: "12px",
                whiteSpace: "pre-wrap",
              }}
            >
              {termsContent}
            </div>

            <FormControlLabel
              control={
                <Checkbox
                  checked={agreeTerms}
                  onChange={(e) => setAgreeTerms(e.target.checked)}
                  color="primary"
                  disabled={!canCheckTerms}
                />
              }
              label={
                canCheckTerms ? (
                  <div className="font-bold text-sm">
                    I have read and agree to{" "}
                    <span className="text-blue-600">the Terms of Service</span>
                  </div>
                ) : (
                  `Please read the Terms (${countdown}s)`
                )
              }
            />

            {id == 5 && (
              <FormControlLabel
                control={
                  <Checkbox
                    checked={isAdConsent}
                    onChange={(e) => setIsAdConsent(e.target.checked)}
                    color="primary"
                  />
                }
                label={
                  <span className="font-bold text-sm">
                    I agree to share my information for personalized advertising
                  </span>
                }
              />
            )}
            {id == 7 && (
              <FormControlLabel
                control={
                  <Checkbox
                    checked={isTrickQuestionConsent}
                    onChange={(e) =>
                      setIsTrickQuestionConsent(e.target.checked)
                    }
                    color="primary"
                  />
                }
                label={
                  <span className="font-bold text-sm">
                    Uncheck to opt out of sharing my information for
                    personalized advertising
                  </span>
                }
              />
            )}
            {id == 10 && (
              <div className="text-sm text-gray-700">
                By subscribing, you allow us to share your personal information
                with our partners for service improvement.
              </div>
            )}
          </DialogContent>
          <DialogActions>
            <Button
              onClick={() => {
                setShowModal(false);
                setAgreeTerms(false);
              }}
              color="inherit"
              variant="outlined"
            >
              Cancel
            </Button>
            <Button
              onClick={() => {
                setIsSubscribed(true);
                setShowModal(false);
                setAgreeTerms(false);
                setShowCompletionModal(true); // ✅ 订阅成功后弹出 TaskCompletionModal
              }}
              color="amazon"
              variant="contained"
              disabled={!agreeTerms}
            >
              Confirm
            </Button>
          </DialogActions>
        </Dialog>

        {/* 取消订阅弹窗 */}
        <UnsubscribeDialog
          open={showModal && isUnsubscribeMode}
          onClose={() => {
            setShowModal(false);
            setIsUnsubscribeMode(false);
          }}
          onConfirm={() => {
            setIsSubscribed(false);
            setShowModal(false);
            setIsUnsubscribeMode(false);
          }}
        />

        {/* 店铺主体内容 */}
        <div className="max-w-5xl mx-auto bg-white rounded-lg shadow p-6">
          <div className="flex justify-between items-center mb-6">
            <h1 className="text-3xl font-bold text-[#0f1111]">
              Store: {storeId}
            </h1>
            <Button
              variant={!isSubscribed ? "contained" : "outlined"}
              onClick={() => {
                if (isSubscribed) {
                  setIsUnsubscribeMode(true);
                  setShowModal(true);
                } else {
                  setShowModal(true);
                }
              }}
              color="amazon"
              style={{
                borderRadius: "9999px",
                textTransform: "none",
                fontWeight: 500,
              }}
            >
              {isSubscribed ? "Subscribed" : "Subscribe"}
            </Button>
          </div>
          <p className="mt-2 text-sm text-[#565959] max-w-3xl mb-8">
            Welcome to our store! Discover our carefully selected collection of
            products designed to provide you with the best quality and value.
            Subscribe to get updates on new arrivals, exclusive deals, and
            personalized recommendations.
          </p>

          {storeProducts.length === 0 ? (
            <p className="text-gray-500 text-lg">
              No products found for this store.
            </p>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {storeProducts.map((product, idx) => (
                <Product
                  product={product}
                  onClick={() =>
                    navigate(`/task/${id}/productDetail/${product.id}`)
                  }
                />
              ))}
            </div>
          )}
        </div>
      </div>

      {/* ✅ 订阅完成弹窗 */}
      <TaskCompletionModal
        open={showCompletionModal}
        onClose={() => {
          setShowCompletionModal(false);
          dispatch(resetCart());
        }}
        id={id}
        targetTaskType={TaskType.SignSubscription}
      />
    </>
  );
};

export default StoreDetail;
