import React from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import { useTranslation } from "react-i18next";

const UserActivityOverTime = ({ users }) => {
  const { t } = useTranslation();

  const activityData = users
    .reduce((acc, user) => {
      const year = new Date(user.birthDate).getFullYear();
      const existingYear = acc.find((item) => item.year === year);
      if (existingYear) {
        existingYear.users += 1;
      } else {
        acc.push({ year, users: 1 });
      }
      return acc;
    }, [])
    .sort((a, b) => a.year - b.year);

  return (
    <div className="bg-gradient-to-r from-white to-gray-100 dark:bg-gradient-to-r dark:from-gray-800 dark:to-gray-900 p-6 rounded-xl shadow-xl border border-gray-200 dark:border-gray-700 mt-6">
      <h2 className="text-xl font-semibold mb-4 text-gray-900 dark:text-gray-200">
        {t("user_activity_over_time")}
      </h2>
      <ResponsiveContainer width="100%" height={400}>
        <LineChart data={activityData}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="year" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Line
            type="monotone"
            dataKey="users"
            stroke="#8884d8"
            activeDot={{ r: 8 }}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};

export default UserActivityOverTime;
