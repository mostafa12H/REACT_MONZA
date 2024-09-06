import React, { useState, useEffect, useRef } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faBars,
  faSun,
  faMoon,
  faUser,
  faGlobe,
  faTimes,
} from "@fortawesome/free-solid-svg-icons";
import { Link, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { clearUser, selectUser } from "../../features/userSlice";
import Breadcrumbs from "../common/Breadcrumbs";
import { useTranslation } from "react-i18next";
import Flag from "react-world-flags";

const Navbar = () => {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [theme, setTheme] = useState(localStorage.getItem("theme") || "light");
  const [languageDropdownOpen, setLanguageDropdownOpen] = useState(false);
  const [currentLanguage, setCurrentLanguage] = useState("en");

  const user = useSelector(selectUser);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const dropdownRef = useRef(null);
  const languageDropdownRef = useRef(null);
  const { t, i18n } = useTranslation();

  useEffect(() => {
    const savedLanguage = localStorage.getItem("i18nextLng") || "en";
    setCurrentLanguage(savedLanguage);
    i18n.changeLanguage(savedLanguage);
  }, [i18n]);

  const toggleDropdown = () => {
    setDropdownOpen((prev) => !prev);
  };

  const toggleLanguageDropdown = () => {
    setLanguageDropdownOpen((prev) => !prev);
  };

  const handleLanguageChange = (lng) => {
    const langCode =
      lng === "English" ? "en" : lng === "العربية" ? "ar" : "de";

    setCurrentLanguage(langCode);
    i18n.changeLanguage(langCode);
    localStorage.setItem("i18nextLng", langCode);
    setLanguageDropdownOpen(false);
  };

  const handleLogout = () => {
    dispatch(clearUser());
    navigate("/login");
  };

  const toggleMenu = () => {
    setMenuOpen((prev) => !prev);
  };

  const closeMenuOnLinkClick = () => {
    if (window.innerWidth < 1024) {
      setMenuOpen(false);
    }
  };

  const handleClickOutside = (event) => {
    if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
      setDropdownOpen(false);
    }
    if (
      languageDropdownRef.current &&
      !languageDropdownRef.current.contains(event.target)
    ) {
      setLanguageDropdownOpen(false);
    }
  };

  const toggleTheme = () => {
    const newTheme = theme === "dark" ? "light" : "dark";
    setTheme(newTheme);
    localStorage.setItem("theme", newTheme);
    document.documentElement.classList.toggle("dark", newTheme === "dark");
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <>
      <header className="w-full relative z-50 bg-white border-b border-gray-300 shadow-md transition-all duration-300">
        <div className="container mx-auto flex justify-between items-center p-4">
          <div className="flex items-center">
            <Link to="/home" className="flex items-center">
              <img
                src="https://i.pinimg.com/originals/ab/ca/4c/abca4c51c7e166b2980105b5e98b7ac2.jpg"
                alt="Logo"
                className="w-16 h-16 rounded-full border-2 border-gray-800 shadow-lg object-cover transition-transform duration-300 hover:transform hover:scale-110 hover:shadow-xl hover:border-orange-500"
              />
            </Link>
            <button
              className="ml-4 p-3 text-gray-800 lg:hidden"
              onClick={toggleMenu}
            >
              <FontAwesomeIcon icon={menuOpen ? faTimes : faBars} size="lg" />
            </button>
          </div>

          <nav
            className={`fixed inset-0 bg-white z-50 flex flex-col items-center justify-center space-y-6 transition-transform transform ${
              menuOpen ? "translate-x-0" : "-translate-x-full"
            } lg:space-x-8 lg:flex lg:flex-row lg:relative lg:bg-transparent lg:translate-x-0 lg:space-y-0`}
          >
            <button
              className="absolute top-4 left-4 p-3 text-gray-800 lg:hidden"
              onClick={toggleMenu}
            >
              <FontAwesomeIcon icon={faTimes} size="lg" />
            </button>
            <Link
              to="/home"
              className="block text-gray-800 font-bold text-lg hover:border-b-2 border-gray-800 transition duration-300"
              onClick={closeMenuOnLinkClick}
            >
              {t("home")}
            </Link>
            <Link
              to="/product"
              className="block text-gray-800 font-bold text-lg hover:border-b-2 border-gray-800 transition duration-300"
              onClick={closeMenuOnLinkClick}
            >
              {t("products")}
            </Link>
            <Link
              to="/cart"
              className="block text-gray-800 font-bold text-lg hover:border-b-2 border-gray-800 transition duration-300"
              onClick={closeMenuOnLinkClick}
            >
              {t("cart")}
            </Link>
            <Link
              to="/contactUs"
              className="block text-gray-800 font-bold text-lg hover:border-b-2 border-gray-800 transition duration-300"
              onClick={closeMenuOnLinkClick}
            >
              {t("contact_us")}
            </Link>
            <Link
              to="/Faq"
              className="block text-gray-800 font-bold text-lg hover:border-b-2 border-gray-800 transition duration-300"
              onClick={closeMenuOnLinkClick}
            >
              {t("faq")}
            </Link>
            <div className="flex items-center gap-6">
              <button
                className="p-3 bg-gray-800 text-white rounded-full focus:outline-none transition-colors duration-300 hover:bg-orange-500"
                onClick={toggleTheme}
              >
                <FontAwesomeIcon icon={theme === "dark" ? faSun : faMoon} />
              </button>
              <div className="relative" ref={languageDropdownRef}>
                <button
                  onClick={toggleLanguageDropdown}
                  className="flex items-center text-gray-800 font-bold"
                >
                  <FontAwesomeIcon icon={faGlobe} className="mr-2" />
                  {currentLanguage === "en"
                    ? "English"
                    : currentLanguage === "ar"
                    ? "العربية"
                    : "Deutsch"}
                </button>
                <div
                  className={`absolute right-0 mt-2 w-36 bg-white border border-gray-200 rounded-lg shadow-lg z-50 ${
                    languageDropdownOpen ? "block" : "hidden"
                  }`}
                >
                  {[
                    { code: "GB", label: "English" },
                    { code: "EG", label: "العربية" },
                    { code: "DE", label: "Deutsch" },
                  ].map((lng) => (
                    <button
                      key={lng.code}
                      className="flex items-center w-full px-4 py-2 text-gray-800 hover:bg-gray-100"
                      onClick={() => handleLanguageChange(lng.label)}
                    >
                      <Flag
                        code={lng.code}
                        style={{ width: "20px", marginRight: "10px" }}
                      />
                      {lng.label}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </nav>

          <div className="relative" ref={dropdownRef}>
            <div
              className="flex items-center cursor-pointer"
              onClick={toggleDropdown}
            >
              <div className="w-12 h-12 rounded-full bg-gray-300 flex items-center justify-center">
                <FontAwesomeIcon
                  icon={faUser}
                  className="text-gray-600 text-xl"
                />
              </div>
            </div>
            <div
              className={`absolute right-0 mt-2 w-48 bg-white border border-gray-200 rounded-lg shadow-lg z-50 ${
                dropdownOpen ? "block" : "hidden"
              }`}
            >
              <span className="block px-4 py-2 text-gray-800">
                {t("welcome")} {user.username || t("guest")}
              </span>
              <div className="border-t border-gray-200"></div>
              {user.token ? (
                <>
                  <Link
                    className="block px-4 py-2 text-gray-800 hover:bg-gray-100"
                    to="/account"
                  >
                    {t("account")}
                  </Link>
                  <Link
                    className="block px-4 py-2 text-gray-800 hover:bg-gray-100"
                    to="/UserSettings"
                  >
                    {t("settings")}
                  </Link>
                  {user.role === "admin" && (
                    <Link
                      className="block px-4 py-2 text-gray-800 hover:bg-gray-100"
                      to="/admin/overview"
                    >
                      {t("admin_dashboard")}
                    </Link>
                  )}
                  <div className="border-t border-gray-200"></div>
                  <button
                    className="block w-full text-left px-4 py-2 text-gray-800 hover:bg-gray-100"
                    onClick={handleLogout}
                  >
                    {t("logout")}
                  </button>
                </>
              ) : (
                <>
                  <Link
                    className="block px-4 py-2 text-gray-800 hover:bg-gray-100"
                    to="/login"
                  >
                    {t("login")}
                  </Link>
                  <Link
                    className="block px-4 py-2 text-gray-800 hover:bg-gray-100"
                    to="/signup"
                  >
                    {t("signup")}
                  </Link>
                </>
              )}
            </div>
          </div>
          <Breadcrumbs />
        </div>
      </header>
      {/* <div className="mt-12"></div> */}
    </>
  );
};

export default Navbar;
