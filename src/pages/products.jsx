import React, { useState, useEffect, useCallback } from "react";
import { TailSpin } from "react-loader-spinner";
import Pagination from "../Components/common/Pagination";
import { useDispatch } from "react-redux";
import SortOptions from "../Components/products/SortOptions";
import ProductCard from "../Components/products/ProductCard";
import Sidebar from "../Components/layout/sidebar";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faList, faTh } from "@fortawesome/free-solid-svg-icons";
import { Bounce, toast } from "react-toastify";
import { addItemToCart } from "../features/cartSlice";
import { useTranslation } from "react-i18next";
import SmallScreenFilters from "../Components/layout/SmallScreenFilters";



const Products = () => {
  const { t } = useTranslation();
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]); // New state to store all filtered products
  const [displayedProducts, setDisplayedProducts] = useState([]); // This will still store paginated products
  const [categories, setCategories] = useState([]);
  const [brands, setBrands] = useState([]);
  const [maxPrice, setMaxPrice] = useState(250);
  const [selectedCategory, setSelectedCategory] = useState([]);
  const [selectedBrand, setSelectedBrand] = useState([]);
  const [priceRange, setPriceRange] = useState(maxPrice);
  const [quantities, setQuantities] = useState({});
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [searchQuery] = useState("");
  const [viewMode, setViewMode] = useState("grid");
  const [sortOrder, setSortOrder] = useState(
    localStorage.getItem("sortOrder") || "asc"
  );
  const [sortBy, setSortBy] = useState(
    localStorage.getItem("sortBy") || "title"
  );
  const dispatch = useDispatch();

  const productsPerPage = 8;

  useEffect(() => {
    fetchCategories();
  }, []);

  useEffect(() => {
    fetchProductsByCategory();
  }, [sortBy, sortOrder, selectedCategory, currentPage]);

  useEffect(() => {
    setCurrentPage(1);  
    filterAndSortProducts();
  }, [selectedBrand]);

  const fetchCategories = async () => {
    try {
      const response = await fetch("https://dummyjson.com/products/categories");
      const categories = await response.json();

      const categoryNames = [
        "All",
        ...categories.map((category) => category.slug),
      ];
      setCategories(categoryNames);
    } catch (error) {
      console.error("Error fetching categories:", error);
    }
  };

  const fetchProductsByCategory = async () => {
    setLoading(true);
    setProducts([]);
    try {
      const categoryQuery =
        selectedCategory.length > 0 && selectedCategory[0] !== "All"
          ? `/category/${selectedCategory[0]}`
          : "";

      const url = categoryQuery
        ? `https://dummyjson.com/products${categoryQuery}`
        : `https://dummyjson.com/products?limit=194`;

      const response = await fetch(url);
      const data = await response.json();
      const productsList = Array.isArray(data.products) ? data.products : data;

      setProducts(productsList);

      const maxPrice = Math.max(...productsList.map((p) => p.price));
      setMaxPrice(maxPrice);
      setPriceRange(maxPrice);

      const uniqueBrands = [
        ...new Set(productsList.map((p) => (p?.brand ? p.brand : null))),
      ];

      if (uniqueBrands) {
        setBrands(uniqueBrands);
      }

      filterAndSortProducts();

      setLoading(false);
      initializeQuantities(productsList);
    } catch (error) {
      console.error("Error fetching products:", error);
      setLoading(false);
    }
  };

  const initializeQuantities = (products) => {
    const initialQuantities = {};
    products.forEach((product) => {
      initialQuantities[product.id] = 1;
    });
    setQuantities(initialQuantities);
  };

  const filterAndSortProducts = useCallback(() => {
    let filteredProductsList = products;

    // Filter by selected brand
    if (selectedBrand.length > 0) {
      filteredProductsList = filteredProductsList.filter((product) =>
        selectedBrand.includes(product.brand)
      );
    }

    // Filter by price range
    filteredProductsList = filteredProductsList.filter(
      (product) => product.price <= priceRange
    );

    // Search query filter
    if (searchQuery) {
      filteredProductsList = filteredProductsList.filter((product) =>
        product.title.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    // Sorting logic
    filteredProductsList.sort((a, b) => {
      if (sortBy === "price") {
        return sortOrder === "asc" ? a.price - b.price : b.price - a.price;
      } else if (sortBy === "title") {
        return sortOrder === "asc"
          ? a.title.localeCompare(b.title)
          : b.title.localeCompare(a.title);
      }
      return 0;
    });

    // Set all filtered products (without pagination)
    setFilteredProducts(filteredProductsList);

    // Pagination logic
    const startIndex = (currentPage - 1) * productsPerPage;
    const paginatedProducts = filteredProductsList.slice(
      startIndex,
      startIndex + productsPerPage
    );

    // Set paginated products for display
    setDisplayedProducts(paginatedProducts);

    // Set total pages for pagination
    setTotalPages(Math.ceil(filteredProductsList.length / productsPerPage));
  }, [
    products,
    selectedBrand,
    priceRange,
    searchQuery,
    sortBy,
    sortOrder,
    currentPage,
  ]);

  useEffect(() => {
    filterAndSortProducts();
  }, [
    currentPage,
    selectedBrand,
    priceRange,
    searchQuery,
    sortBy,
    sortOrder,
    filterAndSortProducts,
  ]);

  const handleSortChange = (field, order) => {
    setSortBy(field);
    setSortOrder(order);
    setCurrentPage(1);
    localStorage.setItem("sortBy", field);
    localStorage.setItem("sortOrder", order);
  };

  const handleCategoryChange = (category) => {
    if (category === "All") {
      setSelectedCategory([]);
    } else {
      setSelectedCategory([category]);
    }
    setSelectedBrand([]);
    setCurrentPage(1);
  };

  const handleBrandChange = (brand) => {
    setSelectedBrand([brand]);
    setCurrentPage(1);
  };

  const handlePriceChange = (newPrice) => {
    setPriceRange(newPrice);
  };

  const handleFilter = (newPrice) => {
    setPriceRange(newPrice);
    setCurrentPage(1);
  };

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  const handleQuantityChange = (productId, change) => {
    setQuantities((prevQuantities) => ({
      ...prevQuantities,
      [productId]: Math.max(1, (prevQuantities[productId] || 1) + change),
    }));
  };

  const handleAddToCart = (product) => {
    const quantity = quantities[product.id];
    dispatch(addItemToCart({ ...product, quantity }));

    toast.success(
      `${quantity} ${product.title} ${t("has_been_added_to_the_cart")}`,
      {
        position: "top-center",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
        transition: Bounce,
      }
    );
  };

  const handleViewModeChange = (mode) => {
    setViewMode(mode);
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <TailSpin height="80" width="80" color="#4fa94d" ariaLabel="loading" />
      </div>
    );
  }

  return (
    <div className="container mx-auto py-8 max-w-7xl px-4">
      <div className="flex flex-col lg:flex-row">
        <SmallScreenFilters
          categories={categories}
          brands={brands}
          selectedCategory={selectedCategory}
          selectedBrand={selectedBrand}
          onCategoryChange={handleCategoryChange}
          onBrandChange={handleBrandChange}
          className="small-screen-filters"
        />

        <Sidebar
          categories={categories}
          brands={brands}
          maxPrice={maxPrice}
          selectedCategory={selectedCategory}
          selectedBrand={selectedBrand}
          priceRange={priceRange}
          onCategoryChange={handleCategoryChange}
          onBrandChange={handleBrandChange}
          onPriceChange={handlePriceChange}
          onFilter={handleFilter}
          className="sidebar"
        />

        <div className="w-full lg:w-3/4 lg:pl-8">
          <div className="flex flex-wrap justify-between items-center mb-4 sm:mb-6">
            <p className="text-xs sm:text-sm md:text-base flex items-center space-x-1 sm:space-x-2">
              <span>{t("we_found")}</span>
              <span className="font-bold">
                {selectedCategory.length === 0 || selectedCategory[0] === "All"
                  ? filteredProducts.length // Show total filtered products when "All" category is selected
                  : displayedProducts.length}
              </span>
              <span>{t("items_for_you")}</span>
            </p>

            <div className="flex items-center space-x-2 sm:space-x-4">
              <SortOptions
                sortBy={sortBy}
                sortOrder={sortOrder}
                onSortChange={handleSortChange}
              />
              <div className="flex items-center space-x-1 sm:space-x-2">
                <button
                  onClick={() => handleViewModeChange("grid")}
                  className={`px-2 py-1 sm:px-3 sm:py-2 rounded ${
                    viewMode === "grid" ? "bg-gray-200" : ""
                  }`}
                >
                  <FontAwesomeIcon icon={faTh} />
                </button>
                <button
                  onClick={() => handleViewModeChange("list")}
                  className={`px-2 py-1 sm:px-3 sm:py-2 rounded ${
                    viewMode === "list" ? "bg-gray-200" : ""
                  }`}
                >
                  <FontAwesomeIcon icon={faList} />
                </button>
              </div>
            </div>
          </div>

          <div
            className={`${
              viewMode === "list"
                ? "grid grid-cols-1 gap-4 sm:gap-6"
                : "grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6"
            }`}
          >
            {displayedProducts.map((product) => (
              <ProductCard
                key={product.id}
                product={product}
                quantity={quantities[product.id]}
                onQuantityChange={handleQuantityChange}
                onAddToCart={handleAddToCart}
                viewMode={viewMode}
              />
            ))}
          </div>

          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={handlePageChange}
          />
        </div>
      </div>
    </div>
  );
};

export default Products;
