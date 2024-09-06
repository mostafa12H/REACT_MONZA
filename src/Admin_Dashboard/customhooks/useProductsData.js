import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setProducts, selectProducts } from "../../features/productSlice";
import { toast } from "react-toastify";

export const useProductsData = () => {
  const dispatch = useDispatch();
  const { products } = useSelector(selectProducts);
  const [loading, setLoading] = useState(true);
  const [categoryDistribution, setCategoryDistribution] = useState([]);
  const [ratingData, setRatingData] = useState([]);
  const [filterBrand, setFilterBrand] = useState("");
  const [ratingData2, setRatingData2] = useState([]);

  const [filterOptions, setFilterOptions] = useState([
    { label: "All", value: "" },
  ]);

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    setLoading(true);
    try {
      const res = await fetch("https://dummyjson.com/products?limit=194");
      const data = await res.json();
      dispatch(setProducts(data.products));
      fetchCategoryDistribution(data.products);
      setRatingData(prepareRatingData(data.products));
      setRatingData2(prepareRatingData2(data.products));

      generateFilterOptions(data.products);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching products:", error);
      toast.error("Error fetching products");
      setLoading(false);
    }
  };

  const fetchCategoryDistribution = (products) => {
    const categoryMap = {};
    products.forEach((product) => {
      if (categoryMap[product.category]) {
        categoryMap[product.category] += 1;
      } else {
        categoryMap[product.category] = 1;
      }
    });

    const distributionData = Object.keys(categoryMap).map((category) => ({
      name: category.charAt(0).toUpperCase() + category.slice(1),
      value: categoryMap[category],
      color: getRandomColor(),
    }));

    setCategoryDistribution(distributionData);
  };

  const prepareRatingData = (products) => {
    return products.map((product) => ({
      name: product.title,
      rating: product.rating,
    }));
  };

  const prepareRatingData2 = (products) => {
    return products.map((product) => {
      const revenue = product.price * product.stock;
      const profit = revenue * (product.discountPercentage / 100);

      return {
        name: product.title,
        sales: product.stock,
        revenue: revenue,
        profit: profit,
      };
    });
  };
  const generateFilterOptions = (products) => {
    const brands = Array.from(
      new Set(products.map((product) => product.brand))
    );
    const brandOptions = brands.map((brand) => ({
      label: brand,
      value: brand,
    }));

    setFilterOptions([{ label: "All", value: "" }, ...brandOptions]);
  };

  const getRandomColor = () => {
    const letters = "0123456789ABCDEF";
    let color = "#";
    for (let i = 0; i < 6; i++) {
      color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
  };

  return {
    loading,
    categoryDistribution,
    ratingData,
    filterBrand,
    filterOptions,
    setFilterBrand,
    ratingData2,
  };
};
