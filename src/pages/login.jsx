import React, { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom"; 
import { useDispatch, useSelector } from "react-redux";
import { setUser, setUsers } from "../features/userSlice";
import AdminChoiceModal from "../Components/common/AdminChoiceModal";
import { useTranslation } from "react-i18next";

const LoginPage = () => {
  const { t } = useTranslation();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [showModal, setShowModal] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user);
  const allUsers = useSelector((state) => state.user.users);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await fetch("https://dummyjson.com/users");
        const data = await response.json();
        dispatch(setUsers(data.users));
      } catch (error) {
        console.error("Error fetching users:", error);
      }
    };

    fetchUsers();
  }, [dispatch]);

  useEffect(() => {
    if (user.token) {
      if (user.role === "admin") {
        setShowModal(true);
      } else {
        navigate("/home");
      }
    }
  }, [user.token, user.role, navigate]);

  const handleLogin = async (event) => {
    event.preventDefault();
    try {
      const response = await fetch("https://dummyjson.com/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          username,
          password,
          expiresInMins: 30,
        }),
      });

      const data = await response.json();

      if (data.token) {
        const userData = {
          id: data.id,
          username: data.username,
          token: data.token,
          email: data.email,
          firstName: data.firstName,
          lastName: data.lastName,
          image: data.image,
          role: allUsers.find((user) => user.id === data.id)?.role || "user",
        };

        localStorage.setItem("user", JSON.stringify(userData));
        dispatch(setUser(userData));

        if (userData.role === "admin") {
          setShowModal(true);
        } else {
          navigate("/home");
        }
      } else {
        console.error("Login failed");
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  return (
    <div className="flex justify-center items-center h-screen bg-gradient-to-r from-purple-500 to-indigo-500">
      <div className="flex flex-col md:flex-row h-800 w-full max-w-4xl bg-white shadow-2xl rounded-lg overflow-hidden">
        <div className="md:w-1/2 h-96">
          <img
            src="https://cartzio.vercel.app/static/media/login.abef718ca134f760a536.jpg"
            alt="Login"
            className="object-fill w-full h-800"
          />
        </div>
        <div className="md:w-1/2 p-12 flex flex-col justify-center items-center bg-gray-50">
          <form onSubmit={handleLogin} className="w-full max-w-md">
            <h2 className="text-4xl font-extrabold text-center text-gray-800 mb-6">
              {t("welcome_back")}
            </h2>
            <p className="text-center text-gray-600 mb-8">
              {t("please_login")}
            </p>
            <label className="block mb-4">
              <span className="text-gray-700 text-lg">{t("username")}:</span>
              <input
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                required
                className="mt-2 block w-full px-5 py-3 bg-gray-200 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:ring-opacity-50"
              />
            </label>
            <label className="block mb-6">
              <span className="text-gray-700 text-lg">{t("password")}:</span>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="mt-2 block w-full px-5 py-3 bg-gray-200 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:ring-opacity-50"
              />
            </label>
            <button
              type="submit"
              className="w-full bg-purple-600 text-white font-bold py-3 px-6 rounded-lg hover:bg-purple-700 transition duration-300 text-lg"
            >
              {t("login")}
            </button>
            <p className="text-center text-gray-600 mt-4">
              {t("signup2").split(' ')[0]}{" "}
              <Link to="/signup" className="text-purple-600 hover:underline">
                {t("signup2").split(' ').slice(1).join(' ')}
              </Link>
            </p>
          </form>
        </div>
      </div>
      {showModal && (
        <AdminChoiceModal
          onChooseAdmin={() => navigate("/admin/overview")}
          onChooseNormal={() => navigate("/home")}
        />
      )}
    </div>
  );
};

export default LoginPage;
