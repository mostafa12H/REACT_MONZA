import React from "react";

export default function ReusableSelect({
  filterRole,
  handleRoleFilterChange,
  filterOptions,
}) {
  return (
    <select
      value={filterRole}
      onChange={handleRoleFilterChange}
      className="ml-4 p-2 mt-1 mb-2 rounded-md bg-gray-100 dark:bg-gray-900 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-indigo-500 w-full sm:w-auto"
    >
      {filterOptions?.map((item, index) => (
        <option key={index} value={item.value}>
          {item.label}
        </option>
      ))}
    </select>
  );
}
