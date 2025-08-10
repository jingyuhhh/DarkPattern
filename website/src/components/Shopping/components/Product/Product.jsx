import { Star } from "@mui/icons-material";
import { useDispatch } from "react-redux";
import { addToCart } from "../../../../store/cart";
import { useParams } from "react-router-dom";
import { useState } from "react";
import useGlobalCountdown from "../../../../hooks/useGlobalCountdown";
import TaskCompletionModal from "../../../TaskCompletionModal/TaskCompletionModal";
import { TaskType } from "../../../../data/tasks";
import Snackbar from "@mui/material/Snackbar";
import Alert from "@mui/material/Alert";

function Product({ onClick, product }) {
  const dispatch = useDispatch();
  const { id } = useParams();
  const [adOpen, setAdOpen] = useState(false);
  const [snackbarOpen, setSnackbarOpen] = useState(false);

  // Always call the hook, but only use the result when needed
  const timeLeft = useGlobalCountdown(
    `product_${String(product.id)}`,
    5 * 54 * 60
  );
  const shouldShowCountdown = id === "15" && product.urgency;
  const displayTimeLeft = shouldShowCountdown ? timeLeft : 0;

  const formatTime = (seconds) => {
    const hrs = String(Math.floor(seconds / 3600)).padStart(2, "0");
    const mins = String(Math.floor((seconds % 3600) / 60)).padStart(2, "0");
    const secs = String(seconds % 60).padStart(2, "0");
    return `${hrs}:${mins}:${secs}`;
  };
  const ad = id === "2" && product.ad;

  // 新增：iframe状态
  const [iframeUrl, setIframeUrl] = useState(null);

  const handleClick = ad
    ? () => {
        setIframeUrl(
          "https://www.officedepot.com/a/products/6358273/Glad-ForceFlexPlus-Large-Drawstring-Trash-Bags/?utm_source=google&utm_medium=sag?utm_source=google&utm_medium=cpc&utm_campaign=pla_cor_evg_cbfs_general_unid_prch_non-match&mediacampaignid=71700000119141359&utm_source=google&utm_medium=cpc&gad_source=2&gad_campaignid=21410297904&gclid=CjwKCAjwqKzEBhANEiwAeQaPVa0GyIdyIYreaEZj4oTFs5pSJifs3cU_TvqenKu279ljoO-FIKIUAhoCG2gQAvD_BwE&gclsrc=aw.ds"
        );
        setTimeout(() => {
          setAdOpen(true);
        }, 3000);
      }
    : onClick;

  return (
    <div className="border border-gray-200 rounded-md flex flex-col cursor-pointer relative p-3">
      {/* 商品图 */}
      <img
        src={product.image}
        alt="Product"
        onClick={handleClick}
        className="mb-3 w-full object-contain h-16 sm:h-20 md:h-24 lg:h-28 xl:h-70"
      />
      {/* 店铺名 */}
      {/* <p className="text-sm text-[#0f1111] font-medium">{product.store}</p> */}
      {/* 商品名 */}
      <p
        className="text-base text-[#0f1111] leading-snug"
        onClick={handleClick}
      >
        {product.name}
      </p>
      {/* 紧迫性 & 社会证明 */}
      {id === "9" && product.socialProof && (
        <span className="text-sm text-red-500 font-bold my-1">
          300+ bought in past month
        </span>
      )}
      {id === "12" && product.scarcity && (
        <span className="text-red-600 text-sm font-semibold">
          Only 3 left in stock — order soon.
        </span>
      )}
      {id === "15" && product.urgency && (
        <div className="flex items-center space-x-2 my-1">
          <span className="bg-[#7fda69] text-black text-xs font-semibold px-2 py-1 ">
            Save 30%
          </span>
          <span className="text-red-600 text-sm font-semibold">
            Deal ends in {formatTime(displayTimeLeft)}
          </span>
        </div>
      )}
      {id === "6" && product.emotional && (
        <p className="text-green-600 text-base font-semibold mt-2">
          A small choice today for a healthier, happier you.
        </p>
      )}
      {ad && <p className="text-xs text-gray-500 mt-1">Advertisement</p>}

      {/* 价格 */}
      <div className="flex items-baseline space-x-2" onClick={handleClick}>
        <span className="text-[28px] text-[#0f1111] font-semibold">
          ${product.price}
        </span>
      </div>

      <div
        className="mt-3"
        onClick={() => {
          if (ad) {
            handleClick();
            return;
          }
          dispatch(
            addToCart({
              id: product.id,
              name: product.name,
              price: product.price,
              image: product.image,
            })
          );
          setSnackbarOpen(true);
        }}
      >
        <button className="w-full bg-[#ffd814] hover:bg-[#f7ca00] text-black text-sm font-medium rounded-full py-2 shadow-sm border border-[#fcd200] transition">
          Add to cart
        </button>
      </div>

      {/* iframe 弹窗 */}
      {iframeUrl && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white w-11/12 h-5/6 rounded-lg overflow-hidden relative">
            <button
              onClick={() => setIframeUrl(null)}
              className="absolute top-2 right-2 bg-gray-200 px-3 py-1 rounded"
            >
              Close
            </button>
            <iframe
              src={iframeUrl}
              className="w-full h-full"
              title="Ad Content"
            />
          </div>
        </div>
      )}
      <TaskCompletionModal
        id={id}
        open={adOpen}
        targetTaskType={TaskType.BuyProduct}
        formData={{ clickedAd: true }}
      />
      <Snackbar
        open={snackbarOpen}
        autoHideDuration={3000}
        onClose={() => setSnackbarOpen(false)}
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
      >
        <Alert onClose={() => setSnackbarOpen(false)} severity="success">
          Added to cart successfully!
        </Alert>
      </Snackbar>
    </div>
  );
}

export default Product;
