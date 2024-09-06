import React from "react";
import { Link } from "react-router-dom";
import CollapseButton from "../common/CollapseButton";

const AcccountSidebar = ({ isCollapsed, onToggleCollapse }) => {
  return (
    <div
      className={`w-${
        isCollapsed ? "20" : "64"
      } dark:bg-gray-800 dark:text-white flex-shrink-0 bg-white text-black p-4 transition-all duration-300 ease-in-out md:flex flex-row`}
    >
      <CollapseButton toggleCollapse={onToggleCollapse} />
      <nav>
        <ul className="space-y-4">
          <li>
            <Link
              to="/account/update"
              className={`block w-full text-left py-2 px-4 hover:bg-gray-100 dark:hover:bg-gray-700 ${
                isCollapsed ? "text-xs" : "text-base"
              }`}
            >
              User Profile
            </Link>
          </li>
          <li>
            <Link
              to="/settings"
              className={`block w-full text-left py-2 px-4 hover:bg-gray-100 dark:hover:bg-gray-700 ${
                isCollapsed ? "text-xs" : "text-base"
              }`}
            >
              Settings
            </Link>
          </li>
        </ul>
      </nav>
    </div>
  );
};

export default AcccountSidebar;
