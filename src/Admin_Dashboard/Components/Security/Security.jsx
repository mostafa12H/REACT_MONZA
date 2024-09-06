import React, { useState } from "react";
import { FaLock } from "react-icons/fa";
import { useTranslation } from "react-i18next";

export default function Security() {
  const { t } = useTranslation();
  const [is2FAEnabled, setIs2FAEnabled] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleToggle2FA = () => {
    setIs2FAEnabled(!is2FAEnabled);
  };

  const handleChangePassword = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  return (
    <div className="bg-white dark:bg-gray-800 text-gray-900 dark:text-white p-4 sm:p-6 rounded-lg shadow-md mt-6">
      <div className="flex items-center">
        <FaLock className="text-2xl mr-4 text-blue-500 dark:text-purple-500" />
        <h2 className="text-lg font-medium">{t("security")}</h2>
      </div>
      <div className="mt-4">
        <div className="flex justify-between items-center">
          <p>{t("two_factor_authentication")}</p>
          <input
            type="checkbox"
            className="form-toggle"
            checked={is2FAEnabled}
            onChange={handleToggle2FA}
          />
        </div>
        {is2FAEnabled && (
          <div className="mt-2 text-sm text-green-500">
            {t("2fa_enabled")}
          </div>
        )}
        <button
          className="mt-4 bg-blue-500 dark:bg-purple-600 text-white py-2 px-4 rounded-md"
          onClick={handleChangePassword}
        >
          {t("change_password")}
        </button>
      </div>

      {isModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white dark:bg-gray-800 p-6 rounded-md shadow-lg">
            <h3 className="text-lg font-medium text-gray-900 dark:text-white">
              {t("change_password")}
            </h3>
            <input
              type="password"
              placeholder="Enter new password"
              className="mt-4 w-full p-2 border border-gray-300 dark:border-gray-600 rounded-md"
            />
            <div className="flex justify-end mt-4">
              <button
                className="bg-gray-500 dark:bg-gray-700 text-white py-2 px-4 rounded-md mr-2"
                onClick={closeModal}
              >
                {t("cancel")}
              </button>
              <button className="bg-blue-500 dark:bg-purple-600 text-white py-2 px-4 rounded-md">
                {t("save")}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
