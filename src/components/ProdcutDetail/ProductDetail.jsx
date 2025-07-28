import { useParams, useNavigate } from "react-router-dom";
import Nav from "../Nav/Nav";
import { shoes } from "../Shopping/productInfo";
import Button from "@mui/material/Button";
import { useDispatch } from "react-redux";
import { addToCart } from "../../store/cart";
import { useState } from "react";

const ProductDetail = () => {
  const { id, productId } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const product = shoes[parseInt(productId, 10)];

  // 新增：数量状态
  const [quantity, setQuantity] = useState(1);

  return (
    <div className="min-h-screen bg-white">
      <Nav />
      <div className="max-w-7xl mx-auto px-6 py-4">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-6 mt-16">
          {/* 左侧：商品大图 */}
          <div className="md:col-span-5 flex justify-center">
            <img
              src={product.image}
              alt={product.name}
              className="w-full max-w-md object-contain border rounded"
            />
          </div>

          {/* 中间：商品信息 */}
          <div className="md:col-span-5 space-y-3">
            <a
              href="#"
              className="text-sm text-blue-600 hover:underline"
              onClick={() => navigate(`/task/${id}/store/${product.store}`)}
            >
              Visit the {product.store} Store
            </a>
            <h1 className="text-2xl font-semibold text-[#0f1111]">
              {product.name}
            </h1>
            <div className="border-t my-2"></div>
            <div>
              <span className="text-3xl font-bold">${product.price}</span>
            </div>
            <div className="mt-16">
              <p className="font-semibold text-lg mb-1">Product details</p>
              <ul className="text-sm text-gray-700 list-disc pl-5">
                <li>Origin: Imported</li>
                <li>Sole material: Rubber</li>
                <li>Outer material: Polyester</li>
                <li>Closure type: Lace-Up</li>
              </ul>
            </div>
          </div>

          {/* 右侧：购买栏 */}
          <div className="md:col-span-2 border rounded p-4 space-y-3">
            <p className="text-2xl font-bold">${product.price}</p>
            <p className="text-green-600 font-semibold">In Stock</p>
            <div>
              <label className="block text-sm mb-1">Quantity:</label>
              <select
                className="border rounded px-2 py-1 w-full"
                value={quantity}
                onChange={(e) => setQuantity(parseInt(e.target.value))}
              >
                {[1, 2, 3, 4, 5].map((num) => (
                  <option key={num} value={num}>
                    {num}
                  </option>
                ))}
              </select>
            </div>
            <Button
              variant="contained"
              fullWidth
              style={{
                backgroundColor: "#ffd814",
                color: "#000",
                borderRadius: "9999px",
                border: "1px solid #fcd200",
                textTransform: "none",
                fontWeight: 500,
                fontSize: "14px",
              }}
              onClick={() => {
                for (let i = 0; i < quantity; i++) {
                  dispatch(
                    addToCart({
                      id: parseInt(productId, 10),
                      name: product.name,
                      price: product.price,
                      image: product.image,
                    })
                  );
                }
              }}
            >
              Add to Cart
            </Button>
            {/* <Button
              variant="contained"
              fullWidth
              style={{
                backgroundColor: "#ffd814",
                color: "#000",
                borderRadius: "9999px",
                border: "1px solid #ffd814",
                textTransform: "none",
                fontWeight: 500,
                marginTop: "10px",
                fontSize: "14px",
              }}
              onClick={() => {
                navigate(`/task/${id}/checkout`, {
                  state: {
                    product: {
                      id: parseInt(productId, 10),
                      name: product.name,
                      price: product.price,
                      image: product.image,
                      quantity: quantity, // Pass the selected quantity
                    },
                  },
                });
              }}
            >
              Buy Now
            </Button> */}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;
