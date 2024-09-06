import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { updateUserSettings } from '../features/userSlice';
import { toast, ToastContainer } from 'react-toastify';
import { useTranslation } from 'react-i18next';
import 'react-toastify/dist/ReactToastify.css';

const UserSettings = () => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const user = useSelector(state => state.user);
  const [formData, setFormData] = useState({
    privacy: user.privacy || 'public',
    twoFactorAuth: user.twoFactorAuth || false,
    emailNotifications: user.emailNotifications || true,
    smsNotifications: user.smsNotifications || false,
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: type === 'checkbox' ? checked : value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(updateUserSettings(formData));
    toast.success(t('settings_updated_success'));
  };

  return (
    <div  dir="auto" className="user-settings w-5/6 mx-3.5 p-16 bg-white shadow-lg rounded-lg">
      <h2 className="text-3xl font-bold mb-6 text-gray-800">{t('account_settings')}</h2>
      <form onSubmit={handleSubmit} className="space-y-8">
        <div className="section">
          <h3 className="text-xl font-semibold mb-4 text-gray-700">{t('privacy_settings')}</h3>
          <label className="block">
            <select
              name="privacy"
              value={formData.privacy}
              onChange={handleChange}
              className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="public">{t('public')}</option>
              <option value="private">{t('private')}</option>
              <option value="friends">{t('friends')}</option>
            </select>
          </label>
        </div>

        <div className="section">
          <h3 className="text-xl font-semibold mb-4 text-gray-700">{t('account_security')}</h3>
          <label className="flex items-center space-x-2">
            <input
              type="checkbox"
              name="twoFactorAuth"
              checked={formData.twoFactorAuth}
              onChange={handleChange}
              className="h-5 w-5 text-blue-600 focus:ring-2 focus:ring-blue-500 border-gray-300 rounded"
            />
            <span className="text-gray-700">{t('enable_two_factor')}</span>
          </label>
        </div>

        <div className="section">
          <h3 className="text-xl font-semibold mb-4 text-gray-700">{t('notification_preferences')}</h3>
          <label className="flex items-center space-x-2">
            <input
              type="checkbox"
              name="emailNotifications"
              checked={formData.emailNotifications}
              onChange={handleChange}
              className="h-5 w-5 text-blue-600 focus:ring-2 focus:ring-blue-500 border-gray-300 rounded"
            />
            <span className="text-gray-700">{t('email_notifications')}</span>
          </label>
          <label className="flex items-center space-x-2 mt-4">
            <input
              type="checkbox"
              name="smsNotifications"
              checked={formData.smsNotifications}
              onChange={handleChange}
              className="h-5 w-5 text-blue-600 focus:ring-2 focus:ring-blue-500 border-gray-300 rounded"
            />
            <span className="text-gray-700">{t('sms_notifications')}</span>
          </label>
        </div>

        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-3 rounded-md shadow-sm hover:bg-blue-700 transition duration-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          {t('save_settings')}
        </button>
      </form>
      <ToastContainer />
    </div>
  );
};

export default UserSettings;
