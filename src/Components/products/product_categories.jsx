import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { TailSpin } from "react-loader-spinner";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import "swiper/css/autoplay";
import { Pagination, Navigation, Autoplay } from "swiper/modules";
import { useTranslation } from 'react-i18next';

const ProductCategories = () => {
  const { t } = useTranslation();
  const [categories, setCategories] = useState([]);
  const [categoryProducts, setCategoryProducts] = useState({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCategoriesAndProducts = async () => {
      try {
        const response = await fetch(
          "https://dummyjson.com/products/categories"
        );
        const data = await response.json();

        setCategories(data);

        const fetchFirstProducts = await Promise.all(
          data.map(async (category) => {
            const response = await fetch(
              `https://dummyjson.com/products/category/${category.slug}`
            );
            const productData = await response.json();
            return {
              category: category.slug,
              product: productData.products[0],
            };
          })
        );

        const productsByCategory = fetchFirstProducts.reduce(
          (acc, { category, product }) => {
            acc[category] = product;
            return acc;
          },
          {}
        );

        setCategoryProducts(productsByCategory);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching categories or products:", error);
        setLoading(false);
      }
    };

    fetchCategoriesAndProducts();
  }, []);

  if (loading) {
    return (
      <div className="container mx-auto py-8 ">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {Array(4)
            .fill(0)
            .map((_, index) => (
              <div
                key={index}
                className="bg-gray-200 dark:bg-[#5B2B89] p-4 w-56 h-56 mx-auto animate-pulse"
              />
            ))}
        </div>
      </div>
    );
  }

  return (
    <div className="relative bg-[#FAF9F6] py-10 md:py-20 w-full">
      <div className="relative container mx-auto py-8">
        <h2 className="text-2xl font-bold mb-6 text-center text-gray-800 dark:text-black">
          {t('product_categories')}
        </h2>
        <Swiper
          spaceBetween={10} 
          slidesPerView={1}
          loop={true}
          speed={15000}
          autoplay={{
            disableOnInteraction: false,
          }}
          modules={[Navigation, Pagination, Autoplay]}
          className="relative z-10 w-full scroll-smooth "
          breakpoints={{
            640: { slidesPerView: 2 },
            768: { slidesPerView: 3 },
            1024: { slidesPerView: 4 },
          }}
        >
          {categories.map((category, index) => (
            <SwiperSlide key={index} className="text-center px-1"> 
              <Link
                to={`/category/${category.slug}`}
                className="bg-white shadow-md p-2 flex items-center justify-center w-56 h-56 mx-auto block" 
              >
                {!categoryProducts[category.slug] ? (
                  <TailSpin
                    height="50"
                    width="50"
                    color="#4fa94d"
                    ariaLabel="loading"
                  />
                ) : (
                  <img
                    src={categoryProducts[category.slug].thumbnail}
                    alt={categoryProducts[category.slug].title}
                    className="w-32 h-32 object-fill"
                  />
                )}
              </Link>
              <h3 className="text-xl font-semibold mt-2 text-gray-800 dark:text-black"> 
                {category.name}
              </h3>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </div>
  );
};

export default ProductCategories;
