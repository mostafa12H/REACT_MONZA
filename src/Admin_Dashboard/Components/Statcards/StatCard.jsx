import React from "react";

const StatCard = ({ title, value, icon }) => {
  return (
    <div className="p-4 bg-white dark:bg-gray-800 rounded-lg shadow-md">
      <div className="flex items-center">
        {icon && (
          <div className="text-xl text-gray-900 dark:text-white mr-2">
            {icon}
          </div>
        )}
        <h2 className="text-lg font-bold text-gray-900 dark:text-gray-200">
          {title}
        </h2>
      </div>
      <p className="text-2xl text-gray-900 dark:text-gray-300">{value}</p>
    </div>
  );
};

export default StatCard;
