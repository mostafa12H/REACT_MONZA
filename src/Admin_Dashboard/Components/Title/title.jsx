import React from "react";

const TitleComponent = ({ title }) => {
  return (
    <div className="p-4 mt-3 mb-3 bg-white dark:bg-gray-800 rounded shadow-md capitalize">
      <h1 className="text-lg font-bold text-gray-900 dark:text-gray-200">
        {title}
      </h1>
    </div>
  );
};

export default TitleComponent;
