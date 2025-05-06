"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { FaArrowLeft, FaLock } from "react-icons/fa";
import Link from "next/link";
import { motion } from "framer-motion";

export default function Checkout() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    address: "",
    city: "",
    state: "",
    zipCode: "",
    country: "US",
    saveInfo: false,
    paymentMethod: "creditCard",
    cardNumber: "",
    cardName: "",
    expiry: "",
    cvv: "",
  });

  const [errors, setErrors] = useState({});
  const [isProcessing, setIsProcessing] = useState(false);

  // Mock cart data for displaying the order summary
  const cartItems = [
    {
      id: 1,
      name: "Organic Bananas",
      price: 2.99,
      quantity: 2,
      unit: "1 kg",
    },
    {
      id: 2,
      name: "Fresh Strawberries",
      price: 4.99,
      quantity: 1,
      unit: "250 g",
    },
  ];

  const calculateSubtotal = () => {
    return cartItems.reduce(
      (total, item) => total + item.price * item.quantity,
      0
    );
  };

  const subtotal = calculateSubtotal();
  const shipping = 5.99;
  const tax = subtotal * 0.07; // 7% tax
  const total = subtotal + shipping + tax;

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === "checkbox" ? checked : value,
    });

    // Clear error when field is being edited
    if (errors[name]) {
      setErrors({ ...errors, [name]: null });
    }
  };

  const validateForm = () => {
    const newErrors = {};

    // Required fields validation
    const requiredFields = [
      "firstName",
      "lastName",
      "email",
      "phone",
      "address",
      "city",
      "state",
      "zipCode",
      "country",
    ];

    requiredFields.forEach((field) => {
      if (!formData[field]) {
        newErrors[field] = "This field is required";
      }
    });

    // Email validation
    if (formData.email && !/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "Please enter a valid email address";
    }

    // Payment validation
    if (formData.paymentMethod === "creditCard") {
      if (!formData.cardNumber) {
        newErrors.cardNumber = "Card number is required";
      } else if (!/^\d{16}$/.test(formData.cardNumber.replace(/\s/g, ""))) {
        newErrors.cardNumber = "Please enter a valid 16-digit card number";
      }

      if (!formData.cardName) {
        newErrors.cardName = "Name on card is required";
      }

      if (!formData.expiry) {
        newErrors.expiry = "Expiry date is required";
      } else if (!/^\d{2}\/\d{2}$/.test(formData.expiry)) {
        newErrors.expiry = "Please use MM/YY format";
      }

      if (!formData.cvv) {
        newErrors.cvv = "CVV is required";
      } else if (!/^\d{3,4}$/.test(formData.cvv)) {
        newErrors.cvv = "Please enter a valid CVV";
      }
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (validateForm()) {
      setIsProcessing(true);

      // Simulate processing delay
      setTimeout(() => {
        setIsProcessing(false);
        router.push("/payment");
      }, 1500);
    } else {
      // Scroll to the first error
      const firstError = document.querySelector(".error-message");
      if (firstError) {
        firstError.scrollIntoView({ behavior: "smooth", block: "center" });
      }
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold mb-8 text-white">Checkout</h1>

      <div className="flex flex-col lg:flex-row gap-8">
        {/* Checkout Form */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
          className="lg:w-2/3"
        >
          <form
            onSubmit={handleSubmit}
            className="bg-white rounded-lg shadow p-6"
          >
            {/* Shipping Information */}
            <div className="mb-8">
              <h2 className="text-lg font-bold mb-4 pb-2 border-b">
                Shipping Information
              </h2>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label htmlFor="firstName" className="block mb-1 font-medium">
                    First Name*
                  </label>
                  <input
                    type="text"
                    id="firstName"
                    name="firstName"
                    value={formData.firstName}
                    onChange={handleChange}
                    className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 ${
                      errors.firstName
                        ? "border-red-500 focus:ring-red-200"
                        : "focus:ring-blue-200 border-gray-300"
                    }`}
                  />
                  {errors.firstName && (
                    <p className="mt-1 text-red-500 text-sm error-message">
                      {errors.firstName}
                    </p>
                  )}
                </div>

                <div>
                  <label htmlFor="lastName" className="block mb-1 font-medium">
                    Last Name*
                  </label>
                  <input
                    type="text"
                    id="lastName"
                    name="lastName"
                    value={formData.lastName}
                    onChange={handleChange}
                    className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 ${
                      errors.lastName
                        ? "border-red-500 focus:ring-red-200"
                        : "focus:ring-blue-200 border-gray-300"
                    }`}
                  />
                  {errors.lastName && (
                    <p className="mt-1 text-red-500 text-sm error-message">
                      {errors.lastName}
                    </p>
                  )}
                </div>

                <div>
                  <label htmlFor="email" className="block mb-1 font-medium">
                    Email Address*
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 ${
                      errors.email
                        ? "border-red-500 focus:ring-red-200"
                        : "focus:ring-blue-200 border-gray-300"
                    }`}
                  />
                  {errors.email && (
                    <p className="mt-1 text-red-500 text-sm error-message">
                      {errors.email}
                    </p>
                  )}
                </div>

                <div>
                  <label htmlFor="phone" className="block mb-1 font-medium">
                    Phone Number*
                  </label>
                  <input
                    type="tel"
                    id="phone"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 ${
                      errors.phone
                        ? "border-red-500 focus:ring-red-200"
                        : "focus:ring-blue-200 border-gray-300"
                    }`}
                  />
                  {errors.phone && (
                    <p className="mt-1 text-red-500 text-sm error-message">
                      {errors.phone}
                    </p>
                  )}
                </div>
              </div>

              <div className="mt-4">
                <label htmlFor="address" className="block mb-1 font-medium">
                  Street Address*
                </label>
                <input
                  type="text"
                  id="address"
                  name="address"
                  value={formData.address}
                  onChange={handleChange}
                  className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 ${
                    errors.address
                      ? "border-red-500 focus:ring-red-200"
                      : "focus:ring-blue-200 border-gray-300"
                  }`}
                />
                {errors.address && (
                  <p className="mt-1 text-red-500 text-sm error-message">
                    {errors.address}
                  </p>
                )}
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-4">
                <div>
                  <label htmlFor="city" className="block mb-1 font-medium">
                    City*
                  </label>
                  <input
                    type="text"
                    id="city"
                    name="city"
                    value={formData.city}
                    onChange={handleChange}
                    className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 ${
                      errors.city
                        ? "border-red-500 focus:ring-red-200"
                        : "focus:ring-blue-200 border-gray-300"
                    }`}
                  />
                  {errors.city && (
                    <p className="mt-1 text-red-500 text-sm error-message">
                      {errors.city}
                    </p>
                  )}
                </div>

                <div>
                  <label htmlFor="state" className="block mb-1 font-medium">
                    State/Province*
                  </label>
                  <input
                    type="text"
                    id="state"
                    name="state"
                    value={formData.state}
                    onChange={handleChange}
                    className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 ${
                      errors.state
                        ? "border-red-500 focus:ring-red-200"
                        : "focus:ring-blue-200 border-gray-300"
                    }`}
                  />
                  {errors.state && (
                    <p className="mt-1 text-red-500 text-sm error-message">
                      {errors.state}
                    </p>
                  )}
                </div>

                <div>
                  <label htmlFor="zipCode" className="block mb-1 font-medium">
                    Zip/Postal Code*
                  </label>
                  <input
                    type="text"
                    id="zipCode"
                    name="zipCode"
                    value={formData.zipCode}
                    onChange={handleChange}
                    className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 ${
                      errors.zipCode
                        ? "border-red-500 focus:ring-red-200"
                        : "focus:ring-blue-200 border-gray-300"
                    }`}
                  />
                  {errors.zipCode && (
                    <p className="mt-1 text-red-500 text-sm error-message">
                      {errors.zipCode}
                    </p>
                  )}
                </div>
              </div>

              <div className="mt-4">
                <label htmlFor="country" className="block mb-1 font-medium">
                  Country*
                </label>
                <select
                  id="country"
                  name="country"
                  value={formData.country}
                  onChange={handleChange}
                  className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 ${
                    errors.country
                      ? "border-red-500 focus:ring-red-200"
                      : "focus:ring-blue-200 border-gray-300"
                  }`}
                >
                  <option value="US">United States</option>
                  <option value="CA">Canada</option>
                  <option value="UK">United Kingdom</option>
                  <option value="AU">Australia</option>
                  <option value="DE">Germany</option>
                  <option value="FR">France</option>
                </select>
                {errors.country && (
                  <p className="mt-1 text-red-500 text-sm error-message">
                    {errors.country}
                  </p>
                )}
              </div>

              <div className="mt-4">
                <label className="flex items-center">
                  <input
                    type="checkbox"
                    name="saveInfo"
                    checked={formData.saveInfo}
                    onChange={handleChange}
                    className="mr-2"
                  />
                  <span>Save this information for next time</span>
                </label>
              </div>
            </div>

            {/* Payment Method */}
            <div>
              <h2 className="text-lg font-bold mb-4 pb-2 border-b">
                Payment Method
              </h2>

              <div className="space-y-4">
                <label className="flex items-center p-4 border rounded-lg cursor-pointer">
                  <input
                    type="radio"
                    name="paymentMethod"
                    value="creditCard"
                    checked={formData.paymentMethod === "creditCard"}
                    onChange={handleChange}
                    className="mr-3"
                  />
                  <div className="flex-1">
                    <div className="font-medium">Credit Card</div>
                    <div className="text-sm text-gray-500">
                      Pay with Visa, Mastercard, etc.
                    </div>
                  </div>
                </label>

                {formData.paymentMethod === "creditCard" && (
                  <div className="mt-4 pl-7">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                      <div>
                        <label
                          htmlFor="cardNumber"
                          className="block mb-1 font-medium"
                        >
                          Card Number*
                        </label>
                        <input
                          type="text"
                          id="cardNumber"
                          name="cardNumber"
                          value={formData.cardNumber}
                          onChange={handleChange}
                          placeholder="1234 5678 9012 3456"
                          className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 ${
                            errors.cardNumber
                              ? "border-red-500 focus:ring-red-200"
                              : "focus:ring-blue-200 border-gray-300"
                          }`}
                        />
                        {errors.cardNumber && (
                          <p className="mt-1 text-red-500 text-sm error-message">
                            {errors.cardNumber}
                          </p>
                        )}
                      </div>

                      <div>
                        <label
                          htmlFor="cardName"
                          className="block mb-1 font-medium"
                        >
                          Name on Card*
                        </label>
                        <input
                          type="text"
                          id="cardName"
                          name="cardName"
                          value={formData.cardName}
                          onChange={handleChange}
                          className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 ${
                            errors.cardName
                              ? "border-red-500 focus:ring-red-200"
                              : "focus:ring-blue-200 border-gray-300"
                          }`}
                        />
                        {errors.cardName && (
                          <p className="mt-1 text-red-500 text-sm error-message">
                            {errors.cardName}
                          </p>
                        )}
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label
                          htmlFor="expiry"
                          className="block mb-1 font-medium"
                        >
                          Expiry Date*
                        </label>
                        <input
                          type="text"
                          id="expiry"
                          name="expiry"
                          value={formData.expiry}
                          onChange={handleChange}
                          placeholder="MM/YY"
                          className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 ${
                            errors.expiry
                              ? "border-red-500 focus:ring-red-200"
                              : "focus:ring-blue-200 border-gray-300"
                          }`}
                        />
                        {errors.expiry && (
                          <p className="mt-1 text-red-500 text-sm error-message">
                            {errors.expiry}
                          </p>
                        )}
                      </div>

                      <div>
                        <label htmlFor="cvv" className="block mb-1 font-medium">
                          CVV*
                        </label>
                        <input
                          type="text"
                          id="cvv"
                          name="cvv"
                          value={formData.cvv}
                          onChange={handleChange}
                          placeholder="123"
                          className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 ${
                            errors.cvv
                              ? "border-red-500 focus:ring-red-200"
                              : "focus:ring-blue-200 border-gray-300"
                          }`}
                        />
                        {errors.cvv && (
                          <p className="mt-1 text-red-500 text-sm error-message">
                            {errors.cvv}
                          </p>
                        )}
                      </div>
                    </div>
                  </div>
                )}

                <label className="flex items-center p-4 border rounded-lg cursor-pointer">
                  <input
                    type="radio"
                    name="paymentMethod"
                    value="paypal"
                    checked={formData.paymentMethod === "paypal"}
                    onChange={handleChange}
                    className="mr-3"
                  />
                  <div className="flex-1">
                    <div className="font-medium">PayPal</div>
                    <div className="text-sm text-gray-500">
                      Pay with your PayPal account
                    </div>
                  </div>
                </label>
              </div>
            </div>

            <div className="mt-8 flex justify-between items-center">
              <Link
                href="/cart"
                className="flex items-center text-blue-600 hover:underline"
              >
                <FaArrowLeft className="mr-2" />
                Return to Cart
              </Link>

              <button
                type="submit"
                className="px-8 py-3 bg-green-600 text-white rounded-lg font-medium flex items-center hover:bg-green-700 transition"
                disabled={isProcessing}
              >
                {isProcessing ? (
                  <>
                    <svg
                      className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                    >
                      <circle
                        className="opacity-25"
                        cx="12"
                        cy="12"
                        r="10"
                        stroke="currentColor"
                        strokeWidth="4"
                      ></circle>
                      <path
                        className="opacity-75"
                        fill="currentColor"
                        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                      ></path>
                    </svg>
                    Processing...
                  </>
                ) : (
                  <>
                    <FaLock className="mr-2" />
                    Make Payment
                  </>
                )}
              </button>
            </div>
          </form>
        </motion.div>

        {/* Order Summary */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="lg:w-1/3"
        >
          <div className="bg-white rounded-lg shadow p-6">
            <h2 className="text-lg font-bold mb-4 pb-2 border-b">
              Order Summary
            </h2>

            <div className="mb-4">
              {cartItems.map((item) => (
                <div
                  key={item.id}
                  className="flex justify-between py-2 border-b border-gray-100 last:border-b-0"
                >
                  <div className="flex-1">
                    <span className="font-medium">{item.name}</span>
                    <span className="ml-2 text-gray-500">x{item.quantity}</span>
                    <div className="text-sm text-gray-500">{item.unit}</div>
                  </div>
                  <div className="font-medium">
                    ${(item.price * item.quantity).toFixed(2)}
                  </div>
                </div>
              ))}
            </div>

            <div className="space-y-2 mb-4">
              <div className="flex justify-between">
                <span className="text-gray-600">Subtotal</span>
                <span>${subtotal.toFixed(2)}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Shipping</span>
                <span>${shipping.toFixed(2)}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Tax</span>
                <span>${tax.toFixed(2)}</span>
              </div>
            </div>

            <div className="border-t pt-4 flex justify-between font-bold text-lg">
              <span>Total</span>
              <span>${total.toFixed(2)}</span>
            </div>

            <div className="mt-6 flex items-center text-sm text-gray-500">
              <FaLock className="text-green-600 mr-2" />
              <span>Secure checkout with 256-bit SSL encryption</span>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
