import FilterSidebar from "@/components/ui/FilterSidebar";
import ProductCard from "@/components/ui/ProductCard";
import { Skeleton } from "@/components/ui/skeleton";
import React, { useEffect, useState } from "react";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import axios from "axios";
import { useDispatch } from "react-redux";
import { setProducts } from "@/redux/productSlice";

const Products = () => {
  const dispatch = useDispatch();

  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);

  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("All");
  const [brand, setBrand] = useState("All");
  const [priceRange, setPriceRange] = useState([0, 100000]);

  // PAGINATION
  const [currentPage, setCurrentPage] = useState(1);
  const productsPerPage = 10;

  // FETCH DATA
  const getData = async () => {
    try {
      setLoading(true);

      const res = await axios.get(
        "http://localhost:8000/api/v1/product/getAllProducts",
      );

      if (res.data.success) {
        setData(res.data.products);
        dispatch(setProducts(res.data.products));
      }
    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getData();
  }, []);

  // FILTER LOGIC
  const filteredProducts = data.filter((product) => {
    const matchesSearch =
      product?.productName?.toLowerCase().includes(search.toLowerCase()) ??
      true;

    const matchesCategory = category === "All" || product.category === category;

    const matchesBrand = brand === "All" || product.brand === brand;

    const price = product.productPrice ?? 0;

    const matchesPrice = price >= priceRange[0] && price <= priceRange[1];

    return matchesSearch && matchesCategory && matchesBrand && matchesPrice;
  });

  // RESET PAGE ON FILTER CHANGE
  useEffect(() => {
    setCurrentPage(1);
  }, [search, category, brand, priceRange]);

  // FIX PAGE IF OUT OF RANGE
  const totalPages = Math.ceil(filteredProducts.length / productsPerPage);

  useEffect(() => {
    if (currentPage > totalPages) {
      setCurrentPage(totalPages || 1);
    }
  }, [totalPages]);

  // PAGINATION SLICE
  const startIndex = (currentPage - 1) * productsPerPage;

  const paginatedProducts = filteredProducts.slice(
    startIndex,
    startIndex + productsPerPage,
  );

  return (
    <div className="flex flex-col lg:flex-row gap-4 p-4">
      {/* SIDEBAR */}
      <div className="w-full lg:w-64 shrink-0">
        <FilterSidebar
          data={data}
          priceRange={priceRange}
          search={search}
          brand={brand}
          setSearch={setSearch}
          category={category}
          setCategory={setCategory}
          setBrand={setBrand}
          setPriceRange={setPriceRange}
        />
      </div>

      {/* RIGHT SECTION */}
      <div className="flex-1 flex flex-col">
        {/* SORT */}
        <div className="flex justify-end mb-4">
          <Select>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Sort By Price" />
            </SelectTrigger>

            <SelectContent>
              <SelectGroup>
                <SelectItem value="latest">Latest</SelectItem>
                <SelectItem value="low">Low to High</SelectItem>
                <SelectItem value="high">High to Low</SelectItem>
              </SelectGroup>
            </SelectContent>
          </Select>
        </div>

        {/* GRID */}
        <div className="flex-1">
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
            {loading ? (
              Array.from({ length: 10 }).map((_, i) => (
                <Skeleton key={i} className="h-[300px] w-full rounded-md" />
              ))
            ) : paginatedProducts.length > 0 ? (
              paginatedProducts.map((product) => (
                <ProductCard
                  key={product._id}
                  product={product}
                  loading={loading}
                />
              ))
            ) : (
              <div className="col-span-full flex flex-col items-center justify-center py-16">
                <h2 className="text-xl font-semibold text-gray-700">
                  No Products Found
                </h2>
                <p className="text-gray-500 mt-2">Try changing filters</p>
              </div>
            )}
          </div>
        </div>

        {/* PAGINATION */}
        {filteredProducts.length > productsPerPage && (
          <div className="mt-6 flex justify-center px-2">
            <div className="flex flex-wrap items-center justify-center gap-2 text-sm">
              <button
                disabled={currentPage === 1}
                onClick={() => setCurrentPage((p) => p - 1)}
                className="px-3 py-1 border rounded-md disabled:opacity-40"
              >
                Prev
              </button>

              {Array.from({ length: totalPages }, (_, i) => (
                <button
                  key={i}
                  onClick={() => setCurrentPage(i + 1)}
                  className={`px-3 py-1 border rounded-md ${
                    currentPage === i + 1
                      ? "bg-pink-600 text-white border-pink-600"
                      : ""
                  }`}
                >
                  {i + 1}
                </button>
              ))}

              <button
                disabled={currentPage === totalPages}
                onClick={() => setCurrentPage((p) => p + 1)}
                className="px-3 py-1 border rounded-md disabled:opacity-40"
              >
                Next
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Products;
