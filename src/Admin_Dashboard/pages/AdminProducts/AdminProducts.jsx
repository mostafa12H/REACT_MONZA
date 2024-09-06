import React from "react";
import BarChartComponent from "../../Charts/BarChartComponent";
import PieChartComponent from "../../Charts/PieChartComponent";
import List from "../../Components/Lists/List";
import TitleComponent from "../../Components/Title/title";
import { TailSpin } from "react-loader-spinner";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useProductsData } from "../../customhooks/useProductsData";
import { useTranslation } from "react-i18next";

export default function AdminProducts() {
  const { t } = useTranslation();
  const {
    loading,
    categoryDistribution,
    ratingData,
    filterBrand,
    filterOptions,
    setFilterBrand,
  } = useProductsData();

  const handleBrandFilterChange = (e) => {
    setFilterBrand(e.target.value);
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <TailSpin height="80" width="80" color="#4fa94d" ariaLabel="loading" />
      </div>
    );
  }

  return (
    <div className="p-6">
      <ToastContainer />
      <TitleComponent title={t("products")} />

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <PieChartComponent
          data={categoryDistribution}
          title={t("products_distribution")}
        />
        <BarChartComponent
          data={ratingData}
          title={t("product_ratings")}
          dataKey="rating"
          barColor="#4f46e5"
        />
      </div>

      <div className="mt-8 overflow-x-auto">
        <List
          title={t("products")}
          apiUrl="https://dummyjson.com/products?limit=194"
          addurl="https://dummyjson.com/products"
          editurl="https://dummyjson.com/products"
          columns={[
            { key: "title", label: t("title") },
            { key: "price", label: t("price") , type:"number"},
            { key: "category", label: t("category") },
            { key: "brand", label: t("brand") },
          ]}
          handleFilterChange={handleBrandFilterChange}
          filterKey="brand"
          filterValue={filterBrand}
          filterOptions={filterOptions}
        />
      </div>
    </div>
  );
}
