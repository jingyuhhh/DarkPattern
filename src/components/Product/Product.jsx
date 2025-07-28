import { Star } from "@mui/icons-material";
import { useDispatch } from "react-redux";
import { addToCart } from "../../store/cart";

function Product({ onClick, product, ad = false }) {
  const dispatch = useDispatch();
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
        className="mb-3 w-full object-contain"
      />

      {/* 颜色选择（模拟小圆点） */}
      {/* <div className="flex items-center gap-1 mb-2">
        {[...Array(5)].map((_, i) => (
          <div
            key={i}
            className="w-5 h-5 rounded-full border border-gray-300 bg-gray-200"
          ></div>
        ))}
        <span className="text-sm text-blue-600 ml-1">+89</span>
      </div> */}

      {/* 店铺名 */}
      <p className="text-sm text-[#0f1111] font-medium">{product.store}</p>

      {/* 商品名 */}
      <p
        className="text-base text-[#0f1111] leading-snug"
        onClick={handleClick}
      >
        {product.name}
      </p>

      {/* 星级评分 */}
      {/* <div className="flex items-center text-sm text-[#007185] my-1">
        <span className="flex items-center text-[#f59e0b] mr-1">★★★★☆</span>
        <span className="ml-1 text-blue-600 text-sm">(5.1K)</span>
      </div> */}

      {/* 价格 */}
      <div className="flex items-baseline space-x-2" onClick={handleClick}>
        <span className="text-[28px] text-[#0f1111] font-semibold">
          ${product.price}
        </span>
        {/* <span className="text-sm text-gray-500 line-through">$75.00</span> */}
      </div>

      {/* Prime 信息 & 配送时间 */}
      {/* <p className="text-sm text-[#007185] mt-1">
        Prime <span className="text-black">members</span> get FREE delivery
      </p>
      <p className="text-sm text-black font-semibold">Overnight 7 AM - 11 AM</p>
      <p className="text-sm text-black">
        Or Non-members get FREE delivery{" "}
        <span className="font-semibold">Sat, Aug 2</span>
      </p> */}

      {/* Add to cart 按钮 */}
      {!ad && (
        <div
          className="mt-3"
          onClick={() =>
            dispatch(
              addToCart({
                id: product.id,
                name: product.name,
                price: product.price,
                image: product.image,
              })
            )
          }
        >
          <button className="w-full bg-[#ffd814] hover:bg-[#f7ca00] text-black text-sm font-medium rounded-full py-2 shadow-sm border border-[#fcd200] transition">
            Add to cart
          </button>
        </div>
      )}
    </div>
  );
}

export default Product;
