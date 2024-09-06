import React from "react";
import { MdDarkMode, MdLightMode } from "react-icons/md";

const DarkModeToggle = ({ isDarkMode, toggleDarkMode, isCollapsed }) => {
  return (
    !isCollapsed && (
      <button
        onClick={toggleDarkMode}
        className="text-2xl p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800"
      >
        {isDarkMode ? <MdLightMode /> : <MdDarkMode />}
      </button>
    )
  );
};

export default DarkModeToggle;
