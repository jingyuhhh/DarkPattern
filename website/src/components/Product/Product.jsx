import { Star } from "@mui/icons-material";
import { useDispatch } from "react-redux";
import { addToCart } from "../../store/cart";
import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import useGlobalCountdown from "../../hooks/useGlobalCountdown";

function Product({ onClick, product }) {
  const dispatch = useDispatch();
  const { id } = useParams();
  const timeLeft =
    id === "13" && product.urgency
      ? useGlobalCountdown(`product_${String(product.id)}`, 5 * 54 * 60)
      : 0;

  const formatTime = (seconds) => {
    const hrs = String(Math.floor(seconds / 3600)).padStart(2, "0");
    const mins = String(Math.floor((seconds % 3600) / 60)).padStart(2, "0");
    const secs = String(seconds % 60).padStart(2, "0");
    return `${hrs}:${mins}:${secs}`;
  };
  const ad = id === "2" && product.ad;

  const handleClick = ad
    ? () =>
        window.open(
          "https://www.amazon.com/Hefty-Strong-Kitchen-Gallon-Garbage/dp/B01BZ0LXL8/ref=sr_1_6?crid=37UJGZ3FEEQM3&dib=eyJ2IjoiMSJ9.u7-01VvDS0gMDSOpRcxO2iGYMe4rw8sL8eaVTBFWAfntZsCVVJNkglLfTEAktw9imiHVujHfaJt7_sr0hXvW6ZYcKSNPgtE-M6riShxRU98fr4DQafKaC2eXrUu-2OPJVY-aGSdnxQF6gdxSkHmIDRHw_SRhi3Hby7fCUVPdVgNae4pHRrIgnK1vTDDpp8vguwsHJoGzoS5wAX57LdGOlHnybvhl6ja2T36qSBXJ_mnxfiqTN595IOy2f86RPY4IndjlCOA7mbwIBQnyRQdCsBbJxymCX5MFMecwpDwKEkI.OZBTvUglql_sQr4nd9kJYUvtDQEhQMwPwqgwRyGRThk&dib_tag=se&keywords=trash+bag&qid=1753835428&sprefix=packing+tape%2Caps%2C153&sr=8-6"
        )
    : onClick;

  return (
    <div className="border border-gray-200 rounded-md flex flex-col cursor-pointer relative p-3 ">
      {/* 商品图 */}
      <img
        src={product.image}
        alt="Product"
        onClick={handleClick}
        className="mb-3 w-full object-contain h-70"
      />
      {/* 店铺名 */}
      <p className="text-sm text-[#0f1111] font-medium">{product.store}</p>
      {/* 商品名 */}
      <p
        className="text-base text-[#0f1111] leading-snug"
        onClick={handleClick}
      >
        {product.name}
      </p>
      {/* 紧迫性 & 社会证明 */}
      {id === "12" && product.socialProof && (
        <span className="text-sm text-red-500 font-bold my-1">
          300+ bought in past month
        </span>
      )}
      {id === "11" && product.scarcity && (
        <span className="text-red-600 text-sm font-semibold">
          Only 3 left in stock
        </span>
      )}
      {id === "13" && product.urgency && (
        <div className="flex items-center space-x-2 my-1">
          <span className="bg-[#7fda69] text-black text-xs font-semibold px-2 py-1 ">
            Save 30%
          </span>
          <span className="text-red-600 text-sm font-semibold">
            Deal ends in {formatTime(timeLeft)}
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
        }}
      >
        <button className="w-full bg-[#ffd814] hover:bg-[#f7ca00] text-black text-sm font-medium rounded-full py-2 shadow-sm border border-[#fcd200] transition">
          Add to cart
        </button>
      </div>
      {/* )} */}
    </div>
  );
}

export default Product;
