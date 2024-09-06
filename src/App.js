import React, { useEffect, useState } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Home from "./pages/home";
import Products from "./pages/products";
import Cart from "./pages/Cart";
import Contactus from "./pages/contactus";
import LoginPage from "./pages/login";
import Signup from "./pages/Signup";
import CategoryProducts from "./Components/products/CategoryProducts";
import ProductDetails from "./Components/products/productdetail";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer } from "react-toastify";
import ProtectedRoute from "./Components/utilities/protectedroute";
import { setUser } from "./features/userSlice";
import { useDispatch } from "react-redux";
import UserProfile from "./Components/user/UserProfile";
import Checkout from "./pages/Checkout";
import LoadingScreen from "./Components/common/LoadingScreen";
import AdminLayout from "./Admin_Dashboard/pages/Admin/Admin";
import Overview from "./Admin_Dashboard/pages/Overview/Overview";
import AdminProducts from "./Admin_Dashboard/pages/AdminProducts/AdminProducts";
import Sales from "./Admin_Dashboard/pages/Sales/Sales";
import Settings from "./Admin_Dashboard/pages/Settings/Settings";
import Analytics from "./Admin_Dashboard/pages/Analytics/Analytics";
import Users from "./Admin_Dashboard/pages/Users/Users";
import UserLayout from "./Components/layout/UserLayout";
import AdminPanel from "./Admin_Dashboard/pages/Adminpanel/Adminpanel";
import { initGA } from "./analytics/analytics";
import AnalyticsTracker from "./analytics/AnalyticsTracker";
import UserSettings from "./pages/UserSettings";
import FAQ from "./pages/FAQ";
import ScrollToTop from "./Components/layout/ScrollToTop";
import { useTranslation } from "react-i18next";
import Navbar from "./Components/layout/Navbar";

function App() {
  const dispatch = useDispatch();
  const [isLoading, setIsLoading] = useState(true);

  const { i18n } = useTranslation();

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 3000);

    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      try {
        const user = JSON.parse(storedUser);
        dispatch(setUser(user));
      } catch (error) {
        console.error("Error parsing user from localStorage", error);
      }
    }

    initGA();

    return () => clearTimeout(timer);
  }, [dispatch]);

  if (isLoading) {
    return <LoadingScreen />;
  }

  return (
    <Router>
      <div className="App">
        <ToastContainer />
        <AnalyticsTracker />
        <ScrollToTop />
        <Routes>
          <Route path="/login" element={<LoginPage />} />
          <Route path="/signup" element={<Signup />} />
        </Routes>
        <Routes>
          <Route path="/" element={<UserLayout />}>
            <Route index element={<Home />} />
            <Route path="/home" element={<Home />} />
            <Route path="/product" element={<Products />} />
            <Route path="/contactus" element={<Contactus />} />

            <Route path="/category/:slug" element={<CategoryProducts />} />
            <Route path="/product/:id" element={<ProductDetails />} />
            <Route path="/account" element={<UserProfile />} />
            <Route path="/checkout" element={<Checkout />} />
            <Route path="/UserSettings" element={<UserSettings />} />
            <Route path="/FAQ" element={<FAQ />} />

            <Route
              path="/cart"
              element={<ProtectedRoute element={<Cart />} />}
            />
          </Route>

          <Route path="/admin" element={<AdminLayout />}>
            <Route index element={<Overview />} />

            <Route path="overview" element={<Overview />} />
            <Route path="admin-products" element={<AdminProducts />} />
            <Route path="users" element={<Users />} />
            <Route path="sales" element={<Sales />} />
            <Route path="analytics" element={<Analytics />} />
            <Route path="settings" element={<Settings />} />
            <Route path="admin-panel" element={<AdminPanel />} />
          </Route>
        </Routes>
      </div>
    </Router>
  );
}

export default App;
