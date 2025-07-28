import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Typography, IconButton, Button, Paper } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
import Nav from "../Nav/Nav";
import { addToCart } from "../../store/cart";
import { useNavigate, useParams } from "react-router-dom";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { shoes } from "../Shopping/productInfo";

const CartDetail = () => {
  const items = useSelector((state) => state.cart.items);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { id } = useParams();
  const [hiddenItemQuantity, setHiddenItemQuantity] = useState(1);

  // 为任务3添加隐藏商品
  const getHiddenItem = () => {
    if (id === "3") {
      // 选择一个不在当前购物车中的商品作为隐藏商品
      const cartItemIds = items.map((item) => item.id);
      const availableItems = shoes.filter(
        (item) => !cartItemIds.includes(item.id)
      );
      if (availableItems.length > 0) {
        return availableItems[0];
      }
    }
    return null;
  };

  const hiddenItem = getHiddenItem();

  // 计算总价（包括隐藏商品）
  const total =
    items.reduce((sum, item) => sum + item.price * item.quantity, 0) +
    (hiddenItem && hiddenItemQuantity > 0
      ? hiddenItem.price * hiddenItemQuantity
      : 0);

  return (
    <>
      <Nav />

      <Button
        // variant="outlined"
        onClick={() => navigate(-1)}
        // className="!absolute top-6 left-6 z-10"
        startIcon={<ArrowBackIcon />}
      >
        Return
      </Button>
      <div className="flex flex-col h-[calc(100vh-56px)] bg-gray-50">
        <Typography variant="h6" className="mb-4 font-bold px-6 pt-6">
          Shopping Cart
        </Typography>
        {!items.length && (!hiddenItem || hiddenItemQuantity === 0) ? (
          <div className="p-6 text-center text-gray-400 text-lg">Empty</div>
        ) : (
          <div className="flex-1 overflow-y-auto px-4 pb-32 space-y-4">
            {items.map((item) => (
              <Paper
                key={item.id}
                elevation={2}
                className="flex items-center rounded-xl p-4 bg-white shadow-sm hover:shadow-md transition-shadow duration-200 border border-gray-100"
              >
                <img
                  src={item.image}
                  alt={item.name}
                  className="w-20 h-20 object-contain rounded-lg mr-6 border border-gray-200 bg-gray-50"
                />
                <div className="flex-1 flex flex-col justify-center">
                  <div className="text-m font-semibold text-gray-800 mb-1 break-words">
                    {item.name}
                  </div>
                  <div className="text-blue-600 font-bold text-base">
                    ${item.price}
                  </div>
                </div>
                <div className="flex flex-col items-end ml-6">
                  <div className="flex items-center bg-gray-100 rounded-lg px-2 py-1">
                    <IconButton
                      size="small"
                      onClick={() =>
                        dispatch({
                          type: "cart/decreaseQuantity",
                          payload: { id: item.id },
                        })
                      }
                      className="!p-1"
                    >
                      <RemoveIcon fontSize="small" />
                    </IconButton>
                    <span className="mx-2 text-base font-semibold w-8 text-center select-none">
                      {item.quantity}
                    </span>
                    <IconButton
                      size="small"
                      onClick={() =>
                        dispatch(
                          addToCart({
                            id: item.id,
                            name: item.name,
                            price: item.price,
                            image: item.image,
                          })
                        )
                      }
                      className="!p-1"
                    >
                      <AddIcon fontSize="small" />
                    </IconButton>
                  </div>
                </div>
              </Paper>
            ))}

            {/* 任务3：显示隐藏商品 */}
            {hiddenItem && hiddenItemQuantity > 0 && (
              <Paper
                elevation={2}
                className="flex items-center rounded-xl p-4 bg-white shadow-sm hover:shadow-md transition-shadow duration-200 border border-gray-100 relative"
              >
                {/* <div className="absolute top-2 right-2 bg-red-500 text-white px-2 py-1 rounded text-xs font-bold">
                  推荐商品
                </div> */}
                <img
                  src={hiddenItem.image}
                  alt={hiddenItem.name}
                  className="w-20 h-20 object-contain rounded-lg mr-6 border border-gray-200 bg-gray-50"
                />
                <div className="flex-1 flex flex-col justify-center">
                  <div className="text-m font-semibold text-gray-800 mb-1 break-words">
                    {hiddenItem.name}
                  </div>
                  <div className="text-blue-600 font-bold text-base">
                    ${hiddenItem.price}
                  </div>
                  <div className="text-sm text-gray-500 mt-1">
                    Recommended based on your shopping history
                  </div>
                </div>
                <div className="flex flex-col items-end ml-6">
                  <div className="flex items-center bg-gray-100 rounded-lg px-2 py-1">
                    <IconButton
                      size="small"
                      onClick={() =>
                        setHiddenItemQuantity(
                          Math.max(0, hiddenItemQuantity - 1)
                        )
                      }
                      className="!p-1"
                    >
                      <RemoveIcon fontSize="small" />
                    </IconButton>
                    <span className="mx-2 text-base font-semibold w-8 text-center select-none">
                      {hiddenItemQuantity}
                    </span>
                    <IconButton
                      size="small"
                      onClick={() =>
                        setHiddenItemQuantity(hiddenItemQuantity + 1)
                      }
                      className="!p-1"
                    >
                      <AddIcon fontSize="small" />
                    </IconButton>
                  </div>
                </div>
              </Paper>
            )}
          </div>
        )}
        <div className="fixed left-0 right-0 bottom-0 bg-white border-t shadow-lg px-6 py-4 flex justify-between items-center z-10">
          <div className="text-xl font-bold text-gray-800">
            Total: <span className="text-blue-600">${total.toFixed(2)}</span>
          </div>
          <Button
            variant="contained"
            color="primary"
            size="large"
            onClick={() => navigate(`/task/${id}/checkout`)}
          >
            Checkout
          </Button>
        </div>
      </div>
    </>
  );
};

export default CartDetail;
