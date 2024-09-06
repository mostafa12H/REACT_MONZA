import React from "react";
import { useTranslation } from "react-i18next";

const BrandFilterList = ({ brands, selectedBrand, onBrandChange }) => {
  const { t } = useTranslation();

  if (brands.length === 0) return null;

  return (
    <div className="hidden lg:block">
      <h3 className="text-lg font-bold mt-6 mb-4">{t("brand")}</h3>
      <ul>
        {brands.map((brand, index) => (
          <li key={index}>
            <label className="flex items-center">
              <input
                type="checkbox"
                className="mr-2"
                checked={selectedBrand.includes(brand)}
                onChange={() => onBrandChange(brand)}
              />
                {brand}
            </label>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default BrandFilterList;
