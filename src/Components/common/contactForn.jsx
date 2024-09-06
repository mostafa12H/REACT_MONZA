import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";

const ContactForm = ({ onSuccess, onError }) => {
  const { t } = useTranslation();
  const {
    register,
    handleSubmit,
    formState: { errors },
    control,
  } = useForm();
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState(null);

  const onSubmit = (data) => {
    setSubmitted(true);
    setError(null);
    if (onSuccess) onSuccess(data);
  };

  const onErrorHandler = (errors) => {
    setError(t("All fields are required."));
    if (onError) onError(errors);
  };

  return (
    <form dir="auto"
      onSubmit={handleSubmit(onSubmit, onErrorHandler)}
      className="bg-white p-6 rounded-lg shadow-lg space-y-4"
    >
      <div className="flex flex-col space-y-2">
        <label htmlFor="name" className="text-lg font-medium">
          {t("first_name")}
        </label>
        <input
          type="text"
          id="name"
          {...register("name", { required: true })}
          className="p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        {errors.name && (
          <div className="text-red-500 text-sm">{t("Name is required.")}</div>
        )}
      </div>

      <div className="flex flex-col space-y-2">
        <label htmlFor="email" className="text-lg font-medium">
          {t("email")}
        </label>
        <input
          type="email"
          id="email"
          {...register("email", {
            required: t("Email is required."),
            pattern: {
              value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
              message: t("Invalid email address."),
            },
          })}
          className="p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        {errors.email && (
          <div className="text-red-500 text-sm">{errors.email.message}</div>
        )}
      </div>

      <div className="flex flex-col space-y-2">
        <label htmlFor="message" className="text-lg font-medium">
          {t("Message")}
        </label>
        <textarea
          id="message"
          {...register("message", { required: true })}
          className="p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          rows="5"
        />
        {errors.message && (
          <div className="text-red-500 text-sm">{t("Message is required.")}</div>
        )}
      </div>

      {error && <div className="text-red-500 text-sm">{error}</div>}

      <button
        type="submit"
        className="w-full py-2 bg-blue-500 text-white font-semibold rounded-md hover:bg-blue-600 transition duration-300"
      >
        {t("Send Message")}
      </button>

      {submitted && !error && (
        <div className="text-green-500 text-sm mt-3">
          {t("Thank you for reaching out! We'll get back to you soon.")}
        </div>
      )}

    </form>
  );
};

export default ContactForm;
