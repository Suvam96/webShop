"use client";

import { useState, useEffect } from "react";
import { useParams } from "next/navigation";

import {
  FaStar,
  FaHeart,
  FaShare,
  FaShoppingCart,
  FaMinus,
  FaPlus,
} from "react-icons/fa";
import { motion } from "framer-motion";
import Link from "next/link";

// Mock data - in a real app, you would fetch this from an API
const products = [
  {
    id: 3,
    name: "Whole Wheat Bread",
    price: 2.99,
    oldPrice: 3.99,
    discount: "25%",
    rating: 4.5,
    reviews: 120,
    stock: 50,
    sold: 500,
    unit: "1 kg",
    image: "/images/bread.png",
    gallery: ["/images/bread.png", "/images/bread.png", "/images/bread.png"],
    category: "Fruits",
    description:
      "Fresh bread. Rich in potassium and perfect for a healthy snack or breakfast.",
    nutritionFacts: {
      calories: 105,
      protein: "1.3g",
      carbs: "27g",
      fat: "0.4g",
      fiber: "3.1g",
    },
    relatedProducts: [2, 3, 4],
  },
  {
    id: 4,
    name: "Farm Fresh Eggs",

    price: 2.99,
    oldPrice: 3.99,
    discount: "25%",
    rating: 4.5,
    reviews: 120,
    stock: 50,
    sold: 500,
    unit: "1 kg",
    image: "/images/egg.png",
    gallery: ["/images/egg.png", "/images/egg.png", "/images/egg.png"],
    category: "Fruits",
    description:
      "Fresh egg. Rich in potassium and perfect for a healthy snack or breakfast.",
    nutritionFacts: {
      calories: 105,
      protein: "1.3g",
      carbs: "27g",
      fat: "0.4g",
      fiber: "3.1g",
    },
    relatedProducts: [2, 3, 4],
  },
  {
    id: 1,
    name: "Organic Bananas",
    price: 2.99,
    oldPrice: 3.99,
    discount: "25%",
    rating: 4.5,
    reviews: 120,
    stock: 50,
    sold: 500,
    unit: "1 kg",
    image: "/images/banana.png",
    gallery: ["/images/banana.png", "/images/banana.png", "/images/banana.png"],
    category: "Fruits",
    description:
      "Fresh organic bananas sourced directly from organic farms. Rich in potassium and perfect for a healthy snack or breakfast.",
    nutritionFacts: {
      calories: 105,
      protein: "1.3g",
      carbs: "27g",
      fat: "0.4g",
      fiber: "3.1g",
    },
    relatedProducts: [2, 3, 4],
  },
  {
    id: 2,
    name: "Fresh Strawberries",
    price: 4.99,
    oldPrice: 5.99,
    discount: "17%",
    rating: 4.8,
    reviews: 95,
    stock: 30,
    sold: 320,
    unit: "250 g",
    image: "/images/strawberrybucket.jpg",
    gallery: ["/images/strawberrybucket.jpg", "/images/strawberrybucket.jpg"],
    category: "Fruits",
    description:
      "Sweet and juicy strawberries, perfect for desserts or as a healthy snack. Packed with vitamin C and antioxidants.",
    nutritionFacts: {
      calories: 32,
      protein: "0.7g",
      carbs: "7.7g",
      fat: "0.3g",
      fiber: "2g",
    },
    relatedProducts: [1, 3, 4],
  },

  // Add more products as needed
];

