import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import Filterbutton from "../common/filterbutton";

const SmallScreenFilters = ({
  categories,
  brands,
  selectedCategory,
  selectedBrand,
  onCategoryChange,
  onBrandChange,
}) => {
  const { t } = useTranslation();
  const [isOpen, setIsOpen] = useState(false);

  const handleToggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const handleCategoryChange = (event) => {
    const { value } = event.target;
    onCategoryChange([value]); 
  };

  const handleBrandChange = (event) => {
    const { value } = event.target;
    if (selectedBrand.includes(value)) {
      onBrandChange(selectedBrand.filter((brand) => brand !== value));
    } else {
      onBrandChange([...selectedBrand, value]);
    }
  };

  return (
    <div className="block lg:hidden">
      <Filterbutton handleToggleMenu={handleToggleMenu} t={t} />

      <div
        className={`fixed top-0 right-0 w-64 h-full bg-white shadow-lg transform transition-transform ${
          isOpen ? "translate-x-0" : "translate-x-full"
        }`}
        style={{ zIndex: 1000 }}
      >
        <div className="p-4 border-b">
          <button onClick={handleToggleMenu} className="buttoncancel">
            <span className="X"></span>
            <span className="Y"></span>
            <div className="close">{t("close")}</div>
          </button>
        </div>

        <div className="p-4">
          <div className="mb-4">
            <label className="block text-sm font-bold mb-2">
              {t("category")}
            </label>
            <div className="border rounded-lg p-2 max-h-40 overflow-y-scroll">
              {categories.map((category, index) => (
                <div key={index} className="flex items-center mb-2">
                  <input
                    type="checkbox"
                    id={`category-${index}`}
                    value={category}
                    checked={selectedCategory.includes(category)}
                    onChange={handleCategoryChange}
                    className="mr-2"
                  />
                  <label htmlFor={`category-${index}`} className="text-sm">
                    {category}
                  </label>
                </div>
              ))}
            </div>
          </div>

          {selectedCategory.length > 0 && selectedCategory[0] !== "All" && (
            <div>
              {(JSON.stringify(brands) !== '[null]') && (
                <>
                  <label className="block text-sm font-bold mb-2">
                    {t("brand")}
                  </label>
                  <div className="border rounded-lg p-2 max-h-40 overflow-y-scroll">
                    {brands
                      .filter((brand) => brand !== null)
                      .map((brand, index) => (
                        <div key={index} className="flex items-center mb-2">
                          <input
                            type="checkbox"
                            id={`brand-${index}`}
                            value={brand}
                            checked={selectedBrand.includes(brand)}
                            onChange={handleBrandChange}
                            className="mr-2"
                          />
                          <label htmlFor={`brand-${index}`} className="text-sm">
                            {brand}
                          </label>
                        </div>
                      ))}
                  </div>
                </>
              )}
            </div>
          )}
        </div>
      </div>

      {isOpen && (
        <div
          className="fixed inset-0 bg-black opacity-50"
          onClick={handleToggleMenu}
          style={{ zIndex: 999 }}
        ></div>
      )}
    </div>
  );
};

export default SmallScreenFilters;
