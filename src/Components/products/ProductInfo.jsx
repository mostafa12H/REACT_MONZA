import React from "react";
import { FaStar, FaStarHalfAlt, FaRegStar } from "react-icons/fa";
import { useTranslation } from "react-i18next";

const ProductInfo = ({ product, addToCart }) => {
  const { t } = useTranslation();

  const renderStars = (rating) => {
    const fullStars = Math.floor(rating);
    const halfStar = rating - fullStars >= 0.5;
    const emptyStars = 5 - fullStars - (halfStar ? 1 : 0);

    return (
      <div className="flex items-center ml-2">
        {[...Array(fullStars)].map((_, index) => (
          <FaStar key={index} className="text-yellow-500 mr-1" />
        ))}
        {halfStar && <FaStarHalfAlt className="text-yellow-500 mr-1" />}
        {[...Array(emptyStars)].map((_, index) => (
          <FaRegStar key={index} className="text-yellow-500 mr-1" />
        ))}
      </div>
    );
  };

  return (
    <div className="w-full lg:w-2/3 p-8 bg-white rounded-lg shadow-lg border border-gray-200">
      <h2 className="text-4xl font-bold mb-4 text-gray-900">{product.title}</h2>
      <p className="text-lg mb-6 text-gray-700 leading-relaxed">
        {product.description}
      </p>

      <div className="space-y-6">
        <div>
          <h3 className="text-xl font-semibold mb-2 text-gray-800 border-b pb-2 border-gray-300">
            {t('basic_information')}
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-4 gap-y-2">
            <div>
              <p className="text-gray-700">
                <strong>{t('brand')}:</strong> {product.brand}
              </p>
            </div>
            <div>
              <p className="text-gray-700">
                <strong>{t('category')}:</strong> {product.category}
              </p>
            </div>
            <div>
              <p className="text-gray-700">
                <strong>{t('sku')}:</strong> {product.sku}
              </p>
            </div>
            <div>
              <p className="text-gray-700">
                <strong>{t('tags')}:</strong> {product.tags.join(", ")}
              </p>
            </div>
          </div>
        </div>
        <div>
          <h3 className="text-xl font-semibold mb-2 text-gray-800 border-b pb-2 border-gray-300">
            {t('pricing_discounts')}
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-4 gap-y-2">
            <div>
              <p className="text-3xl text-gray-900 font-bold">
                ${product.price}
              </p>
            </div>
            <div>
              <p className="text-gray-700">
                <strong>{t('discount')}:</strong> {product.discountPercentage}%
              </p>
              <p className="text-gray-700">
                <strong>{t('min_order_quantity')}:</strong>{" "}
                {product.minimumOrderQuantity}
              </p>
            </div>
          </div>
        </div>
        <div>
          <h3 className="text-xl font-semibold mb-2 text-gray-800 border-b pb-2 border-gray-300">
            {t('physical_attributes')}
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-4 gap-y-2">
            <div>
              <p className="text-gray-700">
                <strong>{t('weight')}:</strong> {product.weight} kg
              </p>
            </div>
            <div>
              <p className="text-gray-700">
                <strong>{t('dimensions')}:</strong> {product.dimensions.width} x{" "}
                {product.dimensions.height} x {product.dimensions.depth} cm
              </p>
            </div>
          </div>
        </div>

        <div>
          <h3 className="text-xl font-semibold mb-2 text-gray-800 border-b pb-2 border-gray-300">
            {t('availability_warranty')}
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-4 gap-y-2">
            <div>
              <p className="text-gray-700">
                <strong>{t('stock')}:</strong>
                <span
                  className={`ml-1 font-medium ${
                    product.stock > 0 ? "text-green-600" : "text-red-600"
                  }`}
                >
                  {product.stock > 0 ? t('in_stock') : t('out_of_stock')}
                </span>
              </p>
            </div>
            <div>
              <p className="text-gray-700">
                <strong>{t('warranty')}:</strong> {product.warrantyInformation}
              </p>
            </div>
            <div>
              <p className="text-gray-700">
                <strong>{t('return_policy2')}:</strong> {product.returnPolicy}
              </p>
            </div>
            <div>
              <p className="text-gray-700">
                <strong>{t('shipping')}:</strong> {product.shippingInformation}
              </p>
            </div>
          </div>
        </div>

        <div>
          <h3 className="text-xl font-semibold mb-2 text-gray-800 border-b pb-2 border-gray-300">
            {t('rating_barcode')}
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-4 gap-y-2">
            <div>
              <p className="text-gray-700">
                <strong>{t('barcode')}:</strong> {product.meta.barcode}
              </p>
              <img
                src={product.meta.qrCode}
                alt="QR Code"
                className="w-32 h-32 border border-gray-300 rounded-md mt-2"
              />
            </div>
            <div className="flex items-center">
              <strong>{t('rating')}:</strong>
              {renderStars(product.rating)}
              <span className="ml-2 text-gray-700">({product.rating} / 5)</span>
            </div>
          </div>
        </div>
      </div>

      <div className="text-center mt-10">
        <button
          onClick={addToCart}
          className="bg-blue-600 text-white py-3 px-6 rounded-lg font-semibold hover:bg-blue-700 transition-colors duration-300"
        >
          {t('add_to_cart')}
        </button>
      </div>
    </div>
  );
};

export default ProductInfo;
