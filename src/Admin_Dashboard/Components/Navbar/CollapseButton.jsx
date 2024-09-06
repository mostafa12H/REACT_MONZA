import React from "react";
import { FaBars } from "react-icons/fa";

const CollapseButton = ({ toggleCollapse, isDarkMode }) => {
  return (
    <FaBars
      className={`text-2xl cursor-pointer ${
        isDarkMode ? "text-white" : "text-gray-900"
      }`}
      onClick={toggleCollapse}
    />
  );
};

export default CollapseButton;
