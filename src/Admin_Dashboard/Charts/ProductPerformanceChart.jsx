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

const ProductPerformanceChart = ({ data, title }) => {
  return (
    <div className="bg-white dark:bg-gradient-to-r dark:from-gray-900 dark:to-gray-800 p-6 rounded-xl shadow-xl border border-gray-300 dark:border-gray-700 mt-6">
      <h2 className="text-xl font-semibold mb-4 text-gray-900 dark:text-white">
        {title}
      </h2>
      <ResponsiveContainer width="100%" height={400}>
        <BarChart
          data={data}
          margin={{
            top: 20,
            right: 30,
            left: 20,
            bottom: 5,
          }}
        >
          <CartesianGrid
            strokeDasharray="3 3"
            stroke="gray"
            className="dark:stroke-gray-600"
          />
          <XAxis
            dataKey="name"
            stroke="gray"
            className="dark:stroke-gray-300"
          />
          <YAxis stroke="gray" className="dark:stroke-gray-300" />
          <Tooltip
            cursor={{ fill: "rgba(0, 0, 0, 0.1)" }}
            contentStyle={{
              backgroundColor: "white",
              borderColor: "gray",
            }}
            itemStyle={{ color: "black" }}
            className="dark:bg-gray-700 dark:border-gray-600 dark:text-white"
          />
          <Legend className="text-gray-900 dark:text-white" />
          <Bar dataKey="sales" fill="#8884d8" />
          <Bar dataKey="revenue" fill="#82ca9d" />
          <Bar dataKey="profit" fill="#ffbb28" />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default ProductPerformanceChart;