export default function ProductDetail({ params }) {
  const [quantity, setQuantity] = useState(1);
  const [selectedImage, setSelectedImage] = useState(0);
  const [isWishlisted, setIsWishlisted] = useState(false);
  const [product, setProduct] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [activeTab, setActiveTab] = useState("description");
  const param = useParams();
  const id = parseInt(param.id); // 👈 Convert string to number

  useEffect(() => {
    // Simulate API fetch
    const fetchProduct = () => {
      setIsLoading(true);
      // In a real app, fetch from API using params.id
      const foundProduct = products.find((p) => p.id === id);
      setProduct(foundProduct);
      setIsLoading(false);
    };

    fetchProduct();
  }, [params.id]);

  const handleQuantityChange = (change) => {
    const newQuantity = quantity + change;
    if (newQuantity >= 1 && newQuantity <= (product?.stock || 10)) {
      setQuantity(newQuantity);
    }
  };

  const handleAddToCart = () => {
    // In a real app, implement cart functionality
    console.log(`Added ${quantity} ${product.name} to cart`);
    // Show toast notification
    alert(`Added ${quantity} ${product.name} to cart`);
  };

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center p-4">
        <h1 className="text-2xl font-bold mb-4">Product Not Found</h1>
        <p className="text-gray-600 mb-6">
          The product you&apos;re looking for doesn&apos;t exist or has been
          removed.
        </p>
        <Link href="/" className="btn-primary">
          Go Back to Shop
        </Link>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Breadcrumb */}
      <nav className="mb-8 ">
        <ol className="flex flex-wrap items-center text-sm">
          <li className="flex items-center">
            <Link
              href="/"
              className="text-gray-500 text-white hover:text-primary"
            >
              Home
            </Link>
            <span className="mx-2 text-gray-400">/</span>
          </li>
          <li className="flex items-center">
            <Link
              href={`/category/${product.category.toLowerCase()}`}
              className="text-gray-500 hover:text-primary"
            >
              {product.category}
            </Link>
            <span className="mx-2 text-gray-400">/</span>
          </li>
          <li className="text-gray-800 font-medium truncate">{product.name}</li>
        </ol>
      </nav>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
        {/* Product Images */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
        >
          <div className="bg-white rounded-lg overflow-hidden shadow-md mb-4">
            <img
              src={product.gallery[selectedImage]}
              alt={product.name}
              className="w-full h-80 object-contain"
            />
          </div>

          <div className="flex space-x-2">
            {product.gallery.map((img, index) => (
              <div
                key={index}
                className={`border-2 rounded overflow-hidden cursor-pointer ${
                  selectedImage === index ? "border-primary" : "border-gray-200"
                }`}
                onClick={() => setSelectedImage(index)}
              >
                <img
                  src={img}
                  alt={`${product.name} - view ${index + 1}`}
                  className="w-20 h-20 object-cover"
                />
              </div>
            ))}
          </div>
        </motion.div>

        {/* Product Info */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
        >
          <h1 className="text-3xl font-bold mb-2">{product.name}</h1>

          <div className="flex items-center mb-4">
            <div className="flex items-center text-yellow-400 mr-3">
              {[...Array(5)].map((_, i) => (
                <FaStar
                  key={i}
                  className={
                    i < Math.floor(product.rating)
                      ? "text-yellow-400"
                      : "text-gray-300"
                  }
                />
              ))}
              <span className="ml-2 text-gray-600">{product.rating}</span>
            </div>
            <span className="text-gray-500">{product.reviews} Reviews</span>
          </div>

          <div className="mb-6">
            <div className="flex items-center">
              <span className="text-3xl font-bold text-primary mr-3">
                ${product.price}
              </span>
              {product.oldPrice && (
                <span className="text-xl text-gray-500 line-through">
                  ${product.oldPrice}
                </span>
              )}
              {product.discount && (
                <span className="ml-3 bg-red-100 text-red-800 px-2 py-1 rounded text-sm font-medium">
                  {product.discount} OFF
                </span>
              )}
            </div>
            <p className="text-gray-500 mt-1">Price per {product.unit}</p>
          </div>

          <div className="border-t border-b border-gray-200 py-4 mb-6">
            <div className="flex items-center text-sm text-gray-600 mb-3">
              <span className="mr-3">Availability:</span>
              {product.stock > 0 ? (
                <span className="text-green-600">
                  In Stock ({product.stock} {product.unit}s available)
                </span>
              ) : (
                <span className="text-red-600">Out of Stock</span>
              )}
            </div>
            <div className="flex items-center text-sm text-gray-600">
              <span className="mr-3">Sold:</span>
              <span>
                {product.sold}+ {product.unit}s
              </span>
            </div>
          </div>

          <div className="mb-6">
            <label className="block text-gray-700 font-medium mb-2">
              Quantity
            </label>
            <div className="flex items-center">
              <button
                onClick={() => handleQuantityChange(-1)}
                disabled={quantity <= 1}
                className={`p-2 border border-gray-300 rounded-l ${
                  quantity <= 1
                    ? "bg-gray-100 text-gray-400"
                    : "bg-white text-gray-600 hover:bg-gray-50"
                }`}
              >
                <FaMinus />
              </button>
              <input
                type="number"
                value={quantity}
                onChange={(e) => {
                  const val = parseInt(e.target.value);
                  if (!isNaN(val) && val >= 1 && val <= product.stock) {
                    setQuantity(val);
                  }
                }}
                className="w-16 border-t border-b border-gray-300 text-center py-2 focus:outline-none"
              />
              <button
                onClick={() => handleQuantityChange(1)}
                disabled={quantity >= product.stock}
                className={`p-2 border border-gray-300 rounded-r ${
                  quantity >= product.stock
                    ? "bg-gray-100 text-gray-400"
                    : "bg-white text-gray-600 hover:bg-gray-50"
                }`}
              >
                <FaPlus />
              </button>
            </div>
          </div>

          <div className="flex flex-wrap gap-3 mb-8">
            <button
              onClick={handleAddToCart}
              className="flex-1  text-white py-3 px-6 rounded-lg font-medium bg-green-600 transition flex items-center justify-center"
            >
              <FaShoppingCart className="mr-2" />
              Add to Cart
            </button>
            <button
              onClick={() => setIsWishlisted(!isWishlisted)}
              className={`p-3 rounded-lg border ${
                isWishlisted
                  ? "bg-red-50 border-red-200 text-red-500"
                  : "border-gray-300 text-gray-600 hover:bg-gray-50"
              }`}
            >
              <FaHeart />
            </button>
            <button className="p-3 rounded-lg border border-gray-300 text-gray-600 hover:bg-gray-50">
              <FaShare />
            </button>
          </div>
        </motion.div>
      </div>

      {/* Product Tabs */}
      <div className="mt-12 border-b border-gray-200">
        <div className="flex flex-wrap -mb-px">
          <button
            onClick={() => setActiveTab("description")}
            className={`mr-8 py-4 px-1 border-b-2 font-medium text-sm ${
              activeTab === "description"
                ? "border-primary text-primary"
                : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
            }`}
          >
            Description
          </button>
          <button
            onClick={() => setActiveTab("nutrition")}
            className={`mr-8 py-4 px-1 border-b-2 font-medium text-sm ${
              activeTab === "nutrition"
                ? "border-primary text-primary"
                : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
            }`}
          >
            Nutrition Facts
          </button>
          <button
            onClick={() => setActiveTab("reviews")}
            className={`py-4 px-1 border-b-2 font-medium text-sm ${
              activeTab === "reviews"
                ? "border-primary text-primary"
                : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
            }`}
          >
            Reviews ({product.reviews})
          </button>
        </div>
      </div>

      {/* Tab Content */}
      <div className="py-8">
        {activeTab === "description" && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.3 }}
          >
            <p className="text-gray-700 leading-relaxed">
              {product.description}
            </p>
          </motion.div>
        )}

        {activeTab === "nutrition" && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.3 }}
            className="bg-white rounded-lg p-6 shadow-sm"
          >
            <h3 className="text-lg font-bold mb-4">
              Nutrition Facts (per 100g)
            </h3>
            <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
              <div className="border border-gray-200 rounded-lg p-4 text-center">
                <p className="text-gray-500 text-sm">Calories</p>
                <p className="font-bold text-lg">
                  {product.nutritionFacts.calories}
                </p>
              </div>
              <div className="border border-gray-200 rounded-lg p-4 text-center">
                <p className="text-gray-500 text-sm">Protein</p>
                <p className="font-bold text-lg">
                  {product.nutritionFacts.protein}
                </p>
              </div>
              <div className="border border-gray-200 rounded-lg p-4 text-center">
                <p className="text-gray-500 text-sm">Carbs</p>
                <p className="font-bold text-lg">
                  {product.nutritionFacts.carbs}
                </p>
              </div>
              <div className="border border-gray-200 rounded-lg p-4 text-center">
                <p className="text-gray-500 text-sm">Fat</p>
                <p className="font-bold text-lg">
                  {product.nutritionFacts.fat}
                </p>
              </div>
              <div className="border border-gray-200 rounded-lg p-4 text-center">
                <p className="text-gray-500 text-sm">Fiber</p>
                <p className="font-bold text-lg">
                  {product.nutritionFacts.fiber}
                </p>
              </div>
            </div>
          </motion.div>
        )}

        {activeTab === "reviews" && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.3 }}
          >
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-lg font-bold">Customer Reviews</h3>
              <button className="btn-outline text-sm">Write a Review</button>
            </div>

            <div className="text-center py-12">
              <p className="text-gray-500">
                This is where customer reviews would appear. In a real app, you
                would fetch and display actual reviews here.
              </p>
            </div>
          </motion.div>
        )}
      </div>
    </div>
  );
}
