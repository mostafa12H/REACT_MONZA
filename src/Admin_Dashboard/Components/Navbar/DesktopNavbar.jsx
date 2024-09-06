import React from "react";
import NavItem from "./NavItem";
import {
  FaChartBar,
  FaBoxOpen,
  FaUsers,
  FaDollarSign,
  FaChartLine,
  FaCog,
  FaServer,
  FaUserCircle,
} from "react-icons/fa";

const DesktopNavbar = ({ t }) => {
  return (
    <nav className="lg:hidden zindex  desk  xl:flex xl:items-center xl:space-x-6 align-middle justify-center">
      <NavItem
        to="/admin/overview"
        icon={<FaChartBar className="text-blue-600 " />}
        label={t("overview")}
        className="hover:text-blue-500 transition duration-200 ease-in-out"
      />
      <NavItem
        to="/admin/admin-products"
        icon={<FaBoxOpen className="text-purple-600 " />}
        label={t("products")}
        className="hover:text-purple-500 transition duration-200 ease-in-out"
      />
      <NavItem
        to="/admin/users"
        icon={<FaUsers className="text-pink-600 " />}
        label={t("users")}
        className="hover:text-pink-500 transition duration-200 ease-in-out"
      />
      <NavItem
        to="/admin/sales"
        icon={<FaDollarSign className="text-green-600 " />}
        label={t("sales")}
        className="hover:text-green-500 transition duration-200 ease-in-out"
      />
      <NavItem
        to="/admin/analytics"
        icon={<FaChartLine className="text-blue-600  " />}
        label={t("analytics")}
        className="hover:text-blue-500 transition duration-200 ease-in-out"
      />
      <NavItem
        to="/admin/settings"
        icon={<FaCog className="text-green-600 " />}
        label={t("settings")}
        className="hover:text-green-500 transition duration-200 ease-in-out"
      />
      <NavItem
        to="/admin/admin-panel"
        icon={<FaServer className="text-red-600  " />}
        label={t("admin_panel")}
        className="hover:text-red-500 transition duration-200 ease-in-out"
      />
      <NavItem
        to="/home"
        icon={<FaUserCircle className="text-gray-600  " />}
        label={t("userpage")}
        className="hover:text-gray-500 transition duration-200 ease-in-out"
      />
    </nav>
  );
};

export default DesktopNavbar;
