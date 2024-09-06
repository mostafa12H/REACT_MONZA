import React from "react";
import { FaBell } from "react-icons/fa";
import { useTranslation } from "react-i18next";

export default function Notifications() {
  const { t } = useTranslation();

  return (
    <div className="bg-white dark:bg-gray-800 text-gray-900 dark:text-white p-4 sm:p-6 rounded-lg shadow-md mt-6">
      <div className="flex items-center">
        <FaBell className="text-2xl mr-4 text-blue-500 dark:text-purple-500" />
        <h2 className="text-lg font-medium">{t("notifications")}</h2>
      </div>
      <div className="mt-4 space-y-4">
        <div className="flex justify-between items-center">
          <p>{t("push_notifications")}</p>
          <input type="checkbox" className="form-toggle" />
        </div>
        <div className="flex justify-between items-center">
          <p>{t("email_notifications")}</p>
          <input type="checkbox" className="form-toggle" />
        </div>
        <div className="flex justify-between items-center">
          <p>{t("sms_notifications")}</p>
          <input type="checkbox" className="form-toggle" />
        </div>
      </div>
    </div>
  );
}
