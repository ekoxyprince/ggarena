import React from "react";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useContext } from "react";
import ProductContext from "../../contexts/ProductsContext";

const ProductDetails = () => {
  const { id } = useParams();
  const [details, setDetails] = useState([]);
  const [quantity, setQuantity] = useState(1);
  const { products } = useContext(ProductContext);

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

  return (
    <div className="min-h-screen bg-background py-8">
      <div className="max-w-6xl mx-auto px-4">
        <div className="bg-[#1f1f1f] rounded-lg border-2 border-[#303030] shadow-xl p-8">
          <div className="flex flex-col lg:flex-row gap-8 items-center">
            <div className="product-image w-full lg:w-[500px] h-[400px] lg:h-[500px] overflow-hidden rounded-lg border-2 border-secondary">
              <img
                src={details.image}
                alt=""
                className="w-full h-full object-contain"
                style={{
                  imageRendering: "-webkit-optimize-contrast",
                  imageRendering: "crisp-edges",
                }}
              />
            </div>
            <div className="product-info flex-1 text-center lg:text-left">
              <h2 className="text-3xl lg:text-4xl font-Mont font-bold uppercase text-primary mb-6">
                {details.name}
              </h2>
              <p className="price text-4xl lg:text-5xl font-bold text-white mb-8 border-2 border-primary rounded-lg py-4 px-6 inline-block">
                {details.price}
              </p>
              <div className="product-quantity flex items-center justify-center lg:justify-start gap-6 mb-8">
                <button
                  className="w-12 h-12 bg-primary text-secondary text-2xl font-bold rounded-lg shadow-lg hover:shadow-xl hover:scale-110 transition-all duration-200 flex items-center justify-center"
                  onClick={decreaseQuantity}
                >
                  -
                </button>
                <span className="text-4xl font-Mont font-bold text-white bg-secondary px-6 py-2 rounded-lg min-w-[80px] text-center">
                  {quantity}
                </span>
                <button
                  className="w-12 h-12 bg-primary text-secondary text-2xl font-bold rounded-lg shadow-lg hover:shadow-xl hover:scale-110 transition-all duration-200 flex items-center justify-center"
                  onClick={increaseQuantity}
                >
                  +
                </button>
              </div>
              <button className="bg-primary text-secondary font-Mont font-bold text-xl py-4 px-8 rounded-lg shadow-lg hover:shadow-xl hover:scale-105 transition-all duration-200">
                Add to Cart
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetails;
