import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import landingImg from "../../assets/b.jpg";
import { getProductByIdAction } from "../../redux/actions/productThunks";

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
        const resultAction = await dispatch(getProductByIdAction(productId || "67e3c9c8ec2feb32eeea79d9" ));
        console.log(resultAction.payload);
        if (isMounted) { // Only update state if still mounted
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
      <div className="relative z-10 flex flex-col items-center w-full max-w-6xl px-4 md:px-6 py-4 md:py-6">
        {loading ? (
          <p className="text-white text-xl">Loading...</p>
        ) : error ? (
          <p className="text-red-500 text-xl">{error}</p>
        ) : (
          <>
            {/* Product Details Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 w-full bg-white bg-opacity-20 rounded-lg shadow-lg p-6">
              {/* Product Image and Info */}
              <div className="flex flex-col items-center">
                <img
                  src={product?.basicInfo?.image || "IMAGE_URL_HERE"}
                  alt="Product Image"
                  className="w-full max-w-xs rounded-lg shadow-lg"
                />
                <span className="text-white font-bold text-lg">
                  {product?.basicInfo?.productName}
                </span>
                <p className="text-white">{product?.basicInfo?.description}</p>
                <p className="text-white font-bold">${product?.basicInfo?.price}</p>
                <p className="text-white">Stock: {product?.basicInfo?.stock}</p>
              </div>

              {/* Category, Features, Metrics, Seller Info */}
              <div className="flex flex-col text-white">
                <div>
                  <h3 className="font-bold">Category</h3>
                  <p>{product?.categoryDetails?.category}</p>
                </div>
                <div>
                  <h3 className="font-bold">Subcategory</h3>
                  <p>{product?.categoryDetails?.subCategory?.join(", ")}</p>
                </div>
                <div>
                  <h3 className="font-bold">Features</h3>
                  <p>{product?.categoryDetails?.features}</p>
                </div>
                <div>
                  <h3 className="font-bold">Metrics</h3>
                  <p>Sales: {product?.metrics?.salesCount}</p>
                  <p>Views: {product?.metrics?.view}</p>
                </div>
                <div>
                  <h3 className="font-bold">Seller</h3>
                  <p>{product?.seller?.storeName}</p>
                </div>
              </div>
            </div>

            {/* Reviews Section */}
            <div className="w-full mt-6 bg-white bg-opacity-20 rounded-lg shadow-lg p-6">
              <h3 className="text-white font-bold">Reviews</h3>
              <p className="text-white">User reviews will be displayed here.</p>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default ViewProductPage;
