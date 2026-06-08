import React, { useState } from "react";
import ImageUpload from "@/components/ui/ImageUpload";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import axios from "axios";
import { setProducts } from "@/redux/productSlice";

const AddProducts = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const accessToken = localStorage.getItem("accessToken");
const {products} = useSelector((store) => store.product)
  const [productData, setProductData] = useState({
    productName: "",
    productPrice: "",
    productDesc: "",
    productImg: [],
    brand: "",
    category: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;

    setProductData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (
      !productData.productName ||
      !productData.productPrice ||
      !productData.productDesc ||
      !productData.brand ||
      !productData.category
    ) {
      return toast.error("Please fill all fields");
    }

    if (productData.productImg.length === 0) {
      return toast.error("Please upload at least one image");
    }

    try {
      const formData = new FormData();

      formData.append("productName", productData.productName);
      formData.append("productPrice", productData.productPrice);
      formData.append("productDesc", productData.productDesc);
      formData.append("brand", productData.brand);
      formData.append("category", productData.category);

      productData.productImg.forEach((img) => {
        formData.append("file", img);
      });

      const res = await axios.post(
        "http://localhost:8000/api/v1/product/add",
        formData,
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        },
      );

      if (res.data.success) {
        toast.success(res.data.message);
        dispatch(setProducts([...products, res.data.product]));
      
        navigate("/dashboard/products");
      }
    } catch (error) {
      console.log(error);

      toast.error(error?.response?.data?.message || "Failed to add product");
    }
  };

  return (
    <div className="w-full flex justify-center">
      <div className="w-full max-w-3xl">
        {/* Header */}
        <div className="mb-4">
          <h1 className="text-2xl font-semibold text-slate-800">Add Product</h1>

          <p className="text-sm text-slate-500 mt-1">
            Create a new product for your store.
          </p>
        </div>

        {/* Card */}
        <div className="bg-white border rounded-xl p-5">
          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Product Name + Brand */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">
                  Product Name
                </label>

                <input
                  type="text"
                  name="productName"
                  value={productData.productName}
                  onChange={handleChange}
                  placeholder="Apple iPhone 17 Pro"
                  className="h-10 w-full rounded-md border px-3 text-sm outline-none focus:ring-2 focus:ring-pink-500"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">
                  Brand
                </label>

                <input
                  type="text"
                  name="brand"
                  value={productData.brand}
                  onChange={handleChange}
                  placeholder="Apple"
                  className="h-10 w-full rounded-md border px-3 text-sm outline-none focus:ring-2 focus:ring-pink-500"
                />
              </div>
            </div>

            {/* Category + Price */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">
                  Category
                </label>

                <input
                  type="text"
                  name="category"
                  value={productData.category}
                  onChange={handleChange}
                  placeholder="Mobile, Shoes, Dress Material..."
                  className="h-10 w-full rounded-md border px-3 text-sm outline-none focus:ring-2 focus:ring-pink-500"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">
                  Price
                </label>

                <input
                  type="number"
                  name="productPrice"
                  value={productData.productPrice}
                  onChange={handleChange}
                  placeholder="134900"
                  className="h-10 w-full rounded-md border px-3 text-sm outline-none focus:ring-2 focus:ring-pink-500"
                />
              </div>
            </div>

            {/* Description */}
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">
                Description
              </label>

              <textarea
                rows={3}
                name="productDesc"
                value={productData.productDesc}
                onChange={handleChange}
                placeholder="Enter product description..."
                className="w-full rounded-md border px-3 py-2 text-sm resize-none outline-none focus:ring-2 focus:ring-pink-500"
              />
            </div>

            {/* Image Upload */}
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2">
                Product Images
              </label>

              <ImageUpload
                productData={productData}
                setProductData={setProductData}
              />
            </div>

            {/* Submit */}
            <div className="flex justify-end pt-1">
              <button
                type="submit"
                className="h-10 px-5 rounded-md bg-pink-600 text-white text-sm font-medium hover:bg-pink-700 transition"
              >
                Add Product
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AddProducts;
