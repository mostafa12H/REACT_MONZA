import React from "react";
import { Link } from "react-router-dom";
import { useTranslation } from 'react-i18next';

const ProductCard = ({
  product,
  quantity,
  onQuantityChange,
  onAddToCart,
  viewMode,
}) => {
    const { t } = useTranslation();

  const handleButtonClick = (event, action) => {
    event.preventDefault();
    action();
  };

  return (
    <div className="h-full flex">
      <Link to={`/product/${product.id}`} className="block w-full">
        <div
          className={`${
            viewMode === "list"
              ? "flex flex-col md:flex-row md:items-center md:space-x-4 p-4 border rounded-lg"
              : "border rounded-lg overflow-hidden"
          } bg-white h-full flex flex-col`}
        >
          <img
            src={product.thumbnail}
            alt={product.title}
            className={`${
              viewMode === "list"
                ? "w-full md:w-1/4 h-48 object-cover" 
                : "w-full h-48 sm:h-32 md:h-48 object-cover"
            }`}
          />
          <div
            className={`p-4 ${
              viewMode === "list" ? "flex-1 md:w-3/4" : ""
            } flex flex-col justify-between h-full`}
          >
            <h3 className="text-lg md:text-base font-bold">{product.title}</h3>
            <p className="text-gray-600 mt-2 text-sm md:text-xs">
              {product.description}
            </p>
            <p className="text-lg md:text-base font-bold mt-2 text-green-700">
              ${product.price}
            </p>
            <div className="flex items-center space-x-2 mt-4">
              <button
                onClick={(e) =>
                  handleButtonClick(e, () => onQuantityChange(product.id, -1))
                }
                className="px-2 py-1 bg-gray-200 rounded text-sm md:text-xs"
              >
                -
              </button>
              <span className="text-sm md:text-xs">{quantity}</span>
              <button
                onClick={(e) =>
                  handleButtonClick(e, () => onQuantityChange(product.id, 1))
                }
                className="px-2 py-1 bg-gray-200 rounded text-sm md:text-xs"
              >
                +
              </button>
              <button
                onClick={(e) =>
                  handleButtonClick(e, () => onAddToCart(product))
                }
                className="ml-auto px-4 py-2 bg-green-600 text-white rounded-lg text-sm md:text-xs"
              >
  {t('add_to_cart')}              </button>
            </div>
          </div>
        </div>
      </Link>
    </div>
  );
};

export default ProductCard;
