import React, { useContext } from "react";
import ProductCard from "../../Components/ui/ProductCard";
import { Link } from "react-router-dom";
import CreateProduct from "../../Components/ui/CreateProduct";
import ProductContext from "../../contexts/ProductsContext";
import { useParams } from "react-router-dom";
import useFetch from "../../hooks/useFetch";
import ProductModal from "../../Components/ui/ProductModal";
import { useGlobalContext } from "../../contexts/GlobalContext";
function Marketplace() {
  const { products } = useContext(ProductContext);
  const { controlProductModal } = useGlobalContext();
  const { id } = useParams();
  const { data, refetch } = useFetch({
    key: `marketplace-${id}`,
    url: `/api/products/community/${id}`,
  });
  const { data: communtity, refetch: refetchCommunity } = useFetch({
    url: `/api/communities/${id}`,
    key: `community@${id}`,
  });
  React.useEffect(() => {
    refetch();
  }, [data]);
  console.log(communtity);
  return (
    <div>
      <ProductModal />
      {communtity?.isAdmin ? (
        <CreateProduct
          onPress={() => {
            console.log("Pressed");
            controlProductModal();
          }}
        />
      ) : null}
      {data?.length == 0 ? (
        <div className="flex items-center justify-center mt-2">
          <p className="font-bold text-lg">No Product available!</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-[20px] gap-y-[30px] pt-[40px]">
          {data?.map((product, index) => (
            <Link to={`/products/${product._id}`}>
              <ProductCard key={product.id} data={product} />
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}

export default Marketplace;
