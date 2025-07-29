import Product from "../Product/Product.jsx";
import Nav from "../Nav/Nav.jsx";
import { useNavigate, useParams } from "react-router-dom";
import { getProducts } from "./productInfo.js";

function Shopping() {
  const navigate = useNavigate();
  const { id } = useParams();
  const products = getProducts(id);

  return (
    <div>
      <Nav />
      <div className="px-8 py-4">
        {/* Amazon 风格标题 & 提示 */}
        <h2 className="text-[20px] leading-snug font-bold text-[#0f1111] mb-1">
          Results
        </h2>
        <p className="text-[14px] leading-5 font-normal text-[#565959] mb-6">
          Check each product page for other buying options. Price and other
          details may vary based on product size and color.
        </p>

        {/* 产品网格 */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))",
            gap: "16px",
          }}
          className="p-2"
        >
          {products.map((item, index) => (
            <Product
              key={index}
              onClick={() => navigate(`/task/${id}/productDetail/${index}`)}
              product={item}
              ad={id == 2 ? [0, 1, 4].includes(index) : false}
              productIndex={index}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

export default Shopping;
