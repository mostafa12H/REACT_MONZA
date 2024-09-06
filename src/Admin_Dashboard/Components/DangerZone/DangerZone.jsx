import React from "react";
import { FaTrash } from "react-icons/fa";
import { useTranslation } from "react-i18next";

export default function DangerZone() {
  const { t } = useTranslation();

  return (
    <div className="bg-red-100 dark:bg-red-700 text-red-700 dark:text-white p-6 rounded-lg shadow-md mt-6">
      <div className="flex items-center">
        <FaTrash className="text-2xl mr-4 text-red-700 dark:text-white" />
        <h2 className="text-lg font-medium">{t("danger_zone")}</h2>
      </div>
      <p className="mt-4">
        {t("permanently_delete_account")}
      </p>
      <button className="mt-4 bg-red-500 text-white py-2 px-4 rounded-md">
        {t("delete_account")}
      </button>
    </div>
  );
}
