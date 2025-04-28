import React, { useEffect, useState } from "react";
import ProductCards from "../../components/cards/ProductCards";
import { useDispatch } from "react-redux";
import { getRandomProductsActions } from "../../redux/actions/getProductThunks";

const ProductRow = ({ title, fetchAction, rowKey }) => {
  const dispatch = useDispatch();

  const [products, setProducts] = useState([]);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [fade, setFade] = useState(false);

  useEffect(() => {
    let isMounted = true;

    const fetchProducts = async () => {
      setFade(true);
      setTimeout(async () => {
        if (!isMounted) return;
        setLoading(true);
        setError("");

        try {
          const result = await dispatch(fetchAction(page));
          const data = result?.payload?.products;

          if (Array.isArray(data) && data.length > 0) {
            setProducts(data);
          } else {
            const fallback = await dispatch(getRandomProductsActions(page));
            setProducts(fallback?.payload?.products || []);
          }
        } catch (err) {
          if (isMounted) setError(`Failed to fetch ${title}`);
        } finally {
          if (isMounted) {
            setLoading(false);
            setFade(false);
          }
        }
      }, 750);
    };

    fetchProducts();

    return () => {
      isMounted = false;
    };
  }, [page, dispatch, fetchAction, title]);

  const handlePageChange = (direction) => {
    if (!loading) {
      setPage((prev) => Math.max(1, prev + direction));
    }
  };

  return (
    <div className="mb-10 flex flex-col w-full">
      {/* Title & Controls */}
      <div className="flex flex-row w-full bg-gray-700 bg-opacity-30 h-[50px] p-2 rounded-md justify-between items-center mb-2">
        <h2 className="text-white text-xl capitalize bg-white bg-opacity-20 px-4">
          {title}
        </h2>
        <div className="flex space-x-2 p-1 bg-white bg-opacity-20">
          <button
            onClick={() => handlePageChange(-1)}
            disabled={loading}
            className="bg-white px-2 py-1 rounded hover:bg-gray-300 disabled:opacity-50"
          >
            ◀
          </button>
          <button
            onClick={() => handlePageChange(1)}
            disabled={loading}
            className="bg-white px-2 py-1 rounded hover:bg-gray-300 disabled:opacity-50"
          >
            ▶
          </button>
        </div>
      </div>

      {/* Content */}
      {loading && !fade ? (
        <p className="text-white">Loading {title}...</p>
      ) : error ? (
        <p className="text-red-500">{error}</p>
      ) : products.length > 0 ? (
        <div
          className={`flex flex-nowrap gap-4 overflow-x-auto bg-gray-600 bg-opacity-50 p-3 rounded-xl transition-opacity duration-500 ease-in-out ${
            fade ? "opacity-0" : "opacity-100"
          }`}
        >
          {products.map((product) => (
            <div
              key={product._id}
              className="w-fit gap-2 px-2 py-1 bg-white bg-opacity-40 rounded-lg h-[280px] md:h-[340px] shrink-0"
            >
              <ProductCards
                product={product}
                onAddToCart={() => {}}
                onViewProduct={() => {}}
              />
            </div>
          ))}
        </div>
      ) : (
        <p className="text-white">No {title} found.</p>
      )}
    </div>
  );
};

export default ProductRow;
