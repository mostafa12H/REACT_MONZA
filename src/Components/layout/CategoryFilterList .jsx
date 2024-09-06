import React from "react";
import { useTranslation } from "react-i18next";

const CategoryFilter = ({ categories, selectedCategory, onCategoryChange }) => {
  const { t } = useTranslation();

  return (
    <div className="category-filter">
      <h3 className="text-lg font-bold mb-4">{t("category")}</h3>
      <ul>
        {categories.map((category, index) => (
          <li key={index}>
            <label className="flex items-center">
              <input
                type="checkbox"
                className="mr-2"
                checked={selectedCategory.includes(category)}
                onChange={() => onCategoryChange(category)}
              />
              {category}
            </label>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default React.memo(CategoryFilter);
