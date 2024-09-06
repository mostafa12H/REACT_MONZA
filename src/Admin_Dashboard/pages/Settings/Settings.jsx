import React from "react";
import Profile from "../../Components/Profile/Profile";
import Security from "../../Components/Security/Security";
import Notifications from "../../Components/Notfication/Notification";
import ConnectedAccounts from "../../Components/ConnectedAccounts/ConnectedAccounts";
import DangerZone from "../../Components/DangerZone/DangerZone";
import TitleComponent from "../../Components/Title/title";
import { useTranslation } from "react-i18next";

export default function Settings() {
    const { t } = useTranslation();

  return (
    <div className="side-layout min-h-screen bg-white dark:bg-gray-900 text-gray-900 dark:text-white p-4 sm:p-6">
      <TitleComponent title=        {t("settings")}
/>
      <div className="min-h-screen bg-white dark:bg-gray-900 text-gray-900 dark:text-white p-4 sm:p-6">
        <Profile />
        <Notifications />
        <Security />
        <ConnectedAccounts />
        <DangerZone />
      </div>
    </div>
  );
}