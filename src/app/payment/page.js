"use client";
import { useState, useEffect } from "react";

export default function Payment() {
  const [currentStep, setCurrentStep] = useState(1);
  const [progress, setProgress] = useState(50);
  const [isComplete, setIsComplete] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const [error, setError] = useState(null);

  // Order details (would come from your state management in a real app)
  const orderDetails = {
    orderId: "ORD-" + Math.floor(100000 + Math.random() * 900000),
    date: new Date().toLocaleDateString(),
    total: 14.87, // $2.99*2 + $4.99 + $5.99 shipping + 7% tax
  };

  // Handle form submission for step 1
  const handleVerifyPayment = () => {
    setIsProcessing(true);

    // Simulate API call to verify payment details
    setTimeout(() => {
      setIsProcessing(false);
      setCurrentStep(2);
      setProgress(100);
    }, 1500);
  };

  // Handle final payment processing for step 2
  const handleCompletePayment = () => {
    setIsProcessing(true);

    // Simulate payment processing
    setTimeout(() => {
      setIsProcessing(false);
      setIsComplete(true);

      // Navigate to success page
      setTimeout(() => {
        window.location.href = `/order-success?orderId=${orderDetails.orderId}`;
      }, 1500);
    }, 2000);
  };

  const stepMessages = [
    "Please verify your payment details",
    "Complete payment processing",
  ];

  return (
    <div className="min-h-screen flex items-center justify-center px-4 py-12 bg-gray-50">
      <div className="bg-white rounded-lg shadow-xl p-8 w-full max-w-md">
        <div className="text-center mb-8">
          <div className="text-2xl font-bold mb-2">
            {isComplete
              ? "Payment Successful!"
              : `Payment - Step ${currentStep} of 2`}
          </div>
          <p className="text-gray-600">
            {isComplete
              ? "Your order has been processed successfully"
              : stepMessages[currentStep - 1]}
          </p>
        </div>

        {/* Progress bar */}
        <div className="h-2 bg-gray-200 rounded-full mb-8">
          <div
            style={{ width: `${progress}%` }}
            className="h-full bg-green-500 rounded-full transition-all duration-500"
          ></div>
        </div>

        {/* Steps */}
        <div className="flex justify-around mb-8">
          {[1, 2].map((step) => (
            <div key={step} className="flex flex-col items-center">
              <div
                className={`flex items-center justify-center w-10 h-10 rounded-full ${
                  step < currentStep
                    ? "bg-green-500 text-white"
                    : step === currentStep
                    ? "bg-blue-500 text-white"
                    : "bg-gray-200 text-gray-500"
                }`}
              >
                {step < currentStep ? (
                  <svg
                    className="w-6 h-6"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M5 13l4 4L19 7"
                    ></path>
                  </svg>
                ) : (
                  step
                )}
              </div>
              <div className="text-xs mt-2 text-center text-gray-500">
                {step === 1 && "Verify Details"}
                {step === 2 && "Process Payment"}
              </div>
            </div>
          ))}
        </div>

        {/* Order details */}
        <div className="bg-gray-50 rounded-lg p-4 mb-6">
          <div className="text-sm text-gray-600 mb-2">Order Details</div>
          <div className="grid grid-cols-2 gap-2">
            <div className="text-gray-600">Order ID:</div>
            <div className="font-medium text-right">{orderDetails.orderId}</div>
            <div className="text-gray-600">Date:</div>
            <div className="font-medium text-right">{orderDetails.date}</div>
            <div className="text-gray-600">Total Amount:</div>
            <div className="font-medium text-right">
              ${orderDetails.total.toFixed(2)}
            </div>
          </div>
        </div>

        {error && (
          <div className="mb-4 p-3 bg-red-100 text-red-700 rounded-lg">
            {error}
          </div>
        )}

        {isComplete ? (
          <div className="text-center">
            <svg
              className="mx-auto mb-4 w-16 h-16 text-green-500"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
              ></path>
            </svg>
            <p className="text-gray-600 mb-4">
              Redirecting you to the order confirmation page...
            </p>
            <div className="animate-spin h-6 w-6 border-t-2 border-b-2 border-green-500 rounded-full mx-auto"></div>
          </div>
        ) : (
          <div className="mt-6">
            {currentStep === 1 && (
              <div>
                <div className="mb-4">
                  <label
                    className="block text-gray-700 text-sm font-bold mb-2"
                    htmlFor="cardNumber"
                  >
                    Card Number
                  </label>
                  <input
                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    id="cardNumber"
                    type="text"
                    placeholder="**** **** **** ****"
                    defaultValue="**** **** **** 1234"
                    disabled={isProcessing}
                  />
                </div>

                <div className="flex mb-4">
                  <div className="w-1/2 mr-2">
                    <label
                      className="block text-gray-700 text-sm font-bold mb-2"
                      htmlFor="expiry"
                    >
                      Expiry Date
                    </label>
                    <input
                      className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                      id="expiry"
                      type="text"
                      placeholder="MM/YY"
                      defaultValue="12/25"
                      disabled={isProcessing}
                    />
                  </div>
                  <div className="w-1/2 ml-2">
                    <label
                      className="block text-gray-700 text-sm font-bold mb-2"
                      htmlFor="cvv"
                    >
                      CVV
                    </label>
                    <input
                      className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                      id="cvv"
                      type="text"
                      placeholder="***"
                      defaultValue="***"
                      disabled={isProcessing}
                    />
                  </div>
                </div>

                <button
                  onClick={handleVerifyPayment}
                  disabled={isProcessing}
                  className={`w-full py-2 px-4 rounded-md text-white font-medium ${
                    isProcessing
                      ? "bg-blue-400"
                      : "bg-blue-600 hover:bg-blue-700"
                  } transition-colors`}
                >
                  {isProcessing ? (
                    <div className="flex items-center justify-center">
                      <div className="animate-spin mr-2 h-4 w-4 border-t-2 border-b-2 border-white rounded-full"></div>
                      Verifying...
                    </div>
                  ) : (
                    "Verify Payment Details"
                  )}
                </button>
              </div>
            )}

            {currentStep === 2 && (
              <div>
                <div className="mb-6 p-4 bg-green-50 border border-green-200 rounded-md">
                  <div className="flex items-center mb-2">
                    <svg
                      className="w-5 h-5 text-green-500 mr-2"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M5 13l4 4L19 7"
                      ></path>
                    </svg>
                    <span className="font-medium text-green-700">
                      Payment details verified
                    </span>
                  </div>
                  <p className="text-sm text-green-600">
                    Your card ending in 1234 has been verified and is ready for
                    processing.
                  </p>
                </div>

                <button
                  onClick={handleCompletePayment}
                  disabled={isProcessing}
                  className={`w-full py-2 px-4 rounded-md text-white font-medium ${
                    isProcessing
                      ? "bg-green-400"
                      : "bg-green-600 hover:bg-green-700"
                  } transition-colors`}
                >
                  {isProcessing ? (
                    <div className="flex items-center justify-center">
                      <div className="animate-spin mr-2 h-4 w-4 border-t-2 border-b-2 border-white rounded-full"></div>
                      Processing...
                    </div>
                  ) : (
                    "Complete Payment"
                  )}
                </button>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
