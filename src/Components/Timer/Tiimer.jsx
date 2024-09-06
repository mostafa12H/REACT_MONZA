import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import calculateTimeLeft from "./CalculateTimeLeft.jsx";
import img1 from "../../assets/bg-deal-2.png";
import img2 from "../../assets/1.png";
import "./Timer.css";

const Timer = () => {
  const { t } = useTranslation();
  const [timeLeft, setTimeLeft] = useState(calculateTimeLeft());

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(calculateTimeLeft());
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  return (
    <div className="relative flex h-screen overflow-hidden">
      <div className="relative w-full h-full">
        <div className="absolute inset-0 image-container">
          <img
            src={img1}
            alt="Background 1"
            className="absolute bg-[#FAF9F6] inset-0 object-cover w-full h-full"
          />
          <img
            src={img2}
            alt="Background 2"
            className="absolute bg-[#FAF9F6] inset-0 object-cover w-full h-full"
          />
        </div>
      </div>

      <div className="absolute   top-0 left-0 flex items-center justify-center w-full sm:w-1/2 h-full p-8">
        <div className="text-black text-center space-y-6">
          <h1 className="text-3xl font-extrabold md:text-5xl">
            {t("end_of_season_sale")}
          </h1>
          <h2 className="text-xl font-semibold md:text-3xl">
            {t("sale_up_to")}
          </h2>

          <div className="p-6 rounded-lg">
            <div className="flex gap-6 justify-center flex-wrap">
              <div className="bg-gray-200 text-teal-500 px-5 py-3 rounded-lg text-center min-w-[80px]">
                <h3 className="text-3xl font-bold md:text-5xl">
                  {timeLeft.days}
                </h3>
                <p className="text-sm md:text-base">{t("days")}</p>
              </div>
              <div className="bg-gray-200 text-teal-500 px-5 py-3 rounded-lg text-center min-w-[80px]">
                <h3 className="text-3xl font-bold md:text-5xl">
                  {timeLeft.hours}
                </h3>
                <p className="text-sm md:text-base">{t("hours")}</p>
              </div>
              <div className="bg-gray-200 text-teal-500 px-5 py-3 rounded-lg text-center min-w-[80px]">
                <h3 className="text-3xl font-bold md:text-5xl">
                  {timeLeft.minutes}
                </h3>
                <p className="text-sm md:text-base">{t("mins")}</p>
              </div>
              <div className="bg-gray-200 text-teal-500 px-5 py-3 rounded-lg text-center min-w-[80px]">
                <h3 className="text-3xl font-bold md:text-5xl">
                  {timeLeft.seconds}
                </h3>
                <p className="text-sm md:text-base">{t("secs")}</p>
              </div>
            </div>
          </div>

          <Link
            to="/product"
            className="hover:brightness-110 hover:animate-pulse font-bold py-3 px-6 rounded-full bg-teal-300 text-gray-900 text-sm md:text-base  hover:bg-teal-400 hover:text-gray-800 transition-colors duration-300"
          >
            {t("shop_now")}
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Timer;
