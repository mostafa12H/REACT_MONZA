import React from "react";
import { FaFacebook, FaTwitter, FaLinkedin } from "react-icons/fa";
import { useTranslation } from "react-i18next";
import Breadcrumbs from "../../../Components/common/Breadcrumbs";

export default function Footer() {
  const { t } = useTranslation();

  return (
    <footer
      className=" widthnavbar bg-white dark:bg-gray-900 text-gray-600 dark:text-gray-300 py-4 transition-all duration-300 "
      
    >
      <div className="container mx-auto px-4">
        <div className="flex flex-col lg:flex-row justify-between items-center space-y-6 lg:space-y-0">
          <div className="text-center lg:text-left w-full lg:w-auto">
            <h4 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
              {t("admin_dashboard")}
            </h4>
            <p className="text-sm">
              © 2024 {t("moustafa")}. {t("all_rights_reserved")}.
            </p>
          </div>

          <div className="flex justify-center lg:justify-start space-x-4 w-full lg:w-auto">
            <a
              href="https://facebook.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-600 dark:text-gray-300 hover:text-blue-600 dark:hover:text-white transition-colors"
            >
              <FaFacebook size={20} />
            </a>
            <a
              href="https://twitter.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-600 dark:text-gray-300 hover:text-blue-400 dark:hover:text-white transition-colors"
            >
              <FaTwitter size={20} />
            </a>
            <a
              href="https://linkedin.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-600 dark:text-gray-300 hover:text-blue-700 dark:hover:text-white transition-colors"
            >
              <FaLinkedin size={20} />
            </a>
          </div>

          {/* Footer Right Section */}
          <div className="w-full lg:w-auto">
            <Breadcrumbs className="justify-center lg:justify-end" />
          </div>
        </div>
      </div>
    </footer>
  );
}
