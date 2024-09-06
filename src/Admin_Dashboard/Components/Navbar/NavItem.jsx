import React from "react";
import { NavLink } from "react-router-dom";

const NavItem = ({ to, icon, label, isCollapsed, onClick }) => {
  return (
    <li className={`list-none ${isCollapsed ? "w-full" : "w-auto"} transition-width duration-200`}>
      <NavLink
        to={to}
        aria-label={isCollapsed ? label : undefined}
        className={({ isActive }) =>
          `flex ${isCollapsed ? "justify-center" : "justify-start"} items-center space-x-3 nan rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 cursor-pointer transition-colors ${
            isActive ? "bg-gray-200 dark:bg-gray-800" : ""
          }`
        }
        onClick={onClick}  
      >
        <div className="text-lg">{icon}</div>
        {!isCollapsed && <span className="text-sm m-0">{label}</span>}
      </NavLink>
    </li>
  );
};

export default NavItem;
