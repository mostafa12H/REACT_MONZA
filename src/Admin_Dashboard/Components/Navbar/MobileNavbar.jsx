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
  FaTimes,
} from "react-icons/fa";

const MobileNavbar = ({ isMenuOpen, setIsMenuOpen, t }) => {
  return (
    <nav
      className={`${
        isMenuOpen ? "flex flex-col space-y-4" : "hidden"
      } absolute top-16 left-0 right-0 bg-white dark:bg-gray-900 p-4 z-50`}
    >
      <button
        className="self-start text-xl mb-4"
        onClick={() => setIsMenuOpen(false)}
      >
        <FaTimes />
      </button>
      <NavItem
        to="/admin/overview"
        icon={<FaChartBar className="text-blue-500 m-2 " />}
        label={t("overview")}
        onClick={() => setIsMenuOpen(false)}  
      />
      <NavItem
        to="/admin/admin-products"
        icon={<FaBoxOpen className="text-purple-500 m-2 " />}
        label={t("products")}
        onClick={() => setIsMenuOpen(false)}  
      />
      <NavItem
        to="/admin/users"
        icon={<FaUsers className="text-pink-500 m-2" />}
        label={t("users")}
        onClick={() => setIsMenuOpen(false)}  
      />
      <NavItem
        to="/admin/sales"
        icon={<FaDollarSign className="text-green-500 m-2" />}
        label={t("sales")}
        onClick={() => setIsMenuOpen(false)}  
      />
      <NavItem
        to="/admin/analytics"
        icon={<FaChartLine className="text-blue-500 m-2 "  />}
        label={t("analytics")}
        onClick={() => setIsMenuOpen(false)}  
      />
      <NavItem
        to="/admin/settings"
        icon={<FaCog className="text-green-500 m-2" />}
        label={t("settings")}
        onClick={() => setIsMenuOpen(false)}  
      />
       <NavItem
        to="/admin/admin-panel"
        icon={<FaServer className="text-green-500 m-2 " />}
        label={t("admin_panel")}
        onClick={() => setIsMenuOpen(false)}  
      />
      <NavItem
        to="/home"
        icon={<FaUserCircle className="text-green-500 m-2" />}
        label={t("userpage")}
        onClick={() => setIsMenuOpen(false)}  
      />
     
    </nav>
  );
};

export default MobileNavbar;
