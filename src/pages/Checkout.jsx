import React, { useState, useEffect } from "react";
import { loadStripe } from "@stripe/stripe-js";
import { Elements, CardElement, useStripe, useElements } from "@stripe/react-stripe-js";
import axios from "axios";
import { useTranslation } from "react-i18next";
import { useLocation } from "react-router-dom";
import { useSelector } from "react-redux"; 
import { ToastContainer, toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

const stripePromise = loadStripe(process.env.REACT_APP_PUBLISHABLE_KEY);

const CheckoutForm = ({ totalAmount }) => {
  const stripe = useStripe();
  const elements = useElements();
  const { t } = useTranslation();
  const location = useLocation();

  const user = useSelector((state) => state.user); 

  const [clientSecret, setClientSecret] = useState("");
  const [customerId, setCustomerId] = useState(""); 
  const [billingData, setBillingData] = useState({
    first_name: user.firstName || "",
    last_name: user.lastName || "",
    email: "", 
    phone_number: "",
    street: "",
    building: "",
    floor: "",
    apartment: "",
    country: "US",
    state: "",
    postal_code: "",
  });
  const [errorMessage, setErrorMessage] = useState(null);
  const [isProcessing, setIsProcessing] = useState(false); 
  const [formValid, setFormValid] = useState(false); 

  const validateForm = () => {
    if (
      billingData.first_name &&
      billingData.last_name &&
      billingData.email &&
      billingData.street &&
      billingData.state &&
      billingData.postal_code
    ) {
      setFormValid(true);
    } else {
      setFormValid(false);
    }
  };

  useEffect(() => {
    validateForm(); 
  }, [billingData]);

  useEffect(() => {
    if (billingData.email) {
      axios
        .post("http://localhost:4242/create-payment-intent", {
          items: [{ amount: totalAmount }],
          customerEmail: billingData.email,
        })
        .then((res) => {
          if (res.data.clientSecret) {
            setClientSecret(res.data.clientSecret);
            setCustomerId(res.data.customerId);
      
          } else {
            console.error("Client secret not returned");
          }
        })
        .catch((err) => console.error(err));
    }
  }, [totalAmount, billingData.email]); 

 const handleSubmit = async (e) => {
  e.preventDefault();

  if (!stripe || !elements || isProcessing) {
    return;
  }

  setIsProcessing(true); 

  const cardElement = elements.getElement(CardElement);

  if (!clientSecret) {
    toast.error("Client Secret not available");
    setIsProcessing(false);
    return;
  }

  try {
    const { error, paymentIntent } = await stripe.confirmCardPayment(clientSecret, {
      payment_method: {
        card: cardElement,
        billing_details: {
          name: `${billingData.first_name} ${billingData.last_name}`,
          email: billingData.email,
          address: {
            postal_code: billingData.postal_code,
            line1: billingData.street,
            state: billingData.state,
            country: billingData.country,
          },
        },
      },
    });

    if (error) {
      throw new Error(error.message);
    } else {
      toast.success("Payment successful!");

      if (customerId && paymentIntent.id) {
        const response = await axios.post("http://localhost:4242/create-invoice", {
          customerId, 
          paymentIntentId: paymentIntent.id, 
        });
        toast.success("Invoice sent to your email.");
      } else {
        throw new Error("Customer ID missing");
      }
    }
  } catch (err) {
    console.error("Error: ", err);
    setErrorMessage(err.message || "An error occurred during the transaction.");
    toast.error(err.message || "An error occurred during the transaction.");
  } finally {
    setIsProcessing(false); 
  }
};


  const handleChange = (e) => {
    const { name, value } = e.target;
    setBillingData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };



  return (
    <>
          <ToastContainer />
    <form onSubmit={handleSubmit} className=" w-8/12 mt-4 mb-4 ml-56 bg-white p-6 rounded-lg shadow-lg">
      {[
        "first_name",
        "last_name",
        "email",
        "phone_number",
        "street",
        "building",
        "floor",
        "apartment",
        "state",
        "postal_code",
      ].map((field) => (
        <div className="mb-4" key={field}>
          <label className="block text-gray-700 capitalize mb-2">{t(field)}:</label>
          <input
            type={field === "email" ? "email" : "text"}
            name={field}
            value={billingData[field]}
            onChange={handleChange}
            required
            className="w-full px-3 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring focus:ring-blue-200 transition duration-300"
          />
        </div>
      ))}

     <div className="mb-4">
  <label className="block text-gray-700 mb-2">{t("Card Details")}:</label>
  <div className="px-3 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring focus:ring-blue-200 transition duration-300">
    <CardElement
      options={{
        style: {
          base: {
            color: "#32325d",
            fontFamily: '"Helvetica Neue", Helvetica, sans-serif',
            fontSmoothing: "antialiased",
            fontSize: "16px",
            "::placeholder": {
              color: "#aab7c4",
            },
          },
          invalid: {
            color: "#fa755a",
            iconColor: "#fa755a",
          },
            theme: 'night',
              labels: 'floating'


        },
      }}
    />
  </div>
</div>


      {errorMessage && <div className="text-red-500 mb-4">{errorMessage}</div>}

      <div className="text-center">
        <button
          type="submit"
          disabled={!stripe || isProcessing || !formValid} 
          className={`w-full bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600 focus:outline-none focus:ring focus:ring-blue-200 transition duration-300 ${
            isProcessing ? "opacity-50 cursor-not-allowed" : ""
          }`}
        >
          {isProcessing ? t("Processing...") : t("Pay")} {totalAmount.toFixed(2)} USD
        </button>
      </div>
    </form>
    </>

  );
};

const Checkout = () => {
  const location = useLocation();
  const totalAmount = location.state?.totalAmount || 0;

  return (
    
    <Elements stripe={stripePromise}>
      <CheckoutForm totalAmount={totalAmount} />
    </Elements>
  );
};

export default Checkout;
