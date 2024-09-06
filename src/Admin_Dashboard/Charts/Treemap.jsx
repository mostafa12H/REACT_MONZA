import React from "react";
import { Treemap, ResponsiveContainer } from "recharts";

const DynamicTreemap = ({
  data,
  title,
  width = "100%",
  height = "100%",
  aspectRatio = 4 / 3,
  stroke = "#fff",
  fill = "#8884d8",
}) => {
  return (
    <div className="bg-gradient-to-r from-white to-gray-100 dark:bg-gradient-to-r dark:from-gray-800 dark:to-gray-900 p-6 rounded-xl shadow-xl border border-gray-200 dark:border-gray-700 mt-6">
      <h2 className="text-xl font-semibold mb-4 text-gray-900 dark:text-gray-200">
        {title}
      </h2>
      <ResponsiveContainer width={width} height={height}>
        <Treemap
          data={data}
          dataKey="size"
          aspectRatio={aspectRatio}
          stroke={stroke}
          fill={fill}
        />
      </ResponsiveContainer>
    </div>
  );
};
export default DynamicTreemap;
