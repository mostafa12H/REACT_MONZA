import React from "react";
import TitleComponent from "../../Components/Title/title";
import PieChartComponent from "../../Charts/PieChartComponent";
import { useProductsData } from "../../customhooks/useProductsData";
import { TailSpin } from "react-loader-spinner";
import UserActivityOverTime from "../../Charts/UserActivityOverTime";
import GeographicalDistribution from "../../Charts/GeographicalDistribution";
import { useUsersData } from "../../customhooks/useUsersData";
import { useTranslation } from "react-i18next";

export default function Overview() {
  const { t } = useTranslation();
  const { loading, categoryDistribution } = useProductsData(); 
  const { users } = useUsersData();

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <TailSpin height="80" width="80" color="#4fa94d" ariaLabel="loading" />
      </div>
    );
  }

  return (
    <div className="p-6">
      <TitleComponent title={t("overview")} />
      <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
        <PieChartComponent
          data={categoryDistribution}
          title={t("product_category_distribution")}
        />
        <UserActivityOverTime users={users} />
      </div>
      <div className="lg:grid-cols-2 gap-6">
        <GeographicalDistribution users={users} />
      </div>
    </div>
  );
}
