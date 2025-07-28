import Product from "../Product/Product.jsx";
import Nav from "../Nav/Nav.jsx";
import { useNavigate, useParams } from "react-router-dom";
import { shoes } from "./productInfo.js";

function Shopping() {
  const navigate = useNavigate();
  const { id } = useParams();

  // 当 id 为 "2" 时，随机选择 2-3 个产品作为广告
  const getAdProductIndices = () => {
    if (id !== "2") return [];

    const totalProducts = shoes.length;
    const adCount = Math.floor(Math.random() * 2) + 2; // 随机选择 2-3 个广告
    const adIndices = [];

    while (adIndices.length < adCount) {
      const randomIndex = Math.floor(Math.random() * totalProducts);
      if (!adIndices.includes(randomIndex)) {
        adIndices.push(randomIndex);
      }
    }

    return adIndices;
  };

  const adProductIndices = getAdProductIndices();

  return (
    <div>
      <Nav />
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))",
          gap: "16px",
        }}
        className="p-8"
      >
        {shoes.map((item, index) => (
          <Product
            key={index}
            onClick={() => navigate(`/task/${id}/productDetail/${index}`)}
            image={item.image}
            name={item.name}
            price={item.price}
            ad={adProductIndices.includes(index)}
            productIndex={index}
          />
        ))}
      </div>
    </div>
  );
}

export default Shopping;
