import React from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

const LineChartComponent = ({
  data,
  title,
  dataKey,
  lineColor = "#4f46e5",
}) => {
  return (
    <div className="bg-gradient-to-r from-white to-gray-100 dark:bg-gradient-to-r dark:from-gray-800 dark:to-gray-900 p-6 rounded-xl shadow-xl border border-gray-200 dark:border-gray-700 mt-6">
      <h2 className="text-xl font-semibold mb-4 text-gray-900 dark:text-gray-200">
        {title}
      </h2>
      <div className="w-full h-64 sm:h-72 md:h-80 lg:h-96">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={data}>
            <CartesianGrid strokeDasharray="3 3" stroke="#e0e0e0" />
            <XAxis
              dataKey="name"
              stroke="#4b5563"
              tick={{ fontSize: 12, fontWeight: 500 }}
            />
            <YAxis stroke="#4b5563" tick={{ fontSize: 12, fontWeight: 500 }} />
            <Tooltip
              contentStyle={{
                backgroundColor: "#1f2937",
                border: "none",
                borderRadius: "8px",
                color: "#ffffff",
                fontSize: "14px",
                fontWeight: "500",
              }}
              itemStyle={{
                color: "#fbbf24",
              }}
              labelStyle={{ fontSize: "14px", fontWeight: "600" }}
            />
            <Line
              type="monotone"
              dataKey={dataKey}
              stroke={lineColor}
              strokeWidth={2}
              dot={{ r: 5 }}
              activeDot={{ r: 8 }}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default LineChartComponent;
