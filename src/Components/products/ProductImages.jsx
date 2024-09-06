import React, { useState } from "react";
import { TailSpin } from "react-loader-spinner";

const ProductImages = ({ product, openModal }) => {
  const [loading, setLoading] = useState(true);
  const [loadingStates, setLoadingStates] = useState(
    Array(product.images.length).fill(true)
  );

  const handleImageLoad = (index) => {
    setLoadingStates((prevStates) => {
      const newStates = [...prevStates];
      newStates[index] = false;
      return newStates;
    });
  };

  return (
    <div className="w-full lg:w-1/3 flex flex-col items-center">
      <div className="relative w-5/6 h-4/12">
        {loading && (
          <div className="absolute inset-0 flex justify-center items-center">
            <TailSpin
              height="50"
              width="50"
              color="#4fa94d"
              ariaLabel="loading"
            />
          </div>
        )}
        <img
          src={product.thumbnail}
          alt={product.title}
          className={`w-full h-auto rounded-lg cursor-pointer border border-gray-300 shadow-sm hover:shadow-lg transition-all duration-300 mb-4 ${
            loading ? "opacity-0" : "opacity-100"
          }`}
          onClick={() => openModal(product.thumbnail)}
          onLoad={() => setLoading(false)}
        />
      </div>
      <div className="grid grid-cols-3 gap-2 w-full mt-1 ml-5">
        {product.images.map((image, index) => (
          <div key={index} className="relative w-full h-28">
           
            <img
              src={image}
              alt={`${product.title} ${index + 1}`}
              className={`w-full h-auto rounded-lg pl-2 cursor-pointer border border-gray-300 shadow-sm hover:shadow-lg transition-all duration-300 mb-4 ${
                loadingStates[index] ? "opacity-0" : "opacity-100 "
              }`}
              onClick={() => openModal(image)}
              onLoad={() => handleImageLoad(index)}
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProductImages;
