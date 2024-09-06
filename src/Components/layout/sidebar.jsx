import React from "react";
import BrandFilter from "./BrandFilter";
import CategoryFilter from "./CategoryFilterList ";

const Sidebar = ({
  categories,
  brands,
  selectedCategory,
  selectedBrand,
  onCategoryChange,
  onBrandChange,
}) => {
  return (
    <aside className="w-full lg:w-1/4 mb-8 lg:mb-0">
      <div className="border rounded-lg p-4 bg-white categoryContent">
        <CategoryFilter
          categories={categories}
          selectedCategory={selectedCategory}
          onCategoryChange={onCategoryChange}
        />
        {selectedCategory.length > 0 && selectedCategory[0] !== "All" && (
          <BrandFilter
            brands={brands}
            selectedBrand={selectedBrand}
            onBrandChange={onBrandChange}
          />
        )}
      </div>
    </aside>
  );
};

export default Sidebar;
