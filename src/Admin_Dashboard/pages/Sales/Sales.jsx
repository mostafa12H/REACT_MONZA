import React from "react";
import LineChartComponent from "../../Charts/LineChartComponent";
import PieChartComponent from "../../Charts/PieChartComponent";
import List from "../../Components/Lists/List";
import TitleComponent from "../../Components/Title/title";
import { TailSpin } from "react-loader-spinner";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useSalesData } from "../../customhooks/useSalesData";
import { useTranslation } from "react-i18next";

export default function Sales() {
  const { t } = useTranslation();
  const {
    loading,
    sales,
    salesOverTimeData,
    productCategoryDistributionData,
    selectedDate,
    setSelectedDate,
    selectedUserId,
    setSelectedUserId,
  } = useSalesData();

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
      <TitleComponent title={t("sales")} />

      <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
        <LineChartComponent
          data={salesOverTimeData}
          title={t("sales_over_time")}
          dataKey="sales"
        />
        <PieChartComponent
          data={productCategoryDistributionData}
          title={t("products_sold")}
        />
      </div>

      <div className="mt-8">
        <div className="overflow-x-auto">
          <List
            title={t("sales_transactions")}
            apiUrl="https://dummyjson.com/carts"
            columns={[
              { key: "userId", label: t("user_id") , type:"number"},
              { key: "total", label: t("total_amount"), type:"number" },
              { key: "discountedTotal", label: t("discounted_total"), type:"number" },
              { key: "totalProducts", label: t("total_products") , type:"number"},
              { key: "totalQuantity", label: t("total_quantity") , type:"number"},
            ]}
            handleFilterChange={() => {}}
            filterKey="userId"
            filterValue={selectedUserId}
            selectedDate={selectedDate}
            setSelectedDate={setSelectedDate}
            selectedUserId={selectedUserId}
            setSelectedUserId={setSelectedUserId}
            showFilters={false} 
          />
        </div>
      </div>
    </div>
  );
}
