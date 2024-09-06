import { Outlet } from "react-router-dom";
import Navbar from "../../Components/Navbar/Navbar";
import Footer from "../../Components/Footer/Footer";
import React, { useEffect, useState } from "react";


import { useTranslation } from "react-i18next";

function AdminLayout() {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [currentLanguage, setCurrentLanguage] = useState(
    localStorage.getItem("i18nextLng") || "en"
  );  
  const { i18n } = useTranslation();
    useEffect(() => {
    i18n.changeLanguage(currentLanguage);
    localStorage.setItem("i18nextLng", currentLanguage);
  }, [currentLanguage, i18n]);
  const handleLanguageChange = (langCode) => {
    setCurrentLanguage(langCode);
  };
  const handleToggleCollapse = (collapsed) => {
    setIsCollapsed(collapsed);
  };

  return (
    <div  dir="auto"  className="flex flex-col min-h-screen">
      <div className="flex flex-grow">
 <Navbar
          currentLanguage={currentLanguage}
          onLanguageChange={handleLanguageChange}
        />          <div
          className=
             " flex-grow transition-margin ease-in-out width2 mt-10"
        >
          <Outlet />
        </div>

      </div>
                    <Footer isCollapsed={isCollapsed} />

    </div>
  );
}

export default AdminLayout;
