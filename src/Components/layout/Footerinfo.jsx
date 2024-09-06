import React from "react";
import { useTranslation } from "react-i18next";
import {
  FaTruck,
  FaShieldAlt,
  FaCreditCard,
  FaCheckCircle,
} from "react-icons/fa";

const FooterInfo = () => {
  const { t } = useTranslation();

  return (
    <div dir="auto" className="bg-gray-900 text-white py-8 border-t border-gray-700">
      <div className="text-center">
        <ul className="flex flex-col md:flex-row justify-center space-y-4 md:space-y-0 md:space-x-6 mb-4">
          <li className="flex items-center text-sm">
            <FaTruck className="text-xl mr-2" /> {t('free_delivery')}
          </li>
          <li className="flex items-center text-sm">
            <FaShieldAlt className="text-xl mr-2" /> {t('non_contact_shipping')}
          </li>
          <li className="flex items-center text-sm">
            <FaCheckCircle className="text-xl mr-2" /> {t('money_back_guarantee')}
          </li>
          <li className="flex items-center text-sm">
            <FaCreditCard className="text-xl mr-2" /> {t('secure_payments')}
          </li>
        </ul>
        <p className="text-xs mt-4">
          {t('copyright')}
        </p>
      </div>
    </div>
  );
};

export default FooterInfo;
