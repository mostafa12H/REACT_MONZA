import React from "react";

const renderStars = (rating) => {
  const fullStars = Math.floor(rating);
  const hasHalfStar = rating % 1 !== 0;
  const stars = [];

  for (let i = 0; i < fullStars; i++) {
    stars.push(
      <span key={`full-${i}`} className="text-yellow-400 text-xs">
        ★
      </span>
    );
  }

  if (hasHalfStar) {
    stars.push(
      <span key="half" className="text-yellow-400 text-xs">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="currentColor"
          viewBox="0 0 24 24"
          className="w-3 h-3"
        >
          <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />
          <path
            d="M0 0h24v24H0z"
            fill="none"
            className="text-gray-300"
          />
        </svg>
      </span>
    );
  }

  const emptyStars = 5 - Math.ceil(rating);
  for (let i = 0; i < emptyStars; i++) {
    stars.push(
      <span key={`empty-${i}`} className="text-gray-300 text-xs">
        ★
      </span>
    );
  }

  return stars;
};

const ProductCard2 = ({ product }) => {
  return (
    <div className="border rounded-lg overflow-hidden bg-white shadow-md hover:shadow-lg transition-shadow duration-300 w-full">
      <img
        src={product.thumbnail}
        alt={product.title}
        className="w-full h-42 object-cover"
      />
      <div className="p-3">
        <h2 className="text-sm font-semibold mb-1 truncate">{product.title}</h2>
        <p className="text-gray-600 text-xs mb-1 truncate">{product.brand}</p>
        <p className="text-green-600 font-semibold mb-1 text-xs">
          ${product.price.toFixed(2)}
        </p>
        <div className="flex items-center text-xs">
          {renderStars(product.rating)}
        </div>
      </div>
    </div>
  );
};

export default ProductCard2;
