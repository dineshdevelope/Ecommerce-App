import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";
import { FaStar } from "react-icons/fa";

const ProductDetail = ({ cardItems, setcardItems }) => {
  const apiUrl = import.meta.env.VITE_API_URL;

  const [loading, setLoading] = useState(true);
  const [product, setProduct] = useState(null);
  const { id } = useParams();
  const [qty, setQty] = useState(1);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const result = await axios.get(`${apiUrl}` + "/product/" + id);
        setProduct(result.data);
        setLoading(false);
      } catch (error) {
        console.error(error);
        setLoading(false);
      }
    };
    fetchProduct();
  }, [id]);

  const addToCart = () => {
    const itemExits = cardItems.find(
      (item) => item.product._id === product._id
    );

    if (!itemExits) {
      const newItem = { product, qty };
      setcardItems((state) => [...state, newItem]);
      toast.success("CartItem Added Successfully");
    }
  };

  const increaseQty = () => {
    if (product.stock == qty) {
      return;
    }
    setQty((state) => state + 1);
  };

  const decreaseQty = () => {
    if (qty > 1) {
      setQty((state) => state - 1);
    }
  };

  return (
    <div>
      {loading ? (
        <div className="h-screen flex justify-center items-center">
          <button
            disabled
            type="button"
            className="py-2.5 px-5 me-2 text-sm font-medium text-gray-900 bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-2 focus:ring-blue-700 focus:text-blue-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700 inline-flex items-center"
          >
            <svg
              aria-hidden="true"
              role="status"
              className="inline w-4 h-4 me-3 text-gray-200 animate-spin dark:text-gray-600"
              viewBox="0 0 100 101"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                fill="currentColor"
              />
              <path
                d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                fill="#1C64F2"
              />
            </svg>
            Loading...
          </button>
        </div>
      ) : (
        product && (
          <div className="container mx-auto px-4">
            <div className="flex flex-col lg:flex-row justify-between items-center py-8">
              {/* Product Image */}
              <div className="lg:w-1/2 mb-8 lg:mb-0">
                <img
                  src={product.images[0].image}
                  alt={product.name}
                  className="w-full h-auto max-w-lg mx-auto"
                />
              </div>

              {/* Product Details */}
              <div className="lg:w-1/2 lg:pl-8">
                <h3 className="text-2xl font-semibold mb-4">{product.name}</h3>
                <p className="text-gray-500 text-sm mb-4">
                  Product # {product._id}
                </p>

                {/* Rating */}

                <div className="flex items-center mb-2 flex justify-center my-2">
                  <div className="flex gap-1 items-center mx-auto">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <FaStar
                        key={star}
                        size={22}
                        color={star <= product.ratings ? "#ffc107" : "#8a8486"} // Fill based on rating
                      />
                    ))}
                    <p style={{ marginLeft: "10px" }}>
                      Rating:{" "}
                      <span className="text-yellow-800 font-semibold mr-0.5">
                        {product.ratings}
                      </span>
                      /5
                    </p>
                  </div>
                </div>

                <p className="text-2xl font-semibold mb-4">${product.price}</p>

                {/* Quantity Controls */}
                <div className="flex items-center space-x-4 mb-5 sm:mb-8 justify-center">
                  <button
                    className="px-4 py-2 bg-red-500 text-white rounded"
                    onClick={decreaseQty}
                  >
                    -
                  </button>
                  <input
                    type="number"
                    value={qty}
                    readOnly
                    className="w-16 text-center border border-gray-300 rounded"
                  />
                  <button
                    className="px-4 py-2 bg-blue-500 text-white rounded"
                    onClick={increaseQty}
                  >
                    +
                  </button>
                </div>

                {/* Add to Cart Button */}
                <button
                  className="w-full px-6 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
                  onClick={addToCart}
                  disabled={product.stock === 0}
                >
                  Add to Cart
                </button>

                {/* Stock Status */}
                <p className="mt-4">
                  Status:{" "}
                  <span
                    className={
                      product.stock > 0 ? "text-green-500" : "text-red-500"
                    }
                  >
                    {product.stock > 0 ? "In Stock" : "Out of Stock"}
                  </span>
                </p>

                <hr className="my-4" />

                {/* Description */}
                <h4 className="text-xl font-semibold mb-2">Description:</h4>
                <p className="text-gray-700">{product.description}</p>

                {/* Seller Info */}
                <hr className="my-4" />
                <p className="text-sm text-gray-600">
                  Sold by:{" "}
                  <strong className="text-red-500 font-semibold">
                    {product.seller}
                  </strong>
                </p>

                {/* Rating */}
                <div className="flex justify-center mt-4">
                  {/* You can add a review section here */}
                </div>
              </div>
            </div>
          </div>
        )
      )}
    </div>
  );
};

export default ProductDetail;
