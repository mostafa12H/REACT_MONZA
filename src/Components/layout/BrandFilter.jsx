import React from "react";
import { useTranslation } from "react-i18next";

const BrandFilter = ({ brands, selectedBrand, onBrandChange }) => {
  const { t } = useTranslation();

  
  return (
    <>
    {(JSON.stringify(brands) !== '[null]') && 
    <div className="brand-filter">
      <h3 className="text-lg font-bold mt-6 mb-4">{t("brand")}</h3>
      <ul>
        {brands
          ?.filter((brand) => brand !== null)
          .map((brand, index) => (
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
    }
</>
  );
};

export default BrandFilter;
