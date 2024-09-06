import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import { useSelector, useDispatch } from "react-redux";
import { toast, ToastContainer } from "react-toastify";
import { useTranslation } from 'react-i18next';
import "react-toastify/dist/ReactToastify.css";
import { setUser, selectUser } from "../../features/userSlice";
import img1 from "../../assets/111.png";

const UserProfile = () => {
  const { register, handleSubmit, setValue, reset } = useForm();
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const user = useSelector(selectUser);

  useEffect(() => {
    setValue("firstName", user.firstName || "");
    setValue("lastName", user.lastName || "");
    setValue("email", user.email || "");
    setValue("username", user.username || "");
    setValue("age", user.age || "");
    setValue("gender", user.gender || "");
    setValue("phone", user.phone || "");
    setValue("birthDate", user.birthDate || "");
    setValue("address", user.address?.address || "");
    setValue("city", user.address?.city || "");
    setValue("state", user.address?.state || "");
    setValue("postalCode", user.address?.postalCode || "");
    setValue("country", user.address?.country || "");
    setValue("companyName", user.company?.name || "");
    setValue("companyTitle", user.company?.title || "");
    setValue("cryptoWallet", user.crypto?.wallet || "");
    setValue("role", user.role || "");
  }, [user, setValue]);

  const onSubmit = async (data) => {
    try {
      const response = await fetch(`https://dummyjson.com/users/${user.id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        throw new Error("Network response was not ok");
      }

      const updatedData = await response.json();
      console.log("Updated user data:", updatedData);
      toast.success(t("update_success"));
      dispatch(setUser(updatedData));
      reset(updatedData);
    } catch (error) {
      console.error("Error updating user:", error);
      toast.error(t("update_failure"));
    }
  };

  return (
    <div className="flex flex-col md:flex-row">
      <div className="flex-1 flex flex-col p-8 bg-gray-100">
        <div className="flex justify-center items-center min-h-screen">
          <div className="w-full max-w-4xl shadow-lg rounded-3xl overflow-hidden p-8 bg-white flex flex-col md:flex-row">
            <div
              className="w-full md:w-1/2 bg-fill rounded bg-no-repeat bg-cover"
              style={{ backgroundImage: `url(${img1})` }}
            ></div>
            <div className="w-full md:w-1/2 p-8">
              <h2 className="text-2xl md:text-4xl font-bold text-gray-900 mb-8">
                {t('update_profile')}
              </h2>
              <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                  <div>
                    <label
                      htmlFor="firstName"
                      className="block text-sm font-medium text-gray-700"
                    >
                      {t('first_name')}
                    </label>
                    <input
                      id="firstName"
                      type="text"
                      {...register("firstName")}
                      className="mt-1 block w-full px-4 py-3 border border-gray-300 rounded-md shadow-sm focus:ring-pink-500 focus:border-pink-500"
                      placeholder={t('first_name')}
                    />
                  </div>
                  <div>
                    <label
                      htmlFor="lastName"
                      className="block text-sm font-medium text-gray-700"
                    >
                      {t('last_name')}
                    </label>
                    <input
                      id="lastName"
                      type="text"
                      {...register("lastName")}
                      className="mt-1 block w-full px-4 py-3 border border-gray-300 rounded-md shadow-sm focus:ring-pink-500 focus:border-pink-500"
                      placeholder={t('last_name')}
                    />
                  </div>
                 
                  <div>
                    <label
                      htmlFor="username"
                      className="block text-sm font-medium text-gray-700"
                    >
                      {t('username')}
                    </label>
                    <input
                      id="username"
                      type="text"
                      {...register("username")}
                      className="mt-1 block w-full px-4 py-3 border border-gray-300 rounded-md shadow-sm focus:ring-pink-500 focus:border-pink-500"
                      placeholder={t('username')}
                    />
                  </div>
                  <div>
                    <label
                      htmlFor="birthDate"
                      className="block text-sm font-medium text-gray-700"
                    >
                      {t('birth_date')}
                    </label>
                    <input
                      id="birthDate"
                      type="date"
                      {...register("birthDate")}
                      className="mt-1 block w-full px-4 py-3 border border-gray-300 rounded-md shadow-sm focus:ring-pink-500 focus:border-pink-500"
                    />
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-6">
                  <div>
                    <label
                      htmlFor="age"
                      className="block text-sm font-medium text-gray-700"
                    >
                      {t('age')}
                    </label>
                    <input
                      id="age"
                      type="number"
                      {...register("age")}
                      className="mt-1 block w-full px-4 py-3 border border-gray-300 rounded-md shadow-sm focus:ring-pink-500 focus:border-pink-500"
                      placeholder={t('age')}
                    />
                  </div>
                  <div>
                    <label
                      htmlFor="gender"
                      className="block text-sm font-medium text-gray-700"
                    >
                      {t('gender')}
                    </label>
                    <select
                      id="gender"
                      {...register("gender")}
                      className="mt-1 block w-full px-4 py-3 border border-gray-300 rounded-md shadow-sm focus:ring-pink-500 focus:border-pink-500"
                    >
                      <option value="male">{t('male')}</option>
                      <option value="female">{t('female')}</option>
                      <option value="other">{t('other')}</option>
                    </select>
                  </div>
                </div>
           
                <div className="grid grid-cols-1 gap-6">
                   <div>
                    <label
                      htmlFor="email"
                      className="block text-sm font-medium text-gray-700"
                    >
                      {t('email')}
                    </label>
                    <input
                      id="email"
                      type="email"
                      {...register("email")}
                      className="mt-1 block w-full px-4 py-3 border border-gray-300 rounded-md shadow-sm focus:ring-pink-500 focus:border-pink-500"
                      placeholder={t('email')}
                    />
                  </div>
                  <div>
                    <label
                      htmlFor="phone"
                      className="block text-sm font-medium text-gray-700"
                    >
                      {t('phone')}
                    </label>
                    <input
                      id="phone"
                      type="tel"
                      {...register("phone")}
                      className="mt-1 block w-full px-4 py-3 border border-gray-300 rounded-md shadow-sm focus:ring-pink-500 focus:border-pink-500"
                      placeholder={t('phone')}
                    />
                  </div>
                  
                  <div>
                    <label
                      htmlFor="address"
                      className="block text-sm font-medium text-gray-700"
                    >
                      {t('address')}
                    </label>
                    <input
                      id="address"
                      type="text"
                      {...register("address")}
                      className="mt-1 block w-full px-4 py-3 border border-gray-300 rounded-md shadow-sm focus:ring-pink-500 focus:border-pink-500"
                      placeholder={t('address')}
                    />
                  </div>
                  <div>
                    <label
                      htmlFor="city"
                      className="block text-sm font-medium text-gray-700"
                    >
                      {t('city')}
                    </label>
                    <input
                      id="city"
                      type="text"
                      {...register("city")}
                      className="mt-1 block w-full px-4 py-3 border border-gray-300 rounded-md shadow-sm focus:ring-pink-500 focus:border-pink-500"
                      placeholder={t('city')}
                    />
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-6">
                  <div>
                    <label
                      htmlFor="state"
                      className="block text-sm font-medium text-gray-700"
                    >
                      {t('state')}
                    </label>
                    <input
                      id="state"
                      type="text"
                      {...register("state")}
                      className="mt-1 block w-full px-4 py-3 border border-gray-300 rounded-md shadow-sm focus:ring-pink-500 focus:border-pink-500"
                      placeholder={t('state')}
                    />
                  </div>
                  <div>
                    <label
                      htmlFor="postalCode"
                      className="block text-sm font-medium text-gray-700"
                    >
                      {t('postal_code')}
                    </label>
                    <input
                      id="postalCode"
                      type="text"
                      {...register("postalCode")}
                      className="mt-1 block w-full px-4 py-3 border border-gray-300 rounded-md shadow-sm focus:ring-pink-500 focus:border-pink-500"
                      placeholder={t('postal_code')}
                    />
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-6">
                  <div>
                    <label
                      htmlFor="country"
                      className="block text-sm font-medium text-gray-700"
                    >
                      {t('country')}
                    </label>
                    <input
                      id="country"
                      type="text"
                      {...register("country")}
                      className="mt-1 block w-full px-4 py-3 border border-gray-300 rounded-md shadow-sm focus:ring-pink-500 focus:border-pink-500"
                      placeholder={t('country')}
                    />
                  </div>
                  <div>
                    <label
                      htmlFor="companyName"
                      className="block text-sm font-medium text-gray-700"
                    >
                      {t('company_name')}
                    </label>
                    <input
                      id="companyName"
                      type="text"
                      {...register("companyName")}
                      className="mt-1 block w-full px-4 py-3 border border-gray-300 rounded-md shadow-sm focus:ring-pink-500 focus:border-pink-500"
                      placeholder={t('company_name')}
                    />
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-6">
                  <div>
                    <label
                      htmlFor="companyTitle"
                      className="block text-sm font-medium text-gray-700"
                    >
                      {t('company_title')}
                    </label>
                    <input
                      id="companyTitle"
                      type="text"
                      {...register("companyTitle")}
                      className="mt-1 block w-full px-4 py-3 border border-gray-300 rounded-md shadow-sm focus:ring-pink-500 focus:border-pink-500"
                      placeholder={t('company_title')}
                    />
                  </div>
                  <div>
                    <label
                      htmlFor="cryptoWallet"
                      className="block text-sm font-medium text-gray-700"
                    >
                      {t('crypto_wallet')}
                    </label>
                    <input
                      id="cryptoWallet"
                      type="text"
                      {...register("cryptoWallet")}
                      className="mt-1 block w-full px-4 py-3 border border-gray-300 rounded-md shadow-sm focus:ring-pink-500 focus:border-pink-500"
                      placeholder={t('crypto_wallet')}
                    />
                  </div>
                </div>

                <button
                  type="submit"
                  className="w-full bg-blue-600 text-white px-4 py-2 rounded-md shadow-sm hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  {t('update_profile_button')}
                </button>
              </form>
              <ToastContainer />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserProfile;
