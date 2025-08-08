import { useParams } from "react-router-dom";
import { useState, useEffect, useRef } from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogActions from "@mui/material/DialogActions";
import Checkbox from "@mui/material/Checkbox";
import FormControlLabel from "@mui/material/FormControlLabel";
import Product from "../Shopping/components/Product/Product";
import { useDispatch } from "react-redux";
import { resetCart } from "../../store/cart";
import { TaskType } from "../../data/tasks";
import TaskCompletionModal from "../TaskCompletionModal/TaskCompletionModal";
import Terms from "./components/Terms";
import { getStoreProducts } from "../../data/productInfo";

const UnsubscribeDialog = ({ open, onClose, onConfirm }) => {
  const { id } = useParams();
  const [confirm, setConfirm] = useState(false);
  const dispatch = useDispatch();

  return (
    <>
      <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth>
        <DialogTitle>Unsubscribe this creator?</DialogTitle>
        <DialogContent>
          <div className="text-gray-700">
            {id === "14"
              ? "Unsubscribing now means abandoning a creator who's been sharing their heart and work with you. Are you really okay with that?"
              : "Are you sure you want to unsubscribe"}
          </div>
        </DialogContent>
        <DialogActions>
          <Button onClick={onClose} color="inherit" variant="outlined">
            {id === "14" ? "No, I'll Keep Supporting" : "No, Keep Subscribed"}
          </Button>
          <Button
            onClick={() => {
              onConfirm();
              setConfirm(true);
            }}
            color="inherit"
            variant="outlined"
          >
            {id === "14" ? "Yes, I am cold-blooded" : "Yes, Unsubscribe"}
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
  const { id } = useParams();
  const storeInfo = getStoreProducts(id);

  const [isSubscribed, setIsSubscribed] = useState(storeInfo.subscribed);

  const [showModal, setShowModal] = useState(false);
  const [agreeTerms, setAgreeTerms] = useState(false);
  const dispatch = useDispatch();
  const [isAdConsent, setIsAdConsent] = useState(true);
  const [isAdConsentNon, setIsAdConsentNon] = useState(false);
  const [isTrickQuestionConsent, setIsTrickQuestionConsent] = useState(false);
  const [isUnsubscribeMode, setIsUnsubscribeMode] = useState(false);
  const [showCompletionModal, setShowCompletionModal] = useState(false);

  const [canCheckTerms, setCanCheckTerms] = useState(false);
  const [countdown, setCountdown] = useState(5);
  const termsRef = useRef(null);

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

  return (
    <>
      <div className="min-h-screen bg-gray-50">
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
                maxHeight: "350px",
                overflowY: "auto",
                padding: "8px",
                border: "1px solid #ccc",
                borderRadius: "4px",
                marginBottom: "12px",
              }}
            >
              <Terms
                extraClause={
                  id == 14
                    ? "By subscribing, you allow us to share and sell your personal data (including but not limited to location, contact lists, browsing history, biometric data, and private messages) with our partners. You acknowledge and agree that we can introduce subscription fees at any time, without prior notice or justification."
                    : null
                }
              />
            </div>

            <FormControlLabel
              control={
                <Checkbox
                  checked={agreeTerms}
                  onChange={(e) => setAgreeTerms(e.target.checked)}
                  color="primary"
                  disabled={!canCheckTerms}
                  sx={{
                    transform: "scale(1.5)", // 放大
                    padding: "8px", // 增加点击区域
                  }}
                />
              }
              label={
                canCheckTerms ? (
                  <div className=" text-base">
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
                    sx={{
                      transform: "scale(1.5)", // 放大
                      padding: "8px", // 增加点击区域
                    }}
                  />
                }
                label={
                  <span className=" text-base">
                    I agree to share my information for personalized advertising
                  </span>
                }
              />
            )}
            {id == 12 && (
              <FormControlLabel
                control={
                  <Checkbox
                    checked={isAdConsentNon}
                    onChange={(e) => setIsAdConsentNon(e.target.checked)}
                    color="primary"
                    sx={{
                      transform: "scale(1.5)", // 放大
                      padding: "8px", // 增加点击区域
                    }}
                  />
                }
                label={
                  <span className=" text-base">
                    I confirm that I am over 18 years old
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
                    sx={{
                      transform: "scale(1.5)", // 放大
                      padding: "8px", // 增加点击区域
                    }}
                    color="primary"
                  />
                }
                label={
                  <span className=" text-base">
                    Do not leave this box unchecked if you would not like to
                    avoid consenting to the sharing of my information for
                    personalized advertising.
                  </span>
                }
              />
            )}
            {id == 11 && (
              <div className="text-sm text-gray-700">
                By subscribing, you allow us to share your personal information
                with our partners for service improvement.
              </div>
            )}
          </DialogContent>
          <DialogActions
            sx={{
              justifyContent: "center", // 居中
              gap: 10, // 按钮之间间距
            }}
          >
            <Button
              onClick={() => {
                setShowModal(false);
                setAgreeTerms(false);
              }}
              color="inherit"
              variant="outlined"
              sx={{
                fontSize: "1rem",
                padding: "12px 24px", // 变大
              }}
            >
              Cancel
            </Button>
            <Button
              onClick={() => {
                setIsSubscribed(true);
                setShowModal(false);
                setAgreeTerms(false);
                setShowCompletionModal(true);
              }}
              color="inherit"
              variant="outlined"
              disabled={!agreeTerms}
              sx={{
                fontSize: "1rem",
                padding: "12px 24px", // 变大
              }}
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

        <div className="max-w-5xl mx-auto bg-white rounded-lg shadow p-6">
          {/* 顶部店铺信息栏 */}
          <div className="flex items-center mb-6">
            {/* 头像 */}
            <img
              src={storeInfo.avatar}
              alt={storeInfo.name}
              className="w-24 h-24 rounded-full object-cover border-2 border-gray-200 mr-6"
            />
            <div className="flex-1">
              <div className="flex items-center space-x-3">
                <h1 className="text-2xl  ">{storeInfo.name}</h1>
                {/* Subscribe/Unsubscribe */}
                <div className="flex gap-2 ml-8">
                  <Button
                    variant="outlined"
                    style={{
                      borderRadius: "8px",
                      textTransform: "none",
                      fontWeight: "600",
                      border: "1px solid #eff1f4",
                      color: "#000",
                      backgroundColor: "#eff1f4",
                      padding: "10px 28px", // 放大按钮
                      fontSize: "1rem", // 增大文字
                    }}
                  >
                    Following
                  </Button>

                  {/* Message */}
                  <Button
                    variant="outlined"
                    style={{
                      borderRadius: "8px",
                      textTransform: "none",
                      fontWeight: "600",
                      border: "1px solid #eff1f4",
                      color: "#000",
                      backgroundColor: "#eff1f4",
                      padding: "10px 28px", // 放大按钮
                      fontSize: "1rem", // 增大文字
                    }}
                  >
                    Message
                  </Button>
                  <Button
                    variant="outlined"
                    onClick={() => {
                      if (isSubscribed) {
                        setIsUnsubscribeMode(true);
                        setShowModal(true);
                      } else {
                        setShowModal(true);
                      }
                    }}
                    style={{
                      borderRadius: "8px",
                      textTransform: "none",
                      fontWeight: "600",
                      border: "1px solid #eff1f4",
                      color: "#000",
                      backgroundColor: "#eff1f4",
                      padding: "10px 28px", // 放大按钮
                      fontSize: "1rem", // 增大文字
                    }}
                  >
                    {isSubscribed ? "Cancel Subscription" : "Subscribe"}
                  </Button>
                </div>
              </div>
              {/* 粉丝数 / 关注数 / 帖子数 */}
              <div className="flex space-x-6 text-gray-700 mt-3">
                <span>
                  <strong>{storeInfo.images.length}</strong> posts
                </span>
                <span>
                  <strong>{storeInfo.followers || "2.3M"}</strong> followers
                </span>
                <span>
                  <strong>{storeInfo.following || "246"}</strong> following
                </span>
              </div>
              {/* 简介 */}
              <p className="text-gray-600 mt-3">{storeInfo.description}</p>
            </div>
          </div>

          {/* 分隔线 */}
          <hr className="my-6" />

          {/* 图片展示区（Instagram风格） */}
          <div className="grid grid-cols-3 gap-2">
            {storeInfo.images.map((image, index) => (
              <div key={index} className="relative group cursor-pointer">
                <img
                  src={image}
                  className="w-full aspect-square object-cover"
                />
              </div>
            ))}
          </div>
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
        formData={{
          adConsent: isAdConsent,
          trickQuestionConsent: isTrickQuestionConsent,
        }}
      />
    </>
  );
};

export default StoreDetail;
