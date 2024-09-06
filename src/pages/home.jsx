import React from "react";
import SliderComponent from "../Components/common/Slider";
import ProductCategories from "../Components/products/product_categories";
import Banner from "../Components/common/banner";
import Timer from "./../Components/Timer/Tiimer";
import NewArrivals from "../Components/products/newArrivals";

export default function Home() {
  return (
    <div className="bg-white dark:bg-dark text-gray-900 dark:text-light">
      <Banner />

      <SliderComponent />
      <Timer />
      <ProductCategories />
      <NewArrivals />
    </div>
  );
}
