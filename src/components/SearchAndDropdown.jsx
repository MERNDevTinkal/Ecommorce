import React, { useContext } from "react";
import { GlobalContext } from "../context/GlobalContext";

const SearchAndDropdown = () => {
  const { selectedCategory, handleCategoryChange, handleSearchChange, categories } = useContext(GlobalContext);

  return (
    <div className="p-6 flex space-x-20 items-center">
      {/*  Search Bar */}
      <div className="flex space-x-4 mt-7">
        <input
          type="text"
          placeholder="Search product..."
          className="border border-gray-300 px-8 py-3 rounded w-80"
          onChange={handleSearchChange} 
        />
      </div>

      {/* Dropdown by Category */}
      <div className="flex flex-col w-60">
        <label className="mb-2 font-semibold">Filter by Category:</label>
        <select
          className="border border-gray-300 px-4 py-2 rounded"
          value={selectedCategory}
          onChange={handleCategoryChange}
        >
          <option value="all">All Categories</option>
          {categories.map((category, index) => (
            <option key={index} value={category}>
              {category.charAt(0).toUpperCase() + category.slice(1)}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
};

export default SearchAndDropdown;
