import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import img2 from "../../assets/2.jpg";

export default function Banner() {
  const { t, i18n } = useTranslation();
  const [bannerData, setBannerData] = useState({
    title: t("discover_new_arrivals"),
    text: t("discover_new_arrivals_text"),
    image: img2,
  });

  useEffect(() => {
    const storedData = JSON.parse(localStorage.getItem("siteData"));
    if (storedData && storedData.banner) {
      setBannerData({
        title: storedData.banner.title || bannerData.title,
        text: storedData.banner.text || bannerData.text,
        image: storedData.banner.image || bannerData.image,
      });
    }
  }, [bannerData.title, bannerData.text, bannerData.image]);

  useEffect(() => {
    setBannerData((prevData) => ({
      ...prevData,
      title: t("discover_new_arrivals"),
      text: t("discover_new_arrivals_text"),
    }));
  }, [i18n.language, t]);

  return (
    <div
      className="relative flex flex-col items-center justify-center -mt-24		 h-screen bg-cover bg-center bg-no-repeat"
      style={{
        backgroundImage: `url(${bannerData.image})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
      }}
    >
      <div className="absolute inset-0 bg-gradient-to-b from-dark-secondary via-sea-accent to-dark-DEFAULT opacity-80 dark:from-dark-DEFAULT dark:via-sea-secondary dark:to-dark-lpurple"></div>
      <div className="relative z-10 text-white text-center space-y-6 p-8 max-w-2xl">
        <h1 className="text-5xl font-extrabold md:text-7xl dark:text-sea-light">
          {bannerData.title}
        </h1>
        <p className="text-xl md:text-2xl max-w-3xl mx-auto dark:text-sea-light">
          {bannerData.text}
        </p>
        <div className="flex flex-col md:flex-row justify-center items-center md:space-x-6 space-y-4 md:space-y-0">
          <Link
            to="/product"
className="hover:brightness-110 hover:animate-pulse font-bold py-3 px-6 rounded-full bg-indigo-700 shadow-lg shadow-indigo-500/50 text-white"          >
            {t("shop_now")}
          </Link>
          <Link
            to="/contactus"
className="hover:brightness-110 hover:animate-pulse font-bold py-3 px-6 rounded-full bg-indigo-500 shadow-lg shadow-indigo-500/50 text-white"          >
            {t("contact_us")}
          </Link>
        </div>
      </div>
    </div>
  );
}
