import React from "react";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useContext } from "react";
import ProductContext from "../../contexts/ProductsContext";
import { useNavigate } from "react-router-dom";
const ProductDetails = () => {
  const { id } = useParams();
  const [details, setDetails] = useState([]);
  const [quantity, setQuantity] = useState(1);
  const { products } = useContext(ProductContext);
  const navigate = useNavigate();

  useEffect(() => {
    const findProduct = products.filter((product) => {
      return product.id === Number(id);
    });

    if (findProduct.length > 0) {
      setDetails(findProduct[0]);
    }
  }, [id, products]);

  if (!details) {
    return <div>Item not found</div>;
  }

  const increaseQuantity = () => {
    setQuantity(quantity + 1);
  };

  const decreaseQuantity = () => {
    setQuantity(quantity - 1 < 1 ? 1 : quantity - 1);
  };

  const handleClick = () => {
    const isSuccessful = Math.random() > 0.5;
    if (isSuccessful) {
      navigate("/admin/success");
    } else {
      navigate("/admin/failure");
    }
  };

  return (
    <div className="min-h-screen bg-background py-8">
      <div className="max-w-6xl mx-auto px-4">
        <div className="bg-gradient-to-br from-[#1f1f1f] via-[#252525] to-[#2a2a2a] rounded-2xl border-2 border-[#303030] shadow-2xl p-10 lg:p-12">
          <div className="flex flex-col gap-10">
            <div className="product-image w-full h-[400px] lg:h-[500px] overflow-hidden rounded-2xl border-2 border-secondary shadow-xl bg-gradient-to-br from-secondary/5 to-primary/5 flex items-center justify-center">
              <img
                src={details.image}
                alt={details.name}
                className="w-full h-full object-cover"
                style={{
                  imageRendering: "-webkit-optimize-contrast",
                  imageRendering: "crisp-edges",
                }}
              />
            </div>
            <div className="product-info flex-1 flex flex-col justify-between space-y-8">
              <div className="header-section">
                <h2 className="text-4xl xl:text-5xl font-Mont font-bold uppercase text-primary leading-tight mb-4">
                  {details.name}
                </h2>
                <p className="text-2xl font-semibold text-gray-400 mb-6 uppercase tracking-wide">
                  {details.brand}
                </p>
                <p className="price text-5xl xl:text-6xl font-bold text-white border-2 border-primary rounded-2xl py-6 px-8 inline-block bg-gradient-to-r from-primary/10 via-secondary/10 to-primary/5 shadow-xl">
                  {details.price}
                </p>
              </div>
              <div className="description bg-gradient-to-r from-secondary/15 to-primary/10 rounded-xl p-6 border border-secondary/40 shadow-lg">
                <p className="text-xl text-gray-300 leading-relaxed">
                  {details.shortDescription}
                </p>
              </div>
              <div className="grid-layout grid grid-cols-1 lg:grid-cols-2 gap-8 max-w-6xl mx-auto">
                <div className="left-column space-y-8">
                  <div className="details-grid grid grid-cols-1 gap-6">
                    <div className="detail-item bg-gradient-to-br from-secondary/20 to-primary/10 rounded-xl p-6 border border-secondary/50 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105">
                      <h3 className="text-xl font-Mont font-semibold text-primary mb-3 flex items-center">
                        <span className="w-2 h-2 bg-primary rounded-full mr-3 animate-pulse"></span>
                        Stock
                      </h3>
                      <p className="text-2xl text-white font-bold">
                        {details.stock}
                      </p>
                    </div>
                    <div className="detail-item bg-gradient-to-br from-secondary/20 to-primary/10 rounded-xl p-6 border border-secondary/50 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105">
                      <h3 className="text-xl font-Mont font-semibold text-primary mb-3 flex items-center">
                        <span className="w-2 h-2 bg-primary rounded-full mr-3 animate-pulse"></span>
                        Category
                      </h3>
                      <p className="text-2xl text-white font-bold">
                        {details.category}
                      </p>
                    </div>
                    <div className="detail-item bg-gradient-to-br from-secondary/20 to-primary/10 rounded-xl p-6 border border-secondary/50 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105">
                      <h3 className="text-xl font-Mont font-semibold text-primary mb-3 flex items-center">
                        <span className="w-2 h-2 bg-primary rounded-full mr-3 animate-pulse"></span>
                        Brand
                      </h3>
                      <p className="text-2xl text-white font-bold">
                        {details.brand}
                      </p>
                    </div>
                  </div>
                </div>
                <div className="right-column space-y-8">
                  <div className="features bg-gradient-to-r from-secondary/15 to-primary/10 rounded-xl p-6 border border-secondary/40 shadow-lg">
                    <h3 className="text-2xl font-Mont font-semibold text-primary mb-6 flex items-center">
                      <span className="w-3 h-3 bg-primary rounded-full mr-3"></span>
                      Key Features
                    </h3>
                    <ul className="space-y-3">
                      {Array.isArray(details.features) &&
                        details.features.map((feature, index) => {
                          return (
                            <li
                              key={index}
                              className="text-gray-300 flex items-start text-lg"
                            >
                              <span className="text-primary mr-3 mt-1 text-xl">
                                ✦
                              </span>
                              <span className="leading-relaxed">{feature}</span>
                            </li>
                          );
                        })}
                    </ul>
                  </div>
                  <div className="actions-section space-y-8">
                    <div className="product-quantity flex items-center justify-center gap-8">
                      <button
                        className="w-16 h-16 bg-primary text-secondary text-4xl font-bold rounded-2xl shadow-xl hover:shadow-2xl hover:scale-110 transition-all duration-200 flex items-center justify-center"
                        onClick={decreaseQuantity}
                      >
                        -
                      </button>
                      <span className="text-6xl font-Mont font-bold text-white bg-secondary px-10 py-4 rounded-2xl min-w-[120px] text-center shadow-xl">
                        {quantity}
                      </span>
                      <button
                        className="w-16 h-16 bg-primary text-secondary text-4xl font-bold rounded-2xl shadow-xl hover:shadow-2xl hover:scale-110 transition-all duration-200 flex items-center justify-center"
                        onClick={increaseQuantity}
                      >
                        +
                      </button>
                    </div>
                    <button
                      className="bg-gradient-to-r from-primary via-primary to-primary/90 text-secondary font-Mont font-bold text-2xl py-6 px-16 rounded-2xl shadow-2xl hover:shadow-3xl hover:scale-105 transition-all duration-200 w-full uppercase tracking-wide"
                      onClick={handleClick}
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
    </div>
  );
};

export default ProductDetails;
