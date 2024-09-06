import React, { useState, useEffect, useCallback } from "react";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import ProductCard2 from "../products/productCard2";
export default function NewArrivals() {
  const { t } = useTranslation();
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [, setQuantities] = useState({});

  const initializeQuantities = useCallback((products) => {
    const initialQuantities = {};
    products.forEach((product) => {
      initialQuantities[product.id] = 1;
    });
    setQuantities(initialQuantities);
  }, []);

  const fetchProducts = useCallback(async () => {
    setLoading(true);
    try {
      const response = await fetch(
        "https://dummyjson.com/products?limit=4&skip=10"
      );
      const data = await response.json();
      const productsList = Array.isArray(data.products) ? data.products : data;
      setProducts(productsList);
      initializeQuantities(productsList);
    } catch (error) {
      console.error("Error fetching products:", error);
    } finally {
      setLoading(false);
    }
  }, [initializeQuantities]);

  useEffect(() => {
    fetchProducts();
  }, [fetchProducts]);

  return (
    <div className="p-4 bg-[#FAF9F6]">
      <h1 className="text-2xl font-bold mb-4 text-center">
        {t("new_arrivals")}
      </h1>
      {loading ? (
        <div className="flex justify-center items-center h-64">
          <div className="w-12 h-12 border-4 border-t-transparent border-blue-500 border-solid rounded-full animate-spin"></div>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {products.map((product) => (
            <Link
              key={product.id}
              to={`/product/${product.id}`}
              className="block"
            >
              <ProductCard2 product={product} />
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}
