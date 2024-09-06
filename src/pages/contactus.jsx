import React from "react";
import img1 from "../assets/contac.jpg";
import ContactForm from "./../Components/common/contactForn";
import { useTranslation } from "react-i18next";

const ContactUs = () => {
  const { t } = useTranslation();

  const handleSuccess = () => {};

  const handleError = () => {};

  return (
    <div className="relative">
      <div className="relative text-white py-20 px-6 text-center">
        <div
          className="absolute inset-0 w-full h-full bg-no-repeat bg-center bg-cover p-32"
          style={{
            backgroundImage: `url(${img1})`,
          }}
        ></div>
        <div className="relative z-10"></div>
      </div>

      <div className="max-w-3xl mx-auto pt-32 pb-32  ">
        <p className="mb-6 text-lg text-gray-700 bg-white p-6 rounded-lg shadow-lg space-y-4 ">
          {t("contact_us2")}
        </p>

        <ContactForm onSuccess={handleSuccess} onError={handleError} />

        <div className="mt-10 bg-gray-50 p-6 rounded-lg shadow-lg">
          <h3 className="text-2xl font-semibold mb-4">{t("contact_information")}</h3>
          <p className="text-lg">
            <strong className="font-medium">{t("address")}:</strong> Egypt
          </p>
          <p className="text-lg">
            <strong className="font-medium">{t("phone")}:</strong> (020)1002299532
          </p>
          <p className="text-lg">
            <strong className="font-medium">{t("email")}:</strong>{" "}
            <a
              href="mailto:mostafa317hamada@gmail.com"
              className="text-blue-500 hover:underline"
            >
              mostafa317hamada@gmail.com
            </a>
          </p>
        </div>
      </div>
    </div>
  );
};

export default ContactUs;
