import React, { useEffect, useState, useContext } from "react";
import { useParams, useNavigate } from "react-router-dom";
import ProductContext from "../../contexts/ProductsContext";
import useFetch from "../../hooks/useFetch";
import useMutate from "../../hooks/useMutate";

const ProductDetails = () => {
  const { id } = useParams();
  const [details, setDetails] = useState([]);
  const [quantity, setQuantity] = useState(1);
  const { products } = useContext(ProductContext);
  const { data } = useFetch({
    key: `Prod@${id}`,
    url: `/api/products/${id}`,
  });
  const { mutateAsync } = useMutate(
    `/api/orders/product/${id}`,
    [`order@${id}`],
    "post"
  );

  const navigate = useNavigate();

  useEffect(() => {
    const findProduct = products.filter((product) => product.id === Number(id));

    if (findProduct.length > 0) {
      setDetails(findProduct[0]);
    }
  }, [id, products]);

  if (!details) {
    return <div>Item not found</div>;
  }

  const increaseQuantity = () => setQuantity(quantity + 1);
  const decreaseQuantity = () =>
    setQuantity(quantity - 1 < 1 ? 1 : quantity - 1);

  const handleClick = async () => {
    await mutateAsync(
      {
        community: data?.community,
        quantity,
        amount: data?.price * quantity,
      },
      {
        onSettled: (resp) => {
          if (resp) {
            window.location.href = resp.data.authorization_url;
          }
        },
      }
    );
  };

  const isOutOfStock = quantity > data?.stockCount;

  return (
    <div className="min-h-screen py-6 md:py-10 px-4 bg-[#0d0d0d]">
      <div className="max-w-6xl mx-auto">
        <div className="bg-[#1a1a1a] rounded-2xl border border-[#2e2e2e] shadow-xl p-6 md:p-10 lg:p-12">
          <div className="flex flex-col gap-10">
            {/* IMAGE */}
            <div className="w-full h-[350px] sm:h-[420px] lg:h-[520px] overflow-hidden rounded-xl border border-secondary bg-black/20 flex items-center justify-center">
              <img
                src={data?.image}
                alt={data?.name}
                className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
              />
            </div>

            {/* RIGHT SIDE */}
            <div className="flex flex-col space-y-10">
              {/* TITLE */}
              <div>
                <h2 className="text-2xl sm:text-4xl lg:text-5xl font-bold text-primary tracking-tight uppercase">
                  {data?.name}
                </h2>
                <p className="text-lg sm:text-2xl text-gray-400 mt-2 uppercase tracking-wider">
                  {data?.brand}
                </p>
                <p className="text-3xl sm:text-5xl font-bold text-white mt-6 inline-block px-6 py-4 rounded-xl bg-primary/10 border border-primary shadow-lg">
                  {data?.currency} {data?.price}
                </p>
              </div>

              {/* DESCRIPTION */}
              <div className="bg-secondary/10 border border-secondary/30 rounded-xl p-5 shadow-lg">
                <p className="text-base sm:text-xl text-gray-300 leading-relaxed">
                  {data?.description}
                </p>
              </div>

              {/* GRID LAYOUT */}
              <div className="grid gap-8 grid-cols-1 lg:grid-cols-2">
                {/* LEFT DETAILS */}
                <div className="space-y-6">
                  <div className="grid gap-6">
                    {/* STOCK BLOCK */}
                    <div className="p-5 bg-secondary/20 rounded-xl border border-secondary/40 shadow hover:scale-[1.02] transition">
                      <h3 className="text-base sm:text-lg font-semibold text-primary mb-2">
                        Stock
                      </h3>
                      <p className="text-xl sm:text-2xl text-white font-bold flex items-center gap-2">
                        {data?.stockCount}
                        {isOutOfStock && (
                          <span className="text-red-500 text-lg sm:text-xl font-semibold ml-2">
                            Out of Stock
                          </span>
                        )}
                      </p>
                    </div>

                    <div className="p-5 bg-secondary/20 rounded-xl border border-secondary/40 shadow hover:scale-[1.02] transition">
                      <h3 className="text-base sm:text-lg font-semibold text-primary mb-2">
                        Category
                      </h3>
                      <p className="text-xl sm:text-2xl text-white font-bold">
                        {data?.category}
                      </p>
                    </div>

                    <div className="p-5 bg-secondary/20 rounded-xl border border-secondary/40 shadow hover:scale-[1.02] transition">
                      <h3 className="text-base sm:text-lg font-semibold text-primary mb-2">
                        Brand
                      </h3>
                      <p className="text-xl sm:text-2xl text-white font-bold">
                        {data?.brand}
                      </p>
                    </div>
                  </div>
                </div>

                {/* RIGHT FEATURES + ACTIONS */}
                <div className="space-y-8">
                  {/* FEATURES */}
                  <div className="p-6 bg-secondary/10 border border-secondary/30 rounded-xl shadow">
                    <h3 className="text-xl sm:text-2xl font-semibold text-primary mb-4">
                      Key Features
                    </h3>
                    <ul className="space-y-2">
                      {Array.isArray(data?.features?.split(",")) &&
                        data?.features.split(",").map((feature, index) => (
                          <li
                            key={index}
                            className="text-gray-300 flex gap-3 text-base sm:text-lg"
                          >
                            <span className="text-primary text-xl">✦</span>
                            <span>{feature}</span>
                          </li>
                        ))}
                    </ul>
                  </div>

                  {/* QUANTITY */}
                  <div className="flex items-center justify-center gap-6">
                    <button
                      onClick={decreaseQuantity}
                      className="w-14 h-14 sm:w-16 sm:h-16 bg-primary text-secondary text-3xl sm:text-4xl font-bold rounded-xl shadow hover:scale-110 transition"
                    >
                      -
                    </button>

                    <span
                      className={`text-3xl sm:text-5xl font-bold px-8 py-3 rounded-xl shadow 
                      ${
                        isOutOfStock
                          ? "text-red-400 bg-red-900/40"
                          : "text-white bg-secondary"
                      }`}
                    >
                      {quantity}
                    </span>

                    <button
                      onClick={increaseQuantity}
                      disabled={isOutOfStock}
                      className="w-14 h-14 sm:w-16 sm:h-16 bg-primary text-secondary text-3xl sm:text-4xl font-bold rounded-xl shadow hover:scale-110 transition"
                    >
                      +
                    </button>
                  </div>

                  {/* BUY BUTTON */}
                  <button
                    onClick={handleClick}
                    disabled={isOutOfStock}
                    className={`w-full py-5 text-xl sm:text-2xl font-bold uppercase tracking-wider rounded-xl 
                    bg-primary text-secondary shadow-xl transition
                    ${
                      isOutOfStock
                        ? "opacity-40 cursor-not-allowed"
                        : "hover:scale-[1.03]"
                    }`}
                  >
                    Buy Now
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetails;
