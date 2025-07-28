import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Button, Checkbox, IconButton } from "@mui/material";
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
  const [selectedItems, setSelectedItems] = useState(
    items.reduce((acc, item) => ({ ...acc, [item.id]: true }), {})
  );
  const [hiddenItemSelected, setHiddenItemSelected] = useState(true);

  const handleCheckboxChange = (id, isChecked) => {
    setSelectedItems((prev) => ({ ...prev, [id]: isChecked }));
  };

  const getHiddenItem = () => {
    if (id === "3") {
      const cartItemIds = items.map((item) => item.id);
      const availableItems = shoes.filter(
        (item) => !cartItemIds.includes(item.id)
      );
      if (availableItems.length > 0) return availableItems[0];
    }
    return null;
  };

  const hiddenItem = getHiddenItem();

  const total =
    items
      .filter((item) => selectedItems[item.id])
      .reduce((sum, item) => sum + item.price * item.quantity, 0) +
    (hiddenItem && hiddenItemSelected && hiddenItemQuantity > 0
      ? hiddenItem.price * hiddenItemQuantity
      : 0);

  const totalItems =
    items
      .filter((item) => selectedItems[item.id])
      .reduce((sum, item) => sum + item.quantity, 0) +
    (hiddenItem && hiddenItemSelected ? hiddenItemQuantity : 0);

  return (
    <>
      <Nav />
      <div className="max-w-7xl mx-auto px-6 py-4">
        {/* <Button
          onClick={() => navigate(-1)}
          startIcon={<ArrowBackIcon />}
          className="mb-4"
        >
          Return
        </Button> */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
          {/* 左侧商品列表 */}
          <div className="md:col-span-8">
            <h1 className="text-2xl font-semibold text-[#0f1111] mb-2">
              Shopping Cart
            </h1>
            <div className="border-t"></div>
            {items.map((item) => (
              <div
                key={item.id}
                className="flex py-4 border-b items-start space-x-4"
              >
                <Checkbox
                  checked={!!selectedItems[item.id]}
                  onChange={(e) =>
                    handleCheckboxChange(item.id, e.target.checked)
                  }
                />
                <img
                  src={item.image}
                  alt={item.name}
                  className="w-28 h-28 object-contain border rounded"
                />
                <div className="flex-1">
                  <p className="text-lg text-[#0f1111] font-medium">
                    {item.name}
                  </p>
                  <p className="text-green-600 text-sm font-semibold">
                    In Stock
                  </p>
                  <p className="text-sm text-gray-700">Size: 6.5</p>
                  <p className="text-sm text-gray-700 mb-2">
                    Color: White/Black/Grey
                  </p>
                  <div className="flex items-center space-x-2">
                    <div className="flex items-center border border-gray-300 rounded-full px-3 py-1">
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
                      <span className="mx-2 text-base font-semibold w-6 text-center select-none">
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
                </div>
                <div className="text-lg font-semibold">${item.price}</div>
              </div>
            ))}
            {hiddenItem && hiddenItemQuantity > 0 && (
              <div className="flex py-4 border-b items-start space-x-4">
                <Checkbox
                  checked={hiddenItemSelected}
                  onChange={(e) => setHiddenItemSelected(e.target.checked)}
                />
                <img
                  src={hiddenItem.image}
                  alt={hiddenItem.name}
                  className="w-28 h-28 object-contain border rounded"
                />
                <div className="flex-1">
                  <p className="text-lg text-[#0f1111] font-medium">
                    {hiddenItem.name}
                  </p>
                  <p className="text-green-600 text-sm font-semibold">
                    In Stock
                  </p>
                  <div className="text-sm text-gray-500">
                    Recommended based on your shopping history
                  </div>
                  <div className="flex items-center mt-2">
                    <div className="flex items-center border border-gray-300 rounded-full px-3 py-1">
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
                      <span className="mx-2 text-base font-semibold w-6 text-center select-none">
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
                </div>
                <div className="text-lg font-semibold">${hiddenItem.price}</div>
              </div>
            )}
          </div>

          {/* 右侧结算框 */}
          <div className="md:col-span-4 mt-16">
            <div className="border rounded p-4 space-y-3 shadow-sm">
              {/* <p className="text-green-700 text-sm font-medium">
                ✓ Your order qualifies for FREE delivery.
              </p> */}
              <p className="text-lg">
                Subtotal ({totalItems} items):{" "}
                <span className="font-bold">${total.toFixed(2)}</span>
              </p>
              <div className="flex items-center space-x-2">
                <Checkbox />
                <p className="text-sm text-gray-700">
                  This order contains a gift
                </p>
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
                  fontSize: "16px",
                  padding: "10px 0",
                }}
                onClick={() => navigate(`/task/${id}/checkout`)}
              >
                Proceed to checkout
              </Button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default CartDetail;
