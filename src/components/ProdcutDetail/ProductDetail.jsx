import { useParams, useNavigate } from "react-router-dom";
import Nav from "../Nav/Nav";
import { shoes } from "../Shopping/productInfo";
import Button from "@mui/material/Button";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { useDispatch } from "react-redux";
import { addToCart } from "../../store/cart";

const ProductDetail = () => {
  const { id, productId } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const product = shoes[parseInt(productId, 10)];

  //   if (!product) {
  //     return (
  //       <div className="min-h-screen bg-gray-50">
  //         <Nav />
  //         <Button
  //           variant="outlined"
  //           onClick={() => navigate(-1)}
  //           className="!absolute top-6 left-6 z-10"
  //           startIcon={<ArrowBackIcon />}
  //         >
  //           返回
  //         </Button>
  //         <div className="flex flex-col items-center justify-center h-96">
  //           <p className="text-xl text-gray-500">商品未找到</p>
  //         </div>
  //       </div>
  //     );
  //   }

  return (
    <div className="min-h-screen bg-gray-50 relative">
      <Nav />
      <Button
        // variant="outlined"
        onClick={() => navigate(-1)}
        // className="!absolute top-6 left-6 z-10"
        startIcon={<ArrowBackIcon />}
      >
        Return
      </Button>
      <div className="max-w-2xl mx-auto bg-white rounded-lg shadow-md p-6 flex flex-col items-center">
        <img
          src={product.image}
          alt={product.name}
          className="w-64 h-64 object-contain rounded mb-6 border"
        />
        <div className="w-full flex flex-col items-start">
          <h2 className="text-2xl font-bold mb-2">{product.name}</h2>
          <p className="text-xl text-blue-600 font-semibold mb-4">
            ${product.price}
          </p>
          <span
            style={{
              cursor: "pointer",
              marginBottom: 16,
              textTransform: "none",
              color: "#1976d2",
              display: "inline-block",
            }}
            onClick={() => navigate(`/task/${id}/store/${product.store}`)}
            onMouseOver={(e) =>
              (e.currentTarget.style.textDecoration = "underline")
            }
            onMouseOut={(e) => (e.currentTarget.style.textDecoration = "none")}
          >
            Visit the store
          </span>
          <Button
            variant="contained"
            color="primary"
            size="large"
            className="w-full"
            style={{ marginBottom: 16 }}
            onClick={() =>
              dispatch(
                addToCart({
                  id: parseInt(productId, 10),
                  name: product.name,
                  price: product.price,
                  image: product.image,
                })
              )
            }
          >
            Add to Cart
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;
