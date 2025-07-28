import { useParams } from "react-router-dom";
import { shoes } from "../Shopping/productInfo";
import Nav from "../Nav/Nav";
import { useState, useEffect, useRef } from "react";
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
  const [isAdConsent, setIsAdConsent] = useState(true);
  const [isTrickQuestionConsent, setIsTrickQuestionConsent] = useState(false);
  const [isUnsubscribeMode, setIsUnsubscribeMode] = useState(false);

  // 5秒倒计时 + 滚动
  const [canCheckTerms, setCanCheckTerms] = useState(false);
  const [countdown, setCountdown] = useState(5);
  const [hasScrolledToBottom, setHasScrolledToBottom] = useState(false);
  const termsRef = useRef(null);

  const navigate = useNavigate();

  // 当弹窗打开时，重置倒计时和滚动状态
  useEffect(() => {
    if (showModal && !isUnsubscribeMode) {
      setCanCheckTerms(false);
      setAgreeTerms(false);
      setHasScrolledToBottom(false);
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

  // 监听滚动
  const handleScroll = () => {
    if (termsRef.current) {
      const { scrollTop, scrollHeight, clientHeight } = termsRef.current;
      if (scrollTop + clientHeight >= scrollHeight - 5) {
        setHasScrolledToBottom(true);
      }
    }
  };

  // 条款内容
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
    <div className="min-h-screen bg-gray-50">
      <Nav />
      <Button onClick={() => navigate(-1)} startIcon={<ArrowBackIcon />}>
        Return
      </Button>
      <Dialog
        open={showModal}
        onClose={() => {
          setShowModal(false);
          setAgreeTerms(false);
          setIsUnsubscribeMode(false);
        }}
        maxWidth="sm"
        fullWidth
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
            <>
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

              {/* 服务条款同意 - 5秒+滚动后才能勾选 */}
              <FormControlLabel
                control={
                  <Checkbox
                    checked={agreeTerms}
                    onChange={(e) => setAgreeTerms(e.target.checked)}
                    name="agreeTerms"
                    color="primary"
                    disabled={!(canCheckTerms && hasScrolledToBottom)}
                  />
                }
                label={
                  canCheckTerms
                    ? hasScrolledToBottom
                      ? "I have read and agree to the Terms of Service"
                      : "Scroll to the bottom to enable agreement"
                    : `Please read the Terms (${countdown}s)`
                }
              />

              {/* 广告隐私信息共享同意（仅 id == 5 时显示） */}
              {id == 5 && (
                <FormControlLabel
                  control={
                    <Checkbox
                      checked={isAdConsent}
                      onChange={(e) => setIsAdConsent(e.target.checked)}
                      name="adConsent"
                      color="primary"
                    />
                  }
                  label="I agree to share my information for personalized advertising"
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
                      name="adConsent"
                      color="primary"
                    />
                  }
                  label="Uncheck to opt out of sharing my information for personalized advertising"
                />
              )}
              {id == 10 && (
                <div className="text-base">
                  By subscribing, you allow us to share your personal
                  information with our partners for service improvement.
                </div>
              )}
            </>
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

      {/* 下面的 store 内容不变 */}
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
                onClick={() =>
                  navigate(`/task/${id}/productDetail/${product.id}`)
                }
              >
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
