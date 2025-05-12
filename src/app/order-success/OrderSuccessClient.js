"use client";

import { useState, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import {
  FaCheckCircle,
  FaDownload,
  FaShoppingBag,
  FaMapMarkerAlt,
  FaTruck,
  FaCreditCard,
  FaArrowRight,
} from "react-icons/fa";
import { motion } from "framer-motion";

export default function OrderSuccessClient() {
  const searchParams = useSearchParams();
  const orderId = searchParams.get("orderId") || "ORD-123456";

  const [loading, setLoading] = useState(true);
  const [orderData, setOrderData] = useState(null);
  const [pdfGenerating, setPdfGenerating] = useState(false);
  const [pdfReady, setPdfReady] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      const mockOrderData = {
        id: orderId,
        date: new Date().toLocaleDateString(),
        status: "Confirmed",
        items: [
          {
            id: 1,
            name: "Organic Bananas",
            price: 2.99,
            quantity: 2,
            unit: "1 kg",
            image: "/images/banana.png",
          },
          {
            id: 2,
            name: "Fresh Strawberries",
            price: 4.99,
            quantity: 1,
            unit: "250 g",
            image: "/images/strawberry.png",
          },
        ],
        subtotal: 10.97,
        shipping: 5.99,
        tax: 0.77,
        total: 17.73,
        shipping_address: {
          name: "John Doe",
          address: "123 Main St",
          city: "New York",
          state: "NY",
          zip: "10001",
          country: "United States",
        },
        payment: {
          method: "Credit Card",
          card: "**** **** **** 1234",
          status: "Paid",
        },
        estimated_delivery: "May 2-5, 2025",
      };

      setOrderData(mockOrderData);
      setLoading(false);
    }, 1000);

    return () => clearTimeout(timer);
  }, [orderId]);

  const handleDownloadPDF = () => {
    setPdfGenerating(true);
    setTimeout(() => {
      setPdfGenerating(false);
      setPdfReady(true);
      const link = document.createElement("a");
      link.href = "#";
      link.download = `order-receipt-${orderId}.pdf`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    }, 2000);
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-12">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="max-w-4xl mx-auto"
      >
        {/* Success Header */}
        <div className="bg-green-100 rounded-t-lg p-6 text-center">
          <FaCheckCircle className="text-green-500 text-6xl mx-auto mb-4" />
          <h1 className="text-2xl font-bold text-gray-800 mb-2">
            Thank You for Your Order!
          </h1>
          <p className="text-gray-600">
            Your order #{orderId} has been successfully placed and confirmed
          </p>
        </div>

        {/* Order Details */}
        <div className="bg-white rounded-b-lg shadow-lg p-6">
          <div className="flex justify-between items-center pb-4 border-b">
            <div>
              <div className="text-gray-600">Order Date</div>
              <div className="font-medium">{orderData.date}</div>
            </div>
            <div>
              <div className="text-gray-600">Order Number</div>
              <div className="font-medium">{orderData.id}</div>
            </div>
            <div>
              <div className="text-gray-600">Status</div>
              <div className="inline-block px-3 py-1 bg-green-100 text-green-800 rounded-full text-sm font-medium">
                {orderData.status}
              </div>
            </div>
            <div>
              <button
                onClick={handleDownloadPDF}
                disabled={pdfGenerating}
                className={`flex items-center px-4 py-2 rounded-lg text-white ${
                  pdfGenerating
                    ? "bg-gray-400 cursor-not-allowed"
                    : "bg-blue-600 hover:bg-blue-700"
                }`}
              >
                {pdfGenerating ? (
                  <>
                    <svg
                      className="animate-spin -ml-1 mr-2 h-4 w-4 text-white"
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
                    Generating...
                  </>
                ) : (
                  <>
                    <FaDownload className="mr-2" />
                    {pdfReady ? "Download Again" : "Download Receipt"}
                  </>
                )}
              </button>
            </div>
          </div>

          {/* Order Items */}
          <div className="py-6 border-b">
            <h2 className="text-lg font-bold mb-4 flex items-center">
              <FaShoppingBag className="mr-2 text-gray-600" />
              Order Items
            </h2>

            <div className="space-y-4">
              {orderData.items.map((item) => (
                <div key={item.id} className="flex items-center">
                  <div className="w-16 h-16 bg-gray-100 rounded overflow-hidden flex-shrink-0">
                    <img
                      src={item.image}
                      alt={item.name}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="ml-4 flex-1">
                    <h3 className="font-medium">{item.name}</h3>
                    <div className="text-gray-500 text-sm">{item.unit}</div>
                  </div>
                  <div className="text-gray-600 mr-8">x{item.quantity}</div>
                  <div className="font-medium">
                    ${(item.price * item.quantity).toFixed(2)}
                  </div>
                </div>
              ))}
            </div>

            {/* Order Summary */}
            <div className="mt-6 ml-auto w-full md:w-64">
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-gray-600">Subtotal</span>
                  <span>${orderData.subtotal.toFixed(2)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Shipping</span>
                  <span>${orderData.shipping.toFixed(2)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Tax</span>
                  <span>${orderData.tax.toFixed(2)}</span>
                </div>
                <div className="flex justify-between pt-2 font-bold border-t border-gray-200">
                  <span>Total</span>
                  <span>${orderData.total.toFixed(2)}</span>
                </div>
              </div>
            </div>
          </div>

          {/* Shipping and Payment */}
          <div className="py-6 grid grid-cols-1 md:grid-cols-3 gap-6">
            <div>
              <h3 className="font-bold mb-3 flex items-center">
                <FaMapMarkerAlt className="mr-2 text-gray-600" />
                Shipping Address
              </h3>
              <div className="text-gray-600">
                <p>{orderData.shipping_address.name}</p>
                <p>{orderData.shipping_address.address}</p>
                <p>
                  {orderData.shipping_address.city},{" "}
                  {orderData.shipping_address.state}{" "}
                  {orderData.shipping_address.zip}
                </p>
                <p>{orderData.shipping_address.country}</p>
              </div>
            </div>

            <div>
              <h3 className="font-bold mb-3 flex items-center">
                <FaTruck className="mr-2 text-gray-600" />
                Delivery Information
              </h3>
              <div className="text-gray-600">
                <p>Estimated Delivery Date:</p>
                <p className="font-medium">{orderData.estimated_delivery}</p>
                <p className="mt-2">
                  You will receive shipping and delivery updates by email.
                </p>
              </div>
            </div>

            <div>
              <h3 className="font-bold mb-3 flex items-center">
                <FaCreditCard className="mr-2 text-gray-600" />
                Payment Method
              </h3>
              <div className="text-gray-600">
                <p>{orderData.payment.method}</p>
                <p>{orderData.payment.card}</p>
                <p className="mt-2">
                  Status:{" "}
                  <span className="text-green-600 font-medium">
                    {orderData.payment.status}
                  </span>
                </p>
              </div>
            </div>
          </div>

          {/* Actions */}
          <div className="pt-6 border-t flex flex-col md:flex-row justify-between space-y-4 md:space-y-0">
            <Link
              href="/orders"
              className="flex items-center text-blue-600 hover:underline"
            >
              View All Orders
            </Link>

            <div className="flex space-x-4">
              <Link
                href="/track-order"
                className="px-4 py-2 border border-gray-300 rounded-lg text-gray-600 hover:bg-gray-50"
              >
                Track Order
              </Link>

              <Link
                href="/"
                className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 flex items-center"
              >
                Continue Shopping
                <FaArrowRight className="ml-2" />
              </Link>
            </div>
          </div>
        </div>

        {/* Customer Support */}
        <div className="mt-8 bg-blue-50 rounded-lg p-6 text-center">
          <h3 className="font-bold mb-2">Need Help?</h3>
          <p className="text-gray-600 mb-4">
            If you have any questions about your order, please contact our
            customer support team.
          </p>
          <Link
            href="/contact"
            className="inline-block px-6 py-2 border border-blue-600 text-blue-600 rounded-lg hover:bg-blue-600 hover:text-white transition-colors"
          >
            Contact Support
          </Link>
        </div>
      </motion.div>
    </div>
  );
}
