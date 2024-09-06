import React, { useEffect, useState } from "react";

import Navbar from "../layout/Navbar";
import Footer from "../layout/Footer";
import { Outlet } from "react-router-dom";
import { useTranslation } from "react-i18next";

function UserLayout() {
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
  return (
    <div className="flex flex-col min-h-screen">
    <Navbar
          currentLanguage={currentLanguage}
          onLanguageChange={handleLanguageChange}
        />  
            <Outlet />
      <div className="flex-grow"></div>
      <Footer />
    </div>
  );
}

export default UserLayout;
