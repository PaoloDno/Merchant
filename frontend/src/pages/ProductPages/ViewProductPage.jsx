import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import landingImg from "../../assets/b.jpg";
import { getProductByIdAction } from "../../redux/actions/productThunks";
import ProductImage from "../../components/images/productImage";
import StoreBanner from "../../components/images/storeBanner";
import StoreImage from "../../components/images/storeImage";

const ViewProductPage = () => {
  const { productId } = useParams();
  console.log(productId);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    let isMounted = true; // Component is mounted

    const fetchProduct = async () => {
      setLoading(true);
      try {
        const resultAction = await dispatch(
          getProductByIdAction(productId || "67e3c9c8ec2feb32eeea79d9")
        );
        console.log(resultAction.payload);
        if (isMounted) {
          // Only update state if still mounted
          console.log(resultAction.payload);
          setProduct(resultAction.payload.product);
          setError(resultAction.payload ? "" : "Product not found");
        }
      } catch (err) {
        if (isMounted) setError("Failed to fetch product.");
      }
      if (isMounted) setLoading(false);
    };

    fetchProduct();

    return () => {
      isMounted = false; // Cleanup when component unmounts
    };
  }, []);

  return (
    <div className="relative flex items-center justify-center min-h-screen w-full overflow-x-hidden">
      {/* Background Image */}
      <div
        className="absolute inset-0 w-full h-full bg-cover bg-center"
        style={{ backgroundImage: `url(${landingImg})` }}
      />
      <div className="absolute inset-0 bg-black bg-opacity-40 pointer-events-none"></div>

      {/* Content */}
      <div className="relative z-10 flex flex-col items-center w-full max-w-6xl px-4 md:px-6 py-4 md:py-6 bg-slate-300 text-black">
        {loading ? (
          <p className="text-black text-xl">Loading...</p>
        ) : error ? (
          <p className="text-red-500 text-xl">{error}</p>
        ) : (
          <>
            {/* Product Details Grid */}
            <div className="w-full bg-white bg-opacity-20 rounded-lg shadow-lg p-6">
              {/* Product Details Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Product Image and Info */}
                <div className="flex flex-col items-start bg-skin-fill-1 bg-opacity-90 rounded-lg p-4">
                  <div className="w-full h-64 flex justify-center items-center bg-gray-300 rounded-lg overflow-hidden">
                    <ProductImage
                      subcategory={product?.categoryDetails?.subCategory}
                    />
                  </div>
                  <h2 className="text-skin-primary font-bold text-2xl mt-4">
                    {product?.basicInfo?.productName}
                  </h2>
                  <p className="text-skin-primary text-sm mt-2">
                    {product?.basicInfo?.description}
                  </p>
                  <p className="text-skin-primary font-bold text-lg mt-2">
                    ${product?.basicInfo?.price}
                  </p>
                  <p className="text-skin-primary text-sm">
                    Stock: {product?.basicInfo?.stock}
                  </p>
                </div>

                {/* Category, Features, Metrics, Seller Info */}
                <div className="flex flex-col bg-white bg-opacity-40 rounded-lg p-4 shadow-md">
                  <div className="mb-4">
                    <h3 className="text-gray-800 font-semibold text-lg">
                      Category
                    </h3>
                    <p className="text-gray-600">
                      {product?.categoryDetails?.category}
                    </p>
                  </div>
                  <div className="mb-4">
                    <h3 className="text-gray-800 font-semibold text-lg">
                      Subcategory
                    </h3>
                    <p className="text-gray-600">
                      {product?.categoryDetails?.subCategory?.join(", ")}
                    </p>
                  </div>
                  <div className="mb-4">
                    <h3 className="text-gray-800 font-semibold text-lg">
                      Features
                    </h3>
                    <p className="text-gray-600">
                      {product?.categoryDetails?.features}
                    </p>
                  </div>
                  <div className="mb-4">
                    <h3 className="text-gray-800 font-semibold text-lg">
                      Metrics
                    </h3>
                    <p className="text-gray-600">
                      Sales: {product?.metrics?.salesCount}
                    </p>
                    <p className="text-gray-600">
                      Views: {product?.metrics?.view}
                    </p>
                  </div>
                  <h1 className="text-gray-600">Product's Store</h1>
                  <div className="relative w-full h-[80px] rounded-md overflow-hidden mb-4">
                    {/* Store Banner */}
                    <div className="absolute inset-0">
                      <StoreBanner
                        storeBanner={
                          product?.seller?.sellerId?.storeBanner ||
                          product?.seller?._id
                        }
                      />
                    </div>

                    {/* Right-side Black Gradient Overlay */}
                    <div className="absolute inset-0 bg-gradient-to-l from-black/60 via-transparent to-transparent z-10"></div>

                    {/* Store Logo */}
                    <div className="absolute left-4 top-1/2 transform -translate-y-1/2 h-[48px] w-[48px] rounded-full overflow-hidden z-20 border-2 border-white">
                      <StoreImage
                        storeLogo={
                          product?.seller?.sellerId?.storeLogo ||
                          product?.seller?._id
                        }
                      />
                    </div>

                    {/* Store Name */}
                    <h3 className="absolute left-20 bottom-2 text-white font-semibold text-style3a z-20">
                      {product?.seller?.storeName}
                    </h3>

                    {/* Visit Button */}
                    <button
                      onClick={() =>
                        navigate(
                          `/ViewStore/${
                            product?.seller?.sellerId?._id || product?.seller?._id
                          }`
                        )
                      }
                      className="absolute right-4 top-1/2 transform -translate-y-1/2 text-black bg-green-300 p-2 rounded-md hover:underline z-20"
                    >
                      Visit Store
                    </button>
                  </div>
                </div>
              </div>

              {/* Reviews Section */}
              <div className="w-full mt-6 bg-white bg-opacity-40 rounded-lg shadow-md p-6">
                <h3 className="text-gray-800 font-bold text-xl">Reviews</h3>
                <p className="text-gray-600">
                  User reviews will be displayed here.
                </p>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default ViewProductPage;
