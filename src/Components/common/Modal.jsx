import React from "react";
import { useTranslation } from "react-i18next";

const Modal = ({ isOpen, onClose, children }) => {
  const { t } = useTranslation();

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
      <div className="bg-white dark:bg-gray-800 text-gray-900 dark:text-white p-6 rounded-lg shadow-lg w-full max-w-6xl zindex1">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-semibold">{t('edit_profile')}</h2>
          <button
            onClick={onClose}
            className="text-gray-900 dark:text-white text-2xl"
          >
            &times;
          </button>
        </div>
        <div>{children}</div>
      </div>
    </div>
  );
};

export default Modal;
