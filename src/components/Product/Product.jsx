import { Grid } from "@arco-design/web-react";
import Button from "@mui/material/Button";

const Row = Grid.Row;
const Col = Grid.Col;

function Product({ onClick, image, name, price, ad = false }) {
  return (
    <div
      className="border border-gray-200 rounded-md p-4 flex flex-col cursor-pointer relative"
      onClick={
        ad
          ? () => {
              window.open(
                "https://www.amazon.com/s?k=shoes&crid=1QJ4Y7GQYFZ2T&sprefix=shoes%2Caps%2C283&ref=nb_sb_noss_2"
              );
            }
          : onClick
      }
    >
      {ad && (
        <div className="absolute top-2 right-2 bg-red-500 text-white px-2 py-1 rounded text-xs font-bold">
          Advertisement
        </div>
      )}
      <img src={image} alt="Product" className="mb-4" />
      <p className="text-lg font-bold mb-2 text-left">{name}</p>
      <p className="text-lg text-blue-600 font-semibold  text-left">${price}</p>
      <div className="flex items-center mt-4">
        {/* <Button
          variant="contained"
          color="primary"
          size="large"
          className="w-full"
          style={{ marginBottom: 16 }}
        >
          Add to Cart
        </Button> */}
      </div>
    </div>
  );
}

export default Product;
