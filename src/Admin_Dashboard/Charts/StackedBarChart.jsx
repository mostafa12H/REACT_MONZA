import React from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

const COLORS = ["#4f46e5", "#10b981", "#fbbf24", "#ef4444"];

const StackedBarChart = ({ data, xLabels, yLabels, title }) => {
  const groupedData = xLabels.map((day, dayIndex) => {
    const dayData = { day };
    yLabels.forEach((hour, hourIndex) => {
      const record = data.find(
        (d) => d.day === dayIndex && d.hour === hourIndex
      );
      dayData[hour] = record ? record.activity : 0;
    });
    return dayData;
  });

  return (
    <div className="bg-gradient-to-r from-white to-gray-100 dark:bg-gradient-to-r dark:from-gray-800 dark:to-gray-900 p-6 rounded-xl shadow-xl border border-gray-200 dark:border-gray-700 mt-6">
      <h2 className="text-xl font-semibold mb-4 text-gray-900 dark:text-gray-200">
        {title}
      </h2>
      <div className="w-full h-64 sm:h-72 md:h-80 lg:h-96">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart
            data={groupedData}
            margin={{ top: 20, right: 40, bottom: 10, left: 10 }}
            barCategoryGap="20%"
          >
            <CartesianGrid strokeDasharray="3 3" stroke="#e0e0e0" />
            <XAxis
              dataKey="day"
              stroke="#4b5563"
              tick={{ fontSize: 12, fontWeight: 500 }}
            />
            <YAxis stroke="#4b5563" tick={{ fontSize: 12, fontWeight: 500 }} />
            <Tooltip
              cursor={{ fill: "rgba(255, 255, 255, 0.1)" }}
              contentStyle={{
                backgroundColor: "#1f2937",
                border: "none",
                borderRadius: "8px",
                color: "#ffffff",
                fontSize: "14px",
                fontWeight: "500",
              }}
              labelStyle={{ fontSize: "14px", fontWeight: "600" }}
            />
            <Legend
              verticalAlign="top"
              align="center"
              wrapperStyle={{ paddingBottom: "20px", color: "#4b5563" }}
            />
            {yLabels.map((hour, index) => (
              <Bar
                key={hour}
                dataKey={hour}
                stackId="a"
                fill={COLORS[index % COLORS.length]}
              />
            ))}
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default StackedBarChart;
