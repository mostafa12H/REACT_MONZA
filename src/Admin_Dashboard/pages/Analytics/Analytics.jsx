import React from "react";
import {
  FaDollarSign,
  FaBoxOpen,
  FaUser,
  FaEye,
  FaChartLine,
  FaCogs,
  FaThumbsUp,
} from "react-icons/fa";
import TitleComponent from "../../Components/Title/title";
import StatCard from "../../Components/Statcards/StatCard";
import RevenueVsTargetChart from "../../Charts/Areachart";
import ProductPerformanceChart from "../../Charts/ProductPerformanceChart";
import CustomRadarChart from "../../Charts/RadarChart";
import LineChartComponent from "../../Charts/LineChartComponent";
import { useProductsData } from "../../customhooks/useProductsData";
import { useSalesData } from "../../customhooks/useSalesData";
import { useUsersData } from "../../customhooks/useUsersData";
import { TailSpin } from "react-loader-spinner";
import { useTranslation } from "react-i18next";

export default function Analytics() {
  const { t } = useTranslation();
  const {
    loading: loadingProducts,
    categoryDistribution,
    ratingData2,
  } = useProductsData();

  const {
    loading: loadingSales,
    salesOverTimeData,
    productCategoryDistributionData,
  } = useSalesData();

  const {
    loading: loadingUsers,
    userGrowthData,
    roleDistributionData,
  } = useUsersData();

  if (loadingProducts || loadingSales || loadingUsers) {
    return (
      <div className="flex items-center justify-center h-screen">
        <TailSpin height="80" width="80" color="#4fa94d" ariaLabel="loading" />
      </div>
    );
  }

  return (
    <div className="side-layout min-h-screen bg-white dark:bg-gray-900 text-gray-900 dark:text-white p-4 sm:p-6">
      <TitleComponent title={t("analytics")} />
      
      {/* Stat Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 mb-6">
        <StatCard
          title={t("users")}
          value={userGrowthData[userGrowthData.length - 1]?.users}
          icon={<FaUser className="text-yellow-500 text-2xl" />}
          className="bg-white shadow-md rounded-lg p-4"
        />
        <StatCard
          title={t("revenue")}
          value={`$${salesOverTimeData.reduce((sum, data) => sum + data.sales, 0)}`}
          icon={<FaDollarSign className="text-green-500 text-2xl" />}
          className="bg-white shadow-md rounded-lg p-4"
        />
        <StatCard
          title={t("products")}
          value={categoryDistribution.reduce((sum, data) => sum + data.value, 0)}
          icon={<FaBoxOpen className="text-blue-500 text-2xl" />}
          className="bg-white shadow-md rounded-lg p-4"
        />
        <StatCard
          title={t("page_views")}
          value="123343399"
          icon={<FaEye className="text-green-500 text-2xl" />}
          className="bg-white shadow-md rounded-lg p-4"
        />
      </div>

      {/* Product Performance Chart */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6 mb-6">
        <ProductPerformanceChart data={ratingData2} title={t("product_performance")} />
        <CustomRadarChart title={t("customer_segmentation")} data={roleDistributionData} />
      </div>

      {/* User Growth Chart */}
      <div className="grid grid-cols-1 gap-4 sm:gap-6 mb-6">
        <LineChartComponent
          data={userGrowthData}
          title={t("user_growth_over_time")}
          dataKey={"users"}
        />
      </div>

      {/* Info Cards */}
      <div className="grid grid-cols-1 gap-4 sm:gap-6 mt-6">
        <div className="bg-white dark:bg-gray-800 shadow-md rounded-lg p-6">
          <div className="flex flex-col space-y-6">
            <div className="flex items-center">
              <FaChartLine className="text-blue-500 text-2xl mr-4" />
              <div>
                <h3 className="text-lg font-medium">{t("sales_growth")}:</h3>
                <p className="text-sm text-gray-900 dark:text-white">
                  {t("sales_increase_text")}
                </p>
              </div>
            </div>
            <div className="flex items-center">
              <FaCogs className="text-purple-500 text-2xl mr-4" />
              <div>
                <h3 className="text-lg font-medium">{t("operational_efficiency")}:</h3>
                <p className="text-sm text-gray-900 dark:text-white">
                  {t("efficiency_improvement_text")}
                </p>
              </div>
            </div>
            <div className="flex items-center">
              <FaThumbsUp className="text-green-500 text-2xl mr-4" />
              <div>
                <h3 className="text-lg font-medium">{t("customer_satisfaction")}:</h3>
                <p className="text-sm text-gray-900 dark:text-white">
                  {t("satisfaction_increase_text")}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
