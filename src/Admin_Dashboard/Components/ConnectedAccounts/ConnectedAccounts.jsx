import React, { useState } from "react";
import { FaQuestionCircle } from "react-icons/fa";
import { useTranslation } from "react-i18next";

export default function ConnectedAccounts() {
  const { t } = useTranslation();
  const [accounts, setAccounts] = useState({
    google: true,
    facebook: false,
    twitter: true,
  });

  const toggleConnection = (account) => {
    setAccounts((prevState) => ({
      ...prevState,
      [account]: !prevState[account],
    }));
  };

  return (
    <div className="bg-white dark:bg-gray-800 text-gray-900 dark:text-white p-4 sm:p-6 rounded-lg shadow-md mt-6">
      <div className="flex items-center">
        <FaQuestionCircle className="text-2xl mr-4 text-blue-500 dark:text-purple-500" />
        <h2 className="text-lg font-medium">{t("connected_accounts")}</h2>
      </div>
      <div className="mt-4 space-y-4">
        <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center">
          <div className="flex items-center space-x-2">
            <img
              src="https://cdn2.hubspot.net/hubfs/53/image8-2.jpg"
              alt="Google"
              className="w-6 h-6 sm:w-8 sm:h-8 rounded-full"
            />
            <p>{t("google")}</p>
          </div>
          <button
            onClick={() => toggleConnection("google")}
            className={`py-1 px-4 mt-2 sm:mt-0 rounded-md ${
              accounts.google
                ? "bg-green-500 text-white"
                : "bg-gray-200 dark:bg-gray-600 text-gray-900 dark:text-white"
            }`}
          >
            {accounts.google ? t("connected") : t("connect")}
          </button>
        </div>
        <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center">
          <div className="flex items-center space-x-2">
            <img
              src="https://upload.wikimedia.org/wikipedia/commons/5/51/Facebook_f_logo_%282019%29.svg"
              alt="Facebook"
              className="w-6 h-6 sm:w-8 sm:h-8 rounded-full"
            />
            <p>{t("facebook")}</p>
          </div>
          <button
            onClick={() => toggleConnection("facebook")}
            className={`py-1 px-4 mt-2 sm:mt-0 rounded-md ${
              accounts.facebook
                ? "bg-green-500 text-white"
                : "bg-gray-200 dark:bg-gray-600 text-gray-900 dark:text-white"
            }`}
          >
            {accounts.facebook ? t("connected") : t("connect")}
          </button>
        </div>
        <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center">
          <div className="flex items-center space-x-2">
            <img
              src="https://upload.wikimedia.org/wikipedia/commons/6/6f/Logo_of_X_%28formerly_Twitter%29.svg"
              alt="Twitter"
              className="w-6 h-6 sm:w-8 sm:h-8 rounded-full"
            />
            <p>{t("twitter")}</p>
          </div>
          <button
            onClick={() => toggleConnection("twitter")}
            className={`py-1 px-4 mt-2 sm:mt-0 rounded-md ${
              accounts.twitter
                ? "bg-green-500 text-white"
                : "bg-gray-200 dark:bg-gray-600 text-gray-900 dark:text-white"
            }`}
          >
            {accounts.twitter ? t("connected") : t("connect")}
          </button>
        </div>
      </div>
      <button className="mt-4 text-blue-500 dark:text-purple-500">
        {t("add_account")}
      </button>
    </div>
  );
}
