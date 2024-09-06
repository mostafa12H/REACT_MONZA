import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";

export default function AdminPanel() {
  const { t } = useTranslation();
  const [bannerTitle, setBannerTitle] = useState("");
  const [bannerText, setBannerText] = useState("");
  const [bannerImage, setBannerImage] = useState("");
  const [bannerImageFile, setBannerImageFile] = useState(null); 
  const [endDate, setEndDate] = useState("");
  const [timerEndDate, setTimerEndDate] = useState("");

  useEffect(() => {
    const storedData = JSON.parse(localStorage.getItem("siteData"));
    if (storedData && storedData.banner) {
      setBannerTitle(storedData.banner.title || "");
      setBannerText(storedData.banner.text || "");
      setBannerImage(storedData.banner.image || "");
      setEndDate(storedData.banner.endDate || "");
      setTimerEndDate(storedData.timer?.endDate || "");
    }
  }, []);

  const navigate = useNavigate();

  const handleSave = () => {
    const storedData = JSON.parse(localStorage.getItem("siteData")) || {};

    const updatedData = {
      ...storedData,
      banner: {
        title: bannerTitle,
        text: bannerText,
        image: bannerImageFile ? URL.createObjectURL(bannerImageFile) : bannerImage || (storedData.banner ? storedData.banner.image : ""),
        endDate: endDate,
      },
      timer: {
        endDate: timerEndDate,
      },
    };

    localStorage.setItem("siteData", JSON.stringify(updatedData));

    navigate("/");
  };

  const handleCancel = () => {
    navigate("/"); 
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setBannerImageFile(file);
    }
  };

  return (
    <div className="bg-white dark:bg-gray-800 text-gray-900 dark:text-white p-6 shadow-md space-y-6">
      <h1 className="text-2xl font-bold">{t("admin_panel")}</h1>
      
      <div className="space-y-4">
        <label className="block text-sm font-medium text-gray-900 dark:text-gray-100">
          {t("banner_title")}
        </label>
        <input
          type="text"
          value={bannerTitle}
          onChange={(e) => setBannerTitle(e.target.value)}
          className="border border-gray-300 dark:border-gray-600 bg-gray-100 dark:bg-gray-700 p-3 rounded-md w-full"
        />
      </div>
      
      <div className="space-y-4">
        <label className="block text-sm font-medium text-gray-900 dark:text-gray-100">
          {t("banner_text")}
        </label>
        <input
          type="text"
          value={bannerText}
          onChange={(e) => setBannerText(e.target.value)}
          className="border border-gray-300 dark:border-gray-600 bg-gray-100 dark:bg-gray-700 p-3 rounded-md w-full"
        />
      </div>
      
      <div className="space-y-4">
        <label className="block text-sm font-medium text-gray-900 dark:text-gray-100">
          {t("banner_image_url")}
        </label>
        <input
          type="text"
          value={bannerImage}
          onChange={(e) => setBannerImage(e.target.value)}
          placeholder={bannerImage ? t("enter_new_url_or_leave_empty") : t("enter_image_url")}
          className="border border-gray-300 dark:border-gray-600 bg-gray-100 dark:bg-gray-700 p-3 rounded-md w-full"
        />
        <label className="block text-sm font-medium text-gray-900 dark:text-gray-100 mt-4">
          {t("or_upload_image")}
        </label>
        <input
          type="file"
          accept="image/*"
          onChange={handleFileChange}
          className="border border-gray-300 dark:border-gray-600 bg-gray-100 dark:bg-gray-700 p-3 rounded-md w-full"
        />
        {bannerImage && !bannerImageFile && (
          <div className="mt-4">
            <p className="mb-2 text-sm text-gray-600 dark:text-gray-400">{t("current_image")}:</p>
            <img src={bannerImage} alt="Banner Preview" className="w-64 h-auto rounded-md" />
          </div>
        )}
        {bannerImageFile && (
          <div className="mt-4">
            <p className="mb-2 text-sm text-gray-600 dark:text-gray-400">{t("uploaded_image_preview")}:</p>
            <img src={URL.createObjectURL(bannerImageFile)} alt="Uploaded Banner Preview" className="w-64 h-auto rounded-md" />
          </div>
        )}
      </div>
      
      <div className="space-y-4">
        <label className="block text-sm font-medium text-gray-900 dark:text-gray-100">
          {t("timer_end_date")}
        </label>
        <input
          type="datetime-local"
          value={timerEndDate}
          onChange={(e) => setTimerEndDate(e.target.value)}
          className="border border-gray-300 dark:border-gray-600 bg-gray-100 dark:bg-gray-700 p-3 rounded-md w-full"
        />
      </div>
      
      <div className="flex space-x-4">
        <button
          onClick={handleSave}
          className="bg-blue-500 dark:bg-purple-600 text-white py-2 px-4 rounded-md hover:bg-blue-600 dark:hover:bg-purple-700 transition duration-300"
        >
          {t("save_changes")}
        </button>
        <button
          onClick={handleCancel}
          className="bg-gray-500 dark:bg-gray-700 text-white py-2 px-4 rounded-md hover:bg-gray-600 dark:hover:bg-gray-800 transition duration-300"
        >
          {t("cancel")}
        </button>
      </div>
    </div>
  );
}
