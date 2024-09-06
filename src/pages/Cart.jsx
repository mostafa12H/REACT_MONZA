import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { useTranslation } from "react-i18next";
import {
  removeAllOfItemFromCart,
  updateItemQuantity,
  clearCart,
} from "../features/cartSlice";
import { useNavigate } from "react-router-dom";
import emptyCartImage from "../assets/emptycart.png";
export default function Cart() {
  const { t } = useTranslation();
  const cartItems = useSelector((state) => state.cart.items);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const totalAmount = cartItems.reduce(
    (total, item) => total + (item.price ?? 0) * item.quantity,
    0
  );

  const handleQuantityChange = (id, change) => {
    const item = cartItems.find((item) => item.id === id);
    const newQuantity = Math.max(1, item.quantity + change);
    dispatch(updateItemQuantity({ id, quantity: newQuantity }));
  };

  const handleClearCart = () => {
    dispatch(clearCart());
  };

  return (
    <div dir="auto" className="container  mx-auto p-4">
      {cartItems.length === 0 ? (
        <div className="text-center h-1/3 p-52">
          <img
            src={emptyCartImage}
            alt="Your cart is empty"
            className="mx-auto w-64  "
          />
          <p className="text-gray-500">{t('your_cart_is_empty')}</p>
          <button
            className="mt-4 bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600"
            onClick={() => navigate("/product")}
          >
            {t('shop_now')}
          </button>
        </div>
      ) : (
        <div>
                <h1 className="text-2xl font-bold mb-4">{t('your_cart')}</h1>

          {cartItems.map((item) => (
            <div
              key={item.id}
              className="flex items-center mb-4 p-4 border rounded shadow-md"
            >
              <img
                src={item.thumbnail}
                alt={item.title}
                className="w-24 h-24 object-cover rounded mr-4"
              />
              <div className="flex-1">
                <h2 className="text-lg font-semibold">{item.title}</h2>
                <p className="text-gray-500">{item.category}</p>
                <div className="flex items-center justify-between mt-2">
                  <span className="text-gray-800">
                    {t('price')}: ${item.price?.toFixed(2) ?? "N/A"}
                  </span>
                  <div className="flex items-center">
                    <button
                      className="px-2 py-1 bg-gray-200 rounded text-sm"
                      onClick={() => handleQuantityChange(item.id, -1)}
                    >
                      -
                    </button>
                    <span className="px-4 text-sm">{item.quantity}</span>
                    <button
                      className="px-2 py-1 bg-gray-200 rounded text-sm"
                      onClick={() => handleQuantityChange(item.id, 1)}
                    >
                      +
                    </button>
                  </div>
                  <span className="text-gray-800">
                    {t('total')}: ${(item.price * item.quantity).toFixed(2)}
                  </span>
                </div>
                <div className="flex space-x-2 mt-2">
                  <button
                    className="bg-red-500 text-white py-1 px-2 rounded hover:bg-red-600"
                    onClick={() =>
                      dispatch(removeAllOfItemFromCart({ id: item.id }))
                    }
                  >
                    {t('remove_all')}
                  </button>
                </div>
              </div>
            </div>
          ))}
          <div className="flex justify-between items-center mt-4 p-4 border-t">
            <span className="text-xl font-semibold">{t('total')}:</span>
            <span className="text-xl font-semibold">
              ${totalAmount.toFixed(2)}
            </span>
          </div>
          <div className="flex justify-end space-x-4 mt-4">
            <button
              className="bg-gray-500 text-white py-2 px-4 rounded hover:bg-gray-600"
              onClick={handleClearCart}
            >
              {t('clear_cart')}
            </button>
            <button
              className="bg-green-500 text-white py-2 px-4 rounded hover:bg-green-600"
              onClick={() => navigate("/checkout", { state: { totalAmount } })}
            >
              {t('proceed_to_checkout')}
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
