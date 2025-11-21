import React from "react";
import { useState, useContext } from "react";
import ProductContext from "../../contexts/ProductsContext";
const AddProduct = () => {
  const { addProduct } = useContext(ProductContext);

  const [form, setForm] = useState({
    name: "",
    image: "",
    price: "",
    category: "",
    com: "",
    longDescription: "",
    shortDescription: "",
    stock: "",
    brand: "",
    features: [],
  });

  const handleSubmit = (e) => {
    e.preventDefault();

    if (
      !name ||
      !image ||
      !price ||
      !category ||
      !com ||
      !longDescription ||
      !shortDescription ||
      !stock ||
      !brand ||
      !features
    ) {
      alert("fill out all fields");
      return;
    }

    const newProduct = {
      name: form.name,
      image: form.image,
      price: `₦${form.price}`,
      category: form.category,
      com: form.com,
      longDescription: form.longDescription,
      shortDescription: form.shortDescription,
      stock: form.stock,
      brand: form.brand,
      features: form.features,
    };

    addProduct(newProduct);
    setForm({
      name: "",
      image: "",
      price: "",
      category: "",
      com: "",
      longDescription: "",
      shortDescription: " ",
      stock: "",
      brand: "",
      features: [],
    });
  };

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <div>
      <div className="min-h-screen flex justify-center items-center z-[99] ">
        <div className=" w-full max-w-[550px]  rounded-lg bg-[#1f1f1f] border-2 border-[#303030] shadow-xl">
          <h2 className="product-header font-Mont text-[28px] text-center uppercase mb-9 mt-7 font-bold text-primary">
            create product
          </h2>
          <form
            onSubmit={handleSubmit}
            className="form flex gap-7 flex-col mt-3 px-4"
          >
            <div className="proudct_name">
              <input
                type="text"
                name="name"
                value={form.name}
                placeholder="name"
                onChange={handleChange}
                className="px-4 py-2 font-Mont w-full text-xl rounded-md capitalize bg-[#292929] text-white border-t-[2px] border-b-[2px] border-[#474747] outline-0 focus:border-primary transition-colors"
              />
            </div>

            <div className="product_image">
              <input
                type="text"
                name="image"
                value={form.image}
                placeholder="image"
                onChange={handleChange}
                className="px-4 py-2 font-Mont w-full text-xl rounded-md lowercase bg-[#292929] text-white border-t-[2px] border-b-[2px] border-[#474747] outline-0 focus:border-primary transition-colors"
              />
            </div>

            <div className="product_price">
              <input
                type="text"
                name="price"
                placeholder="price"
                value={form.price}
                onChange={handleChange}
                className="px-4 py-2 font-Mont w-full text-xl rounded-md capitalize bg-[#292929] text-white border-t-[2px] border-b-[2px] border-[#474747] outline-0 focus:border-primary transition-colors"
              />
            </div>

            <div className="product_category">
              <input
                type="text"
                name="category"
                placeholder="Category"
                value={form.category}
                onChange={handleChange}
                className="px-4 py-2 font-Mont w-full text-xl rounded-md capitalize bg-[#292929] text-white border-t-[2px] border-b-[2px] border-[#474747] outline-0 focus:border-primary transition-colors"
              />
            </div>

            <div className="product_com">
              <input
                type="text"
                name="com"
                placeholder="com"
                value={form.com}
                onChange={handleChange}
                className="px-4 py-2 font-Mont w-full text-xl rounded-md lowercase bg-[#292929] text-white border-t-[2px] border-b-[2px] border-[#474747] outline-0 focus:border-primary transition-colors"
              />
            </div>

            <div className="product_long_description">
              <textarea
                name="longDescription"
                placeholder="Detailed description..."
                value={form.longDescription}
                onChange={handleChange}
                className="px-4 py-2 w-full text-xl rounded-md  bg-[#292929] text-white border-t-[2px] border-b-[2px] border-[#474747] outline-0 focus:border-primary transition-colors"
              />
            </div>

            <div className="product_short_description">
              <input
                type="text"
                name="shortDescription"
                placeholder="Short description..."
                value={form.shortDescription}
                onChange={handleChange}
                className="px-4 py-2 font-Mont w-full text-xl rounded-md capitalize bg-[#292929] text-white border-t-[2px] border-b-[2px] border-[#474747] outline-0 focus:border-primary transition-colors"
              />
            </div>

            <div className="product_features">
              <textarea
                name="features"
                placeholder="List product features (one per line)"
                value={form.features}
                onChange={handleChange}
                className="px-4 py-2 font-Mont w-full text-xl rounded-md capitalize bg-[#292929] text-white border-t-[2px] border-b-[2px] border-[#474747] outline-0 focus:border-primary transition-colors"
              />
            </div>

            <div className="product_brand">
              <input
                type="text"
                name="brand"
                placeholder="brand"
                value={form.brand}
                onChange={handleChange}
                className="px-4 py-2 font-Mont w-full text-xl rounded-md capitalize bg-[#292929] text-white border-t-[2px] border-b-[2px] border-[#474747] outline-0 focus:border-primary transition-colors"
              />
            </div>

            <div className="product_stock">
              <input
                type="text"
                name="stock"
                placeholder="stock"
                value={form.stock}
                onChange={handleChange}
                className="px-4 py-2 font-Mont w-full text-xl rounded-md capitalize bg-[#292929] text-white border-t-[2px] border-b-[2px] border-[#474747] outline-0 focus:border-primary transition-colors"
              />
            </div>

            <button
              type="submit"
              className="mt-6 mb-12 bg-primary text-secondary w-[160px] text-center font-Mont font-bold mx-auto py-3 rounded-lg shadow-lg hover:shadow-xl hover:scale-105 transition-all duration-200"
            >
              Add Product
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AddProduct;
