import React from "react";
import LineChartComponent from "../../Charts/LineChartComponent";
import PieChartComponent from "../../Charts/PieChartComponent";
import List from "../../Components/Lists/List";
import TitleComponent from "../../Components/Title/title";
import { TailSpin } from "react-loader-spinner";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import GeographicalDistribution from "../../Charts/GeographicalDistribution";
import UserActivityOverTime from "../../Charts/UserActivityOverTime";
import { useUsersData } from "../../customhooks/useUsersData";
import { useTranslation } from "react-i18next";

export default function Users() {
  const { t } = useTranslation();
  const {
    loading,
    users,
    filterRole,
    filterOptions,
    userGrowthData,
    roleDistributionData,
    handleRoleFilterChange,
  } = useUsersData();

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
      <TitleComponent title={t("users")} />

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <LineChartComponent
          data={userGrowthData}
          title={t("user_growth_over_time")}
          dataKey="users"
        />
        <PieChartComponent
          data={roleDistributionData}
          title={t("role_distribution")}
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-6">
        <UserActivityOverTime users={users} />
        <GeographicalDistribution users={users} />
      </div>

      <div className="mt-8">
        <div className="overflow-x-auto">
          <List
            title={t("users")}
            apiUrl="https://dummyjson.com/users"
            columns={[
              { key: "firstName", label: t("first_name") },
              { key: "lastName", label: t("last_name") },
              { key: "email", label: t("email") },
              { key: "phone", label: t("phone") , type:"number" },
              { key: "role", label: t("role") },
            ]}
            handleFilterChange={handleRoleFilterChange}
            filterKey="role"
            filterValue={filterRole}
            filterOptions={filterOptions}
          />
        </div>
      </div>
    </div>
  );
}
