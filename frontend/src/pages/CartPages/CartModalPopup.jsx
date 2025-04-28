import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { getProductByIdAction } from "../../redux/actions/productThunks";

import ProductImage from "../../components/images/productImage";


const CartModalPopup = ({ productId, onClose }) => {

  const dispatch = useDispatch();

  const [open, setOpen] = useState(true); // default open when mounted
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(false);
  const [quantity, setQuantity] = useState(1);
  const [confirmMessage, setConfirmMessage] = useState("");

  useEffect(() => {

    let isMounted = true;
    setLoading(true);

    const getProductIdDispatch = async () => {
      try {
        const result = await dispatch(getProductByIdAction(productId));
        if (result?.payload && isMounted) {
          setProduct(result.payload.product);
        };
      } catch (error) {
        console.log(error);
      } finally {
        if (isMounted) setLoading(false);
      }
    };

    getProductIdDispatch();

    return () => {
      isMounted = false;
    };
  }, [dispatch, productId]);

  const handleAddToCart = () => {
    // Here you would usually dispatch an addToCart action too
    setConfirmMessage(`Added ${quantity} item(s) to cart!`);
  };

  const handleQuantityChange = (type) => {
    setQuantity((prev) => {
      if (type === "increase") return prev + 1;
      if (type === "decrease") return prev > 1 ? prev - 1 : 1;
      return prev;
    });
  };

  if (!open) return null;

  return (
    <div className="fixed h-screen w-screen inset-0 bg-black bg-opacity-30 flex justify-center items-center z-50">
      <div className="absolute bg-white rounded-lg shadow-lg p-6 h-full w-full max-w-2xl">
        {loading ? (
          <p>Loading...</p>
        ) : product ? (
          <>
            <div className="flex flex-col md:flex-row gap-6 mt-6 py-4">
              {/* Left Side */}
              <div className="flex-1">
                <div className="flex justify-center items-center mb-4">
                  <div className="flex w-full h-48 md:w-32 md:h-32 justify-center items-center bg-gray-100">
                    <ProductImage subcategory={product?.categoryDetails?.subCategory} />
                  </div>
                </div>
                <h1 className="text-2xl font-bold">{product.basicInfo?.name}</h1>
                <p className="text-gray-600 mt-2">{product.basicInfo?.description}</p>
                <p className="mt-2">Likes: {product.metrics?.likes || 0}</p>
                <p className="mt-2">Price: ${product.basicInfo?.price}</p>
                <p className="mt-2">Stock: {product.basicInfo?.stock}</p>
                <p className="mt-2">
                  Category: {product.categoryDetails?.category} / {product.categoryDetails?.subCategory}
                </p>
              </div>

              {/* Right Side */}
              <div className="flex-1 flex flex-col justify-between">
                <div>
                  <p className="font-bold mb-2">Quantity:</p>
                  <div className="flex items-center gap-4">
                    <button
                      onClick={() => handleQuantityChange("decrease")}
                      className="px-3 py-1 bg-gray-200 rounded hover:bg-gray-300"
                    >
                      -
                    </button>
                    <span>{quantity}</span>
                    <button
                      onClick={() => handleQuantityChange("increase")}
                      className="px-3 py-1 bg-gray-200 rounded hover:bg-gray-300"
                    >
                      +
                    </button>
                  </div>
                </div>

                <div className="mt-6">
                  <button
                    onClick={handleAddToCart}
                    className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700"
                  >
                    Add to Cart
                  </button>
                </div>

                {confirmMessage && (
                  <p className="text-green-600 mt-4 text-center">{confirmMessage}</p>
                )}
              </div>
            </div>

            <div className="mt-6 text-right">
              <button
                onClick={() => {
                  setOpen(false);
                  if (onClose) onClose();
                }}
                className="text-gray-600 hover:underline"
              >
                Close
              </button>
            </div>
          </>
        ) : (
          <p>ERROR</p>
        )}
      </div>
    </div>
  );
};

export default CartModalPopup;
