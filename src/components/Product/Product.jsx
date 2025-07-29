import { Star } from "@mui/icons-material";
import { useDispatch } from "react-redux";
import { addToCart } from "../../store/cart";
import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import useGlobalCountdown from "../../hooks/useGlobalCountdown";

function Product({ onClick, product, ad = false }) {
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

  const handleClick = ad
    ? () =>
        window.open(
          // TODO ads link
          "https://www.amazon.com/s?k=shoes&crid=1QJ4Y7GQYFZ2T&sprefix=shoes%2Caps%2C283&ref=nb_sb_noss_2"
        )
    : onClick;

  return (
    <div className="border border-gray-200 rounded-md flex flex-col cursor-pointer relative p-3 ">
      {/* Advertisement 标签 */}
      {ad && (
        <div className="absolute top-3 left-3 bg-[#c45500] text-white text-xs font-semibold px-2 py-1 rounded">
          Advertisement
        </div>
      )}
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
        <span className="text-sm text-[#007185] my-1">
          300+ bought in past month
        </span>
      )}
      {id === "11" && product.scarcity && (
        <span className="text-red-600 text-sm font-semibold">
          Only 3 left in stock
        </span>
      )}
      {id === "13" && product.urgency && (
        <span className="text-red-600 text-sm font-semibold">
          Deal ends in {formatTime(timeLeft)}
        </span>
      )}
      {/* 价格 */}
      <div className="flex items-baseline space-x-2" onClick={handleClick}>
        <span className="text-[28px] text-[#0f1111] font-semibold">
          ${product.price}
        </span>
      </div>
      {/* Add to cart 按钮 */}
      {/* {!ad && ( */}
      <div
        className="mt-3"
        onClick={() => {
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
