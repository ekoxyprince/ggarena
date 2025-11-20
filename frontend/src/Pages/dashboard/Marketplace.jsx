import React, { useContext } from "react";
import ProductCard from "../../Components/ui/ProductCard";
import { Link } from "react-router-dom";
import CreateProduct from "../../Components/ui/CreateProduct";
import ProductContext from "../../contexts/ProductsContext";
function Marketplace() {
  const { products } = useContext(ProductContext);
  return (
    <div>
      <CreateProduct />
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-[20px] gap-y-[30px] pt-[40px]">
        {products.map((product, index) => (
          <Link to={`/admin/products/${product.id}`}>
            <ProductCard key={product.id} data={product} />
          </Link>
        ))}
      </div>
    </div>
  );
}

export default Marketplace;
