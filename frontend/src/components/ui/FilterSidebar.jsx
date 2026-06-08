import React from "react";
import { Slider } from "@/components/ui/slider";

const FilterSidebar = ({
  data,
  priceRange,
  search,
  brand,
  setSearch,
  category,
  setCategory,
  setBrand,
  setPriceRange,
}) => {
  const categories = data.map((p) => p.category);
  const uniqueCategories = ["All", ...new Set(categories)];

  const brands = data.map((p) => p.brand);
  const uniqueBrands = ["All", ...new Set(brands)];

  const handleCategory = (value) => {
    setCategory(value);
  };

  const handleBrand = (e) => {
    setBrand(e.target.value);
  };

  const clearFilters = () => {
    setSearch("");
    setCategory("All");
    setBrand("All");
    setPriceRange([0, 999999]);
  };

  return (
    <div className="bg-white border rounded-lg shadow-sm p-4 md:p-5 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <h2 className="text-lg font-semibold">Filters</h2>

        <button
          onClick={clearFilters}
          className="text-sm font-medium text-pink-600 hover:text-pink-500 transition"
        >
          Clear
        </button>
      </div>

      {/* Search */}
      <div>
        <label className="block text-sm font-medium mb-2">Search Product</label>

        <input
          type="text"
          placeholder="Search products..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full border rounded-md px-3 py-2 text-sm md:text-base outline-none focus:ring-2 focus:ring-pink-500 focus:border-pink-500"
        />
      </div>

      {/* Category */}
      <div>
        <h3 className="font-medium mb-3">Category</h3>

        <div className="space-y-2 max-h-56 overflow-y-auto">
          {uniqueCategories.map((cat) => (
            <label
              key={cat}
              className="flex items-center gap-2 cursor-pointer text-sm"
            >
              <input
                type="radio"
                name="category"
                checked={category === cat}
                onChange={() => handleCategory(cat)}
                className="accent-pink-600"
              />

              <span>{cat}</span>
            </label>
          ))}
        </div>
      </div>

      {/* Brand */}
      <div>
        <h3 className="font-medium mb-3">Brand</h3>

        <select
          value={brand}
          onChange={handleBrand}
          className="w-full border rounded-md px-3 py-2 text-sm md:text-base outline-none focus:ring-2 focus:ring-pink-500"
        >
          {uniqueBrands.map((item) => (
            <option key={item} value={item}>
              {item}
            </option>
          ))}
        </select>
      </div>

      {/* Price Range */}
      <div>
        <h3 className="font-medium mb-4">Price Range</h3>

        <Slider
          value={priceRange}
          min={0}
          max={100000}
          step={100}
          onValueChange={setPriceRange}
        />

        <div className="flex justify-between mt-3 text-sm font-medium text-gray-600">
          <span>₹{priceRange[0].toLocaleString()}</span>
          <span>₹{priceRange[1].toLocaleString()}</span>
        </div>
      </div>

      {/* Reset Button */}
      <div className="pt-2">
        <button
          onClick={clearFilters}
          className="w-full py-2.5 rounded-md bg-pink-600 text-white font-medium hover:bg-pink-500 transition"
        >
          Reset Filters
        </button>
      </div>
    </div>
  );
};

export default FilterSidebar;
