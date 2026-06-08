import { setProducts } from "@/redux/productSlice";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "sonner";
import { Pencil, Trash2, Package } from "lucide-react";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

const AdminProduct = () => {
  const accessToken = localStorage.getItem("accessToken");

  const { products = [] } = useSelector((store) => store.product);

  const dispatch = useDispatch();

  const [editProduct, setEditProduct] = useState(null);

  const [currentPage, setCurrentPage] = useState(1);
  const [deleteProductId, setDeleteProductId] = useState(null);
  const productsPerPage = 8;

  const indexOfLastProduct = currentPage * productsPerPage;

  const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
  const [searchTerm, setSearchTerm] = useState("");
  const filteredProducts = products.filter(
    (product) =>
      product.productName?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      product.brand?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      product.category?.toLowerCase().includes(searchTerm.toLowerCase()),
  );

  const currentProducts = filteredProducts.slice(
    indexOfFirstProduct,
    indexOfLastProduct,
  );
  const totalPages = Math.ceil(filteredProducts.length / productsPerPage);
  const handleChange = (e) => {
    const { name, value } = e.target;

    setEditProduct((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleImageChange = (e) => {
    const files = Array.from(e.target.files);

    setEditProduct((prev) => ({
      ...prev,
      productImg: [...(prev.productImg || []), ...files],
    }));
  };

  const removeImage = (index) => {
    setEditProduct((prev) => ({
      ...prev,
      productImg: prev.productImg.filter((_, i) => i !== index),
    }));
  };

  const handleSave = async (e) => {
    e.preventDefault();

    const formData = new FormData();

    formData.append("productName", editProduct.productName);

    formData.append("productPrice", editProduct.productPrice);

    formData.append("productDesc", editProduct.productDesc);

    formData.append("brand", editProduct.brand);

    formData.append("category", editProduct.category);

    const existingImages =
      editProduct.productImg
        ?.filter((img) => !(img instanceof File) && img.public_id)
        .map((img) => img.public_id) || [];

    formData.append("existingImages", JSON.stringify(existingImages));

    editProduct.productImg
      ?.filter((img) => img instanceof File)
      .forEach((file) => {
        formData.append("file", file);
      });

    try {
      const res = await axios.put(
        `http://localhost:8000/api/v1/product/update/${editProduct._id}`,
        formData,
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        },
      );

      if (res.data.success) {
        toast.success("Product updated successfully");

        const updatedProducts = products.map((product) =>
          product._id === editProduct._id ? res.data.product : product,
        );

        dispatch(setProducts(updatedProducts));

        setEditProduct(null);
      }
    } catch (error) {
      console.log(error);

      toast.error(error?.response?.data?.message || "Failed to update product");
    }
  };

  const handleDeleteProduct = async (productId) => {
    try {
      const remainingProducts = products.filter(
        (product) => product._id !== productId,
      );
      const res = await axios.delete(
        `http://localhost:8000/api/v1/product/delete/${productId}`,
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        },
      );

      if (res.data.success) {
        toast.success(res.data.message);
        dispatch(setProducts(remainingProducts));
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    setCurrentPage(1);
  }, [searchTerm]);
  return (
    <div className="bg-white rounded-xl border p-5">
      {/* Header */}
      <div className="mb-6">
        <h1 className="text-2xl font-semibold">Products</h1>

        <p className="text-sm text-gray-500">Manage your store products</p>
      </div>
      <div className="mb-5">
        <div className="relative max-w-md">
          <input
            type="text"
            placeholder="Search products..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="
        w-full
        h-10
        pl-10
        pr-4
        border
        rounded-lg
        text-sm
        focus:outline-none
        focus:ring-2
        focus:ring-pink-500
      "
          />

          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M21 21l-4.35-4.35m0 0A7.5 7.5 0 105.5 5.5a7.5 7.5 0 0011.15 11.15z"
            />
          </svg>
        </div>
      </div>
      {/* Product Grid */}
      <div className="space-y-4">
        {" "}
       {currentProducts.length > 0 ? (
  currentProducts.map((product) => (
    <div
      key={product._id}
      className="
        bg-white
        border
        rounded-xl
        p-3
        flex
        items-center
        gap-4
        hover:shadow-sm
        transition
      "
    >
      {/* Product Image */}
      <div className="h-20 w-20 bg-slate-50 rounded-lg p-2 shrink-0 border">
        <img
          src={product?.productImg?.[0]?.url}
          alt={product.productName}
          className="w-full h-full object-contain"
        />
      </div>

      {/* Product Details */}
      <div className="flex-1 min-w-0">
        <div className="flex items-start justify-between gap-3">
          <div className="flex-1">
            <h3 className="text-sm font-semibold text-slate-800 truncate">
              {product.productName}
            </h3>

            <p className="text-xs text-slate-500 mt-1">
              {product.brand} • {product.category}
            </p>

            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <p
                    className="
                      text-xs
                      text-slate-500
                      mt-1
                      line-clamp-2
                      cursor-help
                      leading-5
                      max-w-md
                    "
                  >
                    {product.productDesc}
                  </p>
                </TooltipTrigger>

                <TooltipContent className="max-w-sm">
                  <p>{product.productDesc}</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>

            <p className="text-sm font-semibold text-pink-600 mt-1">
              ₹{product.productPrice?.toLocaleString()}
            </p>

            <p className="text-[11px] text-slate-400 mt-1">
              {product.productImg?.length || 0} Images
            </p>
          </div>

          {/* Actions */}
          <div className="flex items-center gap-1">
            <button
              onClick={() =>
                setEditProduct({
                  ...product,
                })
              }
              className="
                h-8
                w-8
                rounded-md
                hover:bg-blue-50
                text-blue-600
                flex
                items-center
                justify-center
                transition
                cursor-pointer
              "
            >
              <Pencil size={16} />
            </button>

            <button
              onClick={() =>
                setDeleteProductId(product._id)
              }
              className="
                h-8
                w-8
                rounded-md
                hover:bg-red-50
                text-red-600
                flex
                items-center
                justify-center
                transition
                cursor-pointer
              "
            >
              <Trash2 size={16} />
            </button>
          </div>
        </div>
      </div>
    </div>
  ))
) : (
  <div className="border rounded-xl py-16 text-center bg-white">
    <h3 className="font-medium text-slate-700">
      No products found
    </h3>

    <p className="text-sm text-slate-500 mt-1">
      Try searching with another keyword
    </p>
  </div>
)}
      </div>

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="flex justify-center gap-2 flex-wrap mt-8">
          {Array.from({ length: totalPages }, (_, index) => (
            <button
              key={index}
              onClick={() => setCurrentPage(index + 1)}
              className={`w-10 h-10 rounded-md border cursor-pointer ${
                currentPage === index + 1
                  ? "bg-pink-600 text-white"
                  : "bg-white"
              }`}
            >
              {index + 1}
            </button>
          ))}
        </div>
      )}

      {/* delter */}
      {deleteProductId && (
        <div
          className="fixed inset-0 bg-black/50 flex items-center justify-center z-[60] p-4"
          onClick={() => setDeleteProductId(null)}
        >
          <div
            className="bg-white rounded-xl w-full max-w-md p-6"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center gap-3 mb-4">
              <div className="h-12 w-12 rounded-full bg-red-100 flex items-center justify-center">
                <Trash2 size={20} className="text-red-600" />
              </div>

              <div>
                <h3 className="font-semibold text-lg">Delete Product</h3>

                <p className="text-sm text-slate-500">
                  This action cannot be undone.
                </p>
              </div>
            </div>

            <p className="text-sm text-slate-600 mb-6">
              Are you sure you want to delete this product?
            </p>

            <div className="flex justify-end gap-3">
              <button
                onClick={() => setDeleteProductId(null)}
                className="px-4 py-2 border rounded-md cursor-pointer"
              >
                Cancel
              </button>

              <button
                onClick={() => {
                  handleDeleteProduct(deleteProductId);
                  setDeleteProductId(null);
                }}
                className="px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded-md cursor-pointer"
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}
      {/* Edit Modal */}
      {editProduct && (
        <div
          className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4"
          onClick={() => setEditProduct(null)}
        >
          <div
            className="bg-white rounded-xl w-full max-w-2xl p-5 max-h-[90vh] overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
          >
            <h2 className="text-xl font-semibold mb-5">Edit Product</h2>

            <form onSubmit={handleSave} className="space-y-4">
              <input
                type="text"
                name="productName"
                value={editProduct.productName}
                onChange={handleChange}
                placeholder="Product Name"
                className="w-full border rounded-md h-10 px-3"
              />

              <input
                type="text"
                name="brand"
                value={editProduct.brand}
                onChange={handleChange}
                placeholder="Brand"
                className="w-full border rounded-md h-10 px-3"
              />

              <input
                type="text"
                name="category"
                value={editProduct.category}
                onChange={handleChange}
                placeholder="Category"
                className="w-full border rounded-md h-10 px-3"
              />

              <input
                type="number"
                name="productPrice"
                value={editProduct.productPrice}
                onChange={handleChange}
                placeholder="Price"
                className="w-full border rounded-md h-10 px-3"
              />

              <textarea
                rows={4}
                name="productDesc"
                value={editProduct.productDesc}
                onChange={handleChange}
                placeholder="Description"
                className="w-full border rounded-md p-3"
              />

              {/* Images */}
              <div>
                <label className="block mb-2 font-medium">Product Images</label>

                <input
                  type="file"
                  multiple
                  accept="image/*"
                  onChange={handleImageChange}
                  className="w-full border rounded-md p-2 cursor-pointer"
                />

                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mt-4">
                  {editProduct.productImg?.map((img, index) => (
                    <div key={index} className="relative">
                      <img
                        src={
                          img instanceof File
                            ? URL.createObjectURL(img)
                            : img.url
                        }
                        alt=""
                        className="h-24 w-full object-cover rounded-md border"
                      />

                      <button
                        type="button"
                        onClick={() => removeImage(index)}
                        className="absolute top-1 right-1 bg-red-500 text-white w-6 h-6 rounded-full cursor-pointer"
                      >
                        ×
                      </button>
                    </div>
                  ))}
                </div>
              </div>

              <div className="flex justify-end gap-3 pt-2">
                <button
                  type="button"
                  onClick={() => setEditProduct(null)}
                  className="px-4 py-2 border rounded-md cursor-pointer"
                >
                  Cancel
                </button>

                <button
                  type="submit"
                  className="px-5 py-2 bg-pink-600 hover:bg-pink-700 text-white rounded-md cursor-pointer"
                >
                  Save Changes
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminProduct;
