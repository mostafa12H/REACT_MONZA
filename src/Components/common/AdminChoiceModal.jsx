import React from "react";
import { useTranslation } from "react-i18next";

const AdminChoiceModal = ({ onChooseAdmin, onChooseNormal }) => {
  const { t } = useTranslation();

  return (
    <div className="fixed inset-0 bg-black bg-opacity-60 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg shadow-lg p-8 max-w-md mx-4 sm:mx-auto">
        <h2 className="text-2xl font-bold mb-6 text-center">
          {t('choose_layout')}
        </h2>
        <div className="flex flex-col gap-4">
          <button
            onClick={onChooseAdmin}
            className="bg-purple-600 text-white py-3 px-6 rounded-lg shadow-md hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-purple-500 transition duration-300"
          >
            {t('admin_layout')}
          </button>
          <button
            onClick={onChooseNormal}
            className="bg-gray-600 text-white py-3 px-6 rounded-lg shadow-md hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-gray-500 transition duration-300"
          >
            {t('normal_layout')}
          </button>
        </div>
      </div>
    </div>
  );
};

export default AdminChoiceModal;
