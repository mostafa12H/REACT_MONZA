import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";

const SignUpPage = () => {
  const { t } = useTranslation();
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [phone, setPhone] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSignUp = async (event) => {
    event.preventDefault();
    if (password !== confirmPassword) {
      setError(t("signup.passwords_do_not_match"));
      return;
    }

    const userData = {
      firstName,
      lastName,
      email,
      username,
      password,
      phone,
    };

    try {
      const response = await fetch("https://dummyjson.com/users/add", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(userData),
      });

      const data = await response.json();

      if (data.id) {
        navigate("/login");
      } else {
        console.error("Signup failed");
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  return (
    <div className="flex justify-center items-center h-full bg-gradient-to-r from-purple-500 to-purple-900">
      <div className="flex flex-col md:flex-row w-full max-w-4xl bg-white shadow-2xl rounded-lg  m-3 overflow-hidden" style={{ height: "900px" }}>
        <div className="md:w-1/2 p-12 flex flex-col justify-center items-center bg-gray-50">
          <form onSubmit={handleSignUp} className="w-full max-w-md">
            <h2 className="text-4xl font-extrabold text-center text-gray-800 mb-6">{t("create_account")}</h2>
            <div className="flex space-x-4">
              <label className="block w-1/2">
                <span className="text-gray-700 text-lg">{t("first_name")}:</span>
                <input
                  type="text"
                  value={firstName}
                  onChange={(e) => setFirstName(e.target.value)}
                  required
                  className="mt-2 block w-full px-4 py-3 bg-gray-200 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:ring-opacity-50"
                />
              </label>
              <label className="block w-1/2">
                <span className="text-gray-700 text-lg">{t("last_name")}:</span>
                <input
                  type="text"
                  value={lastName}
                  onChange={(e) => setLastName(e.target.value)}
                  required
                  className="mt-2 block w-full px-4 py-3 bg-gray-200 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:ring-opacity-50"
                />
              </label>
            </div>
            <label className="block mt-4">
              <span className="text-gray-700 text-lg">{t("email")}:</span>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="mt-2 block w-full px-4 py-3 bg-gray-200 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:ring-opacity-50"
              />
            </label>
            <label className="block mt-4">
              <span className="text-gray-700 text-lg">{t("phone_number")}:</span>
              <input
                type="tel"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                required
                className="mt-2 block w-full px-4 py-3 bg-gray-200 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:ring-opacity-50"
              />
            </label>

            <label className="block mt-4">
              <span className="text-gray-700 text-lg">{t("username")}:</span>
              <input
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                required
                className="mt-2 block w-full px-4 py-3 bg-gray-200 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:ring-opacity-50"
              />
            </label>
            <label className="block mt-4">
              <span className="text-gray-700 text-lg">{t("password")}:</span>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="mt-2 block w-full px-4 py-3 bg-gray-200 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:ring-opacity-50"
              />
            </label>
            <label className="block mt-4">
              <span className="text-gray-700 text-lg">{t("confirm_password")}:</span>
              <input
                type="password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                required
                className="mt-2 block w-full px-4 py-3 bg-gray-200 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:ring-opacity-50"
              />
            </label>
            {error && <p className="text-red-500 text-center mt-4">{error}</p>}
            <button
              type="submit"
              className="w-full bg-purple-600 text-white font-bold py-3 px-6 rounded-lg hover:bg-purple-700 transition duration-300 text-lg mt-6"
            >
              {t("sign_up")}
            </button>
            <p className="text-center text-gray-600 mt-4">
              {t("login2").split(' ')[0]}{" "}
              <a href="/login" className="text-purple-600 hover:underline">
                {t("login2").split(' ').slice(1).join(' ')}
              </a>
            </p>
          </form>
        </div>
        <div className="md:w-1/2 h-full">
          <img src="singup.png" alt="Sign Up" className="object-cover w-full h-full" />
        </div>
      </div>
    </div>
  );
};

export default SignUpPage;
