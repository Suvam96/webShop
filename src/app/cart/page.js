"use client";

import { useState, useEffect } from "react";
import {
  FaCcVisa,
  FaCcMastercard,
  FaCcAmex,
  FaCcDiscover,
  FaTrash,
  FaMinus,
  FaPlus,
  FaArrowLeft,
  FaShoppingCart,
} from "react-icons/fa";
import { motion } from "framer-motion";
import Link from "next/link";
import { useRouter } from "next/navigation";

// Mock cart data - in a real app, this would come from state management like Redux or Context API
const initialCartItems = [
  {
    id: 1,
    name: "Organic Bananas",
    price: 2.99,
    image: "/images/banana.png",
    quantity: 2,
    unit: "1 kg",
    stock: 50,
  },
  {
    id: 2,
    name: "Fresh Strawberries",
    price: 4.99,
    image: "/images/strawberry.png",
    quantity: 1,
    unit: "250 g",
    stock: 30,
  },
];

export default function Cart() {
  const [cartItems, setCartItems] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    // Simulate API fetch delay
    const timer = setTimeout(() => {
      setCartItems(initialCartItems);
      setIsLoading(false);
    }, 500);

    return () => clearTimeout(timer);
  }, []);

  const updateQuantity = (id, change) => {
    setCartItems((prevItems) =>
      prevItems.map((item) => {
        if (item.id === id) {
          const newQuantity = item.quantity + change;
          if (newQuantity >= 1 && newQuantity <= item.stock) {
            return { ...item, quantity: newQuantity };
          }
        }
        return item;
      })
    );
  };

  const removeItem = (id) => {
    setCartItems((prevItems) => prevItems.filter((item) => item.id !== id));
  };

  const calculateSubtotal = () => {
    return cartItems.reduce(
      (total, item) => total + item.price * item.quantity,
      0
    );
  };

  const subtotal = calculateSubtotal();
  const shipping = subtotal > 0 ? 5.99 : 0;
  const tax = subtotal * 0.07; // 7% tax
  const total = subtotal + shipping + tax;

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
      </div>
    );
  }

  if (cartItems.length === 0) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center p-4">
        <div className="text-8xl text-gray-300 mb-4">
          <FaShoppingCart />
        </div>
        <h1 className="text-2xl font-bold mb-4">Your Cart is Empty</h1>
        <p className="text-gray-600 mb-6">
          Looks like you haven't added any products to your cart yet.
        </p>
        <Link href="/" className="btn-primary">
          Start Shopping
        </Link>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold mb-8 text-white">Shopping Cart</h1>

      <div className="flex flex-col lg:flex-row gap-8">
        {/* Cart Items */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
          className="lg:w-2/3"
        >
          <div className="bg-white rounded-lg shadow overflow-hidden">
            <div className="hidden md:grid md:grid-cols-5 bg-gray-50 p-4 border-b border-gray-200">
              <div className="md:col-span-2 font-medium">Product</div>
              <div className="font-medium text-center">Price</div>
              <div className="font-medium text-center">Quantity</div>
              <div className="font-medium text-center">Subtotal</div>
            </div>

            {cartItems.map((item) => (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, height: 0 }}
                className="p-4 border-b border-gray-200 last:border-b-0"
              >
                <div className="md:grid md:grid-cols-5 md:gap-4 md:items-center">
                  {/* Product */}
                  <div className="md:col-span-2 flex items-center mb-4 md:mb-0">
                    <div className="w-20 h-20 flex-shrink-0 mr-4">
                      <img
                        src={item.image}
                        alt={item.name}
                        className="w-full h-full object-cover rounded"
                      />
                    </div>
                    <div>
                      <h3 className="font-medium">
                        <Link
                          href={`/product/${item.id}`}
                          className="hover:text-primary"
                        >
                          {item.name}
                        </Link>
                      </h3>
                      <p className="text-sm text-gray-500">{item.unit}</p>
                      <button
                        onClick={() => removeItem(item.id)}
                        className="text-red-500 text-sm flex items-center mt-1 hover:underline md:hidden"
                      >
                        <FaTrash className="mr-1" size={12} />
                        Remove
                      </button>
                    </div>
                  </div>

                  {/* Price */}
                  <div className="md:text-center mb-4 md:mb-0">
                    <div className="flex items-center justify-between md:block">
                      <span className="md:hidden font-medium">Price</span>
                      <span>${item.price.toFixed(2)}</span>
                    </div>
                  </div>

                  {/* Quantity */}
                  <div className="md:text-center mb-4 md:mb-0">
                    <div className="flex items-center justify-between md:justify-center">
                      <span className="md:hidden font-medium">Quantity</span>
                      <div className="flex items-center">
                        <button
                          onClick={() => updateQuantity(item.id, -1)}
                          disabled={item.quantity <= 1}
                          className={`p-1 border border-gray-300 rounded-l ${
                            item.quantity <= 1
                              ? "bg-gray-100 text-gray-400"
                              : "bg-white text-gray-600 hover:bg-gray-50"
                          }`}
                        >
                          <FaMinus size={10} />
                        </button>
                        <input
                          type="number"
                          value={item.quantity}
                          readOnly
                          className="w-12 border-t border-b border-gray-300 text-center py-1 focus:outline-none"
                        />
                        <button
                          onClick={() => updateQuantity(item.id, 1)}
                          disabled={item.quantity >= item.stock}
                          className={`p-1 border border-gray-300 rounded-r ${
                            item.quantity >= item.stock
                              ? "bg-gray-100 text-gray-400"
                              : "bg-white text-gray-600 hover:bg-gray-50"
                          }`}
                        >
                          <FaPlus size={10} />
                        </button>
                      </div>
                    </div>
                  </div>

                  {/* Subtotal */}
                  <div className="md:text-center">
                    <div className="flex items-center justify-between md:block">
                      <span className="md:hidden font-medium">Subtotal</span>
                      <span className="font-medium">
                        ${(item.price * item.quantity).toFixed(2)}
                      </span>
                    </div>
                  </div>

                  {/* Remove - Only visible on larger screens */}
                  <div className="hidden md:flex md:justify-center mt-2">
                    <button
                      onClick={() => removeItem(item.id)}
                      className="text-red-500 hover:text-red-700"
                    >
                      <FaTrash />
                    </button>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          <div className="mt-6 flex justify-between">
            <Link
              href="/"
              className="flex text-white items-center text-primary hover:underline"
            >
              <FaArrowLeft className="mr-2" />
              Continue Shopping
            </Link>
          </div>
        </motion.div>

        {/* Order Summary */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="lg:w-1/3"
        >
          <div className="bg-white rounded-lg shadow p-6">
            <h2 className="text-lg font-bold mb-6">Order Summary</h2>

            <div className="space-y-4 mb-6">
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
              <div className="border-t pt-4 flex justify-between font-bold text-lg">
                <span>Total</span>
                <span>${total.toFixed(2)}</span>
              </div>
            </div>

            <button
              onClick={() => router.push("/checkout")}
              className="w-full  text-white py-3 rounded-lg font-medium bg-green-600 transition"
            >
              Proceed to Checkout
            </button>

            <div className="mt-6">
              <div className="text-gray-600 text-sm mb-3">We Accept:</div>
              <div className="flex space-x-2 text-2xl">
                <FaCcVisa className="text-blue-600" />
                <FaCcMastercard className="text-red-600" />
                <FaCcAmex className="text-blue-800" />
                <FaCcDiscover className="text-orange-600" />
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
