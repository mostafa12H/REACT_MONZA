import React, { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import { TailSpin } from "react-loader-spinner";
import { useTranslation } from "react-i18next";

const CategoryProducts = () => {
  const { slug } = useParams();
  const { t } = useTranslation();
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch(
          `https://dummyjson.com/products/category/${slug}`
        );
        const data = await response.json();
        setProducts(data.products);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching products:", error);
        setLoading(false);
      }
    };

    fetchProducts();
  }, [slug]);

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <TailSpin height="80" width="80" color="#4fa94d" ariaLabel="loading" />
      </div>
    );
  }

  return (
    <div className="container mx-auto py-8">
      <h2 className="text-3xl font-bold mb-6 text-center">
        {t('products_in')} {slug}
      </h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {products.map((product) => (
          <Link
            key={product.id}
            to={`/product/${product.id}`}
            className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300"
          >
            <img
              src={product.thumbnail}
              alt={product.title}
              className="w-full h-56 object-cover rounded-md mb-4"
            />
            <h3 className="text-xl font-semibold text-center">
              {product.title}
            </h3>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default CategoryProducts;
