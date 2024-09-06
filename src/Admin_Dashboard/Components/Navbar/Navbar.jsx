import React, { useState, useEffect, useRef } from "react";
import DarkModeToggle from "./DarkModeToggle";
import MobileNavbar from "./MobileNavbar";
import DesktopNavbar from "./DesktopNavbar";
import { FaBars, FaGlobe } from "react-icons/fa";
import { useTranslation } from "react-i18next";
import Flag from "react-world-flags";

const Navbar = ({ onToggleCollapse, currentLanguage, onLanguageChange }) => {
  const [isDarkMode, setIsDarkMode] = useState(() => {
    return localStorage.getItem("theme") === "dark" || false;
  });
  const [languageDropdownOpen, setLanguageDropdownOpen] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const languageDropdownRef = useRef(null);
  const { t } = useTranslation();

  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add("dark");
      localStorage.setItem("theme", "dark");
    } else {
      document.documentElement.classList.remove("dark");
      localStorage.setItem("theme", "light");
    }
  }, [isDarkMode]);

  const toggleDarkMode = () => {
    setIsDarkMode((prevMode) => !prevMode);
  };

  const toggleLanguageDropdown = () => {
    setLanguageDropdownOpen((prev) => !prev);
  };

  const handleClickOutside = (event) => {
    if (
      languageDropdownRef.current &&
      !languageDropdownRef.current.contains(event.target)
    ) {
      setLanguageDropdownOpen(false);
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  useEffect(() => {
    if (isMenuOpen) {
      document.body.classList.add("overflow-hidden");
    } else {
      document.body.classList.remove("overflow-hidden");
    }
  }, [isMenuOpen]);

  return (
    <div
      className={`fixed top-0 left-0 right-0 h-16 flex items-center px-4 transition-all duration-300 ease-in-out ${
        isDarkMode ? "bg-gray-900 text-white" : "bg-white text-gray-900"
      } z-50 border-b border-gray-200 dark:border-gray-700`}
    >
      <div className="flex items-center justify-between w-full">
        <div className="flex items-center">
          <DarkModeToggle
            isDarkMode={isDarkMode}
            toggleDarkMode={toggleDarkMode}
          />
          <button
            className="xl:hidden text-xl"
            onClick={() => setIsMenuOpen((prev) => !prev)}
          >
            <FaBars />
          </button>
          <MobileNavbar
            isMenuOpen={isMenuOpen}
            setIsMenuOpen={setIsMenuOpen}
            t={t}
          />
          <DesktopNavbar t={t} />
        </div>
        <div className="relative lg:block" ref={languageDropdownRef}>
          <button
            onClick={toggleLanguageDropdown}
            className={`flex items-center justify-center font-bold mt-4 lg:mt-0 ${
              currentLanguage === "ar" ? "ml-12" : "mr-2"
            }`} 
          >
            <FaGlobe className="mr-2" />
            {currentLanguage === "en"
              ? t("english")
              : currentLanguage === "ar"
              ? t("arabic")
              : t("german")}
          </button>
          <div
            className={`absolute right-0 mt-2 w-36 bg-white dark:bg-gray-700 border border-gray-200 dark:border-gray-600 rounded-lg shadow-lg z-50 ${
              languageDropdownOpen ? "block" : "hidden"
            }`}
          >
            {[
              { code: "GB", label: "en", display: t("english") },
              { code: "EG", label: "ar", display: t("arabic") },
              { code: "DE", label: "de", display: t("german") },
            ].map((lng) => (
              <button
                key={lng.code}
                className="flex items-center w-full px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600"
                onClick={() => onLanguageChange(lng.label)}
              >
                <Flag
                  code={lng.code}
                  style={{ width: "20px", marginRight: "10px" }}
                />
                {lng.display}
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
